// =================================================================================
// 1. DATOS DE TALLAS (FINAL: Ranglan y Sisa de Adulto ajustados a tus estándares)
// =================================================================================

const DATOS_TALLAS = [
    // Tallas de Bebé/Niño 
    { etiqueta: 'Prematuro (00)', numTalla: '', pechoCirc: 38, largoTotal: 18, largoManga: 13, largoSisa: 7, ranglan: 11, escoteBajoSisa: 4, cuelloCirc: 20 },
    { etiqueta: '0 (Recién Nacido)', numTalla: '', pechoCirc: 40, largoTotal: 20, largoManga: 16, largoSisa: 8, ranglan: 13, escoteBajoSisa: 6, cuelloCirc: 22 },
    { etiqueta: '1-3 meses', numTalla: '', pechoCirc: 46, largoTotal: 24, largoManga: 18, largoSisa: 10, ranglan: 15, escoteBajoSisa: 7, cuelloCirc: 24 },
    { etiqueta: '3-6 meses', numTalla: '', pechoCirc: 50, largoTotal: 27, largoManga: 20, largoSisa: 11, ranglan: 16, escoteBajoSisa: 7, cuelloCirc: 25 },
    { etiqueta: '6-12 meses', numTalla: '', pechoCirc: 54, largoTotal: 30, largoManga: 22, largoSisa: 12, ranglan: 17, escoteBajoSisa: 7, cuelloCirc: 26 },
    { etiqueta: '12-18 meses', numTalla: '', pechoCirc: 56, largoTotal: 33, largoManga: 25, largoSisa: 13, ranglan: 18, escoteBajoSisa: 8, cuelloCirc: 27 },
    { etiqueta: '2 años', numTalla: '', pechoCirc: 58, largoTotal: 35, largoManga: 28, largoSisa: 14, ranglan: 19, escoteBajoSisa: 8, cuelloCirc: 28 },
    { etiqueta: '4 años', numTalla: '', pechoCirc: 62, largoTotal: 40, largoManga: 32, largoSisa: 15, ranglan: 20, escoteBajoSisa: 9, cuelloCirc: 29 },
    { etiqueta: '6 años', numTalla: '', pechoCirc: 66, largoTotal: 44, largoManga: 36, largoSisa: 16, ranglan: 21, escoteBajoSisa: 9, cuelloCirc: 30 },
    { etiqueta: '8 años', numTalla: '', pechoCirc: 70, largoTotal: 48, largoManga: 40, largoSisa: 17, ranglan: 22, escoteBajoSisa: 10, cuelloCirc: 31 },
    { etiqueta: '10 años', numTalla: '', pechoCirc: 76, largoTotal: 52, largoManga: 44, largoSisa: 18, ranglan: 23, escoteBajoSisa: 10, cuelloCirc: 32 },
    // Tallas de Adulto (Sisa y Ranglan corregidos)
    { etiqueta: 'XS', numTalla: '34-36', pechoCirc: 80, largoTotal: 58, largoManga: 56, largoSisa: 19, ranglan: 20, escoteBajoSisa: 14, cuelloCirc: 34 },
    { etiqueta: 'S', numTalla: '38-40', pechoCirc: 88, largoTotal: 60, largoManga: 58, largoSisa: 20, ranglan: 21, escoteBajoSisa: 15, cuelloCirc: 35 },
    { etiqueta: 'M', numTalla: '40-42', pechoCirc: 98, largoTotal: 62, largoManga: 59, largoSisa: 21, ranglan: 22, escoteBajoSisa: 16, cuelloCirc: 36 },
    { etiqueta: 'L', numTalla: '42-44', pechoCirc: 108, largoTotal: 64, largoManga: 60, largoSisa: 22, ranglan: 23, escoteBajoSisa: 17, cuelloCirc: 38 },
    { etiqueta: 'XL', numTalla: '46-48', pechoCirc: 118, largoTotal: 66, largoManga: 61, largoSisa: 23, ranglan: 24, escoteBajoSisa: 18, cuelloCirc: 40 },
    { etiqueta: 'XXL', numTalla: '50-52', pechoCirc: 128, largoTotal: 68, largoManga: 62, largoSisa: 24, ranglan: 25, escoteBajoSisa: 19, cuelloCirc: 42 }
];

// =================================================================================
// 2. FUNCIONES DE INICIALIZACIÓN Y EVENTOS
// =================================================================================

document.addEventListener('DOMContentLoaded', () => {
    cargarTallas(DATOS_TALLAS);
    document.getElementById('calculadora-form').addEventListener('submit', manejarCalculo);
    document.getElementById('metodo').addEventListener('change', actualizarUI);
    actualizarUI(); // Ejecuta al inicio para establecer la vista por defecto
});

function cargarTallas(datosTallas) {
    const selectorTalla = document.getElementById('selector-talla');
    selectorTalla.innerHTML = ''; 

    datosTallas.forEach(talla => {
        let textoOpcion = talla.etiqueta;
        
        if (talla.numTalla && talla.numTalla !== '') {
            textoOpcion += ` (${talla.numTalla})`; 
        }

        const opcion = document.createElement('option');
        opcion.value = talla.etiqueta;
        opcion.textContent = textoOpcion;
        selectorTalla.appendChild(opcion);
    });
}

// Muestra/oculta campos según el método elegido
function actualizarUI() {
    const metodo = document.getElementById('metodo').value;
    const piezaDiv = document.getElementById('pieza-div');
    const cmDeseadosDiv = document.getElementById('cm-deseados-div');
    const ropaDiv = document.getElementById('ropa-div');

    if (metodo === 'cm-deseados') {
        cmDeseadosDiv.style.display = 'block';
        ropaDiv.style.display = 'none';
        piezaDiv.style.display = 'none'; 
    } else {
        cmDeseadosDiv.style.display = 'none';
        ropaDiv.style.display = 'block';

        // Solo mostrar selector de pieza para el método "Empezar por el Bajo"
        if (metodo === 'desde-bajo') {
            piezaDiv.style.display = 'block';
        } else {
            piezaDiv.style.display = 'none';
        }
    }
}

function manejarCalculo(event) {
    event.preventDefault();
    const resultadosDiv = document.getElementById('contenido-resultados');
    resultadosDiv.style.display = 'block'; 

    const p10 = parseFloat(document.getElementById('puntos-10cm').value);
    const pa10Str = document.getElementById('pasadas-10cm').value;
    const pa10 = pa10Str === '' ? 0 : parseFloat(pa10Str);
    
    const metodo = document.getElementById('metodo').value;

    if (isNaN(p10) || p10 <= 0) {
        alert("Por favor, introduce un número válido de Puntos en 10cm.");
        return;
    }

    if (metodo === 'cm-deseados') {
        const cmDeseados = parseFloat(document.getElementById('cm-deseados-input').value);
        if (isNaN(cmDeseados) || cmDeseados <= 0) {
            alert("Por favor, introduce una Medida en Centímetros válida.");
            return;
        }
        calcularCmDeseados(p10, pa10, cmDeseados);
        return;
    }
    
    // Para métodos basados en talla
    const tipoPrenda = document.getElementById('tipo-prenda').value;
    const etiquetaTalla = document.getElementById('selector-talla').value;
    const pieza = document.getElementById('pieza').value;
    const datosTalla = DATOS_TALLAS.find(t => t.etiqueta === etiquetaTalla);
    if (!datosTalla) return;


    if (metodo === 'desde-bajo') {
        calcularDesdeBajo(p10, pa10, datosTalla, tipoPrenda, pieza);
    } else if (metodo === 'desde-escote') {
        calcularDesdeEscote(p10, pa10, datosTalla, tipoPrenda);
    } 
}

// =================================================================================
// 3. FUNCIONES DE CÁLCULO
// =================================================================================

/**
 * Función auxiliar para obtener la etiqueta de talla completa.
 */
function getTallaEtiqueta(datosTalla) {
    return datosTalla.numTalla ? `${datosTalla.etiqueta} (${datosTalla.numTalla})` : datosTalla.etiqueta;
}

/**
 * Realiza el cálculo para el método "Empezar por el Bajo".
 */
function calcularDesdeBajo(p10, pa10, datosTalla, tipoPrenda, pieza) {
    const resultadosDiv = document.getElementById('contenido-resultados');
    const pXcm = p10 / 10;
    
    const pasadasValidas = pa10 > 0;
    let paXcm = pasadasValidas ? pa10 / 10 : 0;

    const tallaEtiquetaCompleta = getTallaEtiqueta(datosTalla);
    let html = `<h3>📐 Resultados para Talla ${tallaEtiquetaCompleta} - Pieza: ${pieza.toUpperCase()}</h3>`;
    let anchoCM, largoCM;
    
    // Estimación de Profundidad de Escote Frontal
    let profundidadEscoteFrontalCM;
    if (datosTalla.pechoCirc <= 56) {
        profundidadEscoteFrontalCM = 3.5; 
    } else if (datosTalla.pechoCirc <= 90) {
        profundidadEscoteFrontalCM = 6.0; 
    } else {
        profundidadEscoteFrontalCM = 8.0; 
    }

    // Cálculos de largos comunes
    const largoBajoSisa = datosTalla.largoTotal - datosTalla.largoSisa;
    
    const pasadasBajoSisa = pasadasValidas ? Math.round(largoBajoSisa * paXcm) : null;
    const pasadasHastaEscote = pasadasValidas ? Math.round((datosTalla.largoTotal - datosTalla.escoteBajoSisa) * paXcm) : null;
    
    largoCM = datosTalla.largoTotal;

    if (pieza === 'espalda' || (pieza === 'delantero' && tipoPrenda === 'jersey')) {
        anchoCM = datosTalla.pechoCirc / 2;
        const puntosIniciales = Math.round(anchoCM * pXcm);
        
        html += `
            <p class="resultado-principal">Puntos a tejer para empezar (ancho ${anchoCM.toFixed(1)} cm): <strong>${puntosIniciales} puntos</strong></p>
            <p>Largo total de la pieza (desde bajo a cuello): ${largoCM.toFixed(1)} cm</p>
            <hr>
            <p>
                Inicio de la Sisa: A los ${largoBajoSisa.toFixed(1)} cm desde el bajo. 
                ${pasadasValidas ? `(Aproximadamente <strong>${pasadasBajoSisa} pasadas</strong>).` : ''}
                <span class="nota-medida">(Sisa: ${datosTalla.largoSisa.toFixed(1)} cm)</span>
            </p>
            <p>
                Inicio del Escote (Redondo): A los ${(datosTalla.largoTotal - datosTalla.escoteBajoSisa).toFixed(1)} cm desde el bajo. 
                ${pasadasValidas ? `(Aproximadamente <strong>${pasadasHastaEscote} pasadas</strong>).` : ''}
                <span class="nota-medida">(Para un escote redondo estándar, la curva delantera tendrá una profundidad de aprox. ${profundidadEscoteFrontalCM.toFixed(1)} cm).</span>
            </p>
        `;

    } else if (pieza === 'delantero' && tipoPrenda === 'chaqueta') {
        const anchoEspalda = datosTalla.pechoCirc / 2;
        anchoCM = anchoEspalda / 2; 
        const puntosIniciales = Math.round(anchoCM * pXcm);
        
        html += `
            <p class="resultado-principal">Puntos a tejer para empezar para **UNA MITAD** del delantero (ancho ${anchoCM.toFixed(1)} cm): <strong>${puntosIniciales} puntos</strong></p>
            <p>Largo total de la pieza (desde bajo a cuello): ${largoCM.toFixed(1)} cm</p>
            <hr>
            <p>
                Inicio de la Sisa: A los ${largoBajoSisa.toFixed(1)} cm desde el bajo. 
                ${pasadasValidas ? `(Aproximadamente <strong>${pasadasBajoSisa} pasadas</strong>).` : ''}
                <span class="nota-medida">(Sisa: ${datosTalla.largoSisa.toFixed(1)} cm)</span>
            </p>
            <p>
                Inicio del Escote (Redondo): A los ${(datosTalla.largoTotal - datosTalla.escoteBajoSisa).toFixed(1)} cm desde el bajo. 
                ${pasadasValidas ? `(Aproximadamente <strong>${pasadasHastaEscote} pasadas</strong>).` : ''}
                <span class="nota-medida">(Para un escote redondo estándar, la curva delantera tendrá una profundidad de aprox. ${profundidadEscoteFrontalCM.toFixed(1)} cm).</span>
            </p>

            <div class="nota-adicional">
                **NOTA IMPORTANTE - CHAQEUETA:** Estos puntos (${puntosIniciales} puntos) corresponden a **UNA** de las mitades del delantero (derecha o izquierda). ¡Recuerda que debes sumar los puntos necesarios para la **tapeta o borde** (ej: 5-10 puntos) a este resultado!
            </div>
        `;

    } else if (pieza === 'mangas') {
        largoCM = datosTalla.largoManga;
        // La fórmula pCirc * 0.4 asegura un ancho de manga cerca del doble de largoSisa
        const puntosSisa = Math.round(datosTalla.pechoCirc * 0.4 * pXcm);
        const puntosIniciales = Math.round(datosTalla.pechoCirc * 0.18 * pXcm); 
        const pasadasLargoManga = pasadasValidas ? Math.round(largoCM * paXcm) : null;
        
        // CÁLCULO DE ANCHO DE MANGA PARA MOSTRAR AL USUARIO
        const anchoMangaSisaCM = datosTalla.largoSisa * 2; 

        html += `
            <p class="resultado-principal">Puntos a tejer para empezar (Puño, ancho aprox. ${(datosTalla.pechoCirc * 0.18).toFixed(1)} cm): <strong>${puntosIniciales} puntos</strong></p>
            <p>Puntos que deberá tener la manga al llegar a la sisa (Ancho Aprox. ${anchoMangaSisaCM.toFixed(1)} cm): <strong>${puntosSisa} puntos</strong></p>
            <p>Largo total de la manga (desde sisa a puño): ${largoCM.toFixed(1)} cm</p>
            <hr>
            <p>
                Deberás tejer ${largoCM.toFixed(1)} cm. Aumenta puntos de manera uniforme para pasar de ${puntosIniciales} puntos a ${puntosSisa} puntos.
            </p>
            ${pasadasValidas ? `<p>Total de pasadas hasta el puño: <strong>${pasadasLargoManga} pasadas</strong>.</p>` : ''}
        `;
    }
    
    resultadosDiv.innerHTML = html;
}


/**
 * Realiza el cálculo para el método "Empezar por el Escote (Top-Down - Ranglán)".
 */
function calcularDesdeEscote(p10, pa10, datosTalla, tipoPrenda) {
    const resultadosDiv = document.getElementById('contenido-resultados');
    const pXcm = p10 / 10;
    
    const pasadasValidas = pa10 > 0;
    let paXcm = pasadasValidas ? pa10 / 10 : 0;

    // 1. CÁLCULO DE PUNTOS TOTALES DEL CUELLO
    const anchoCuelloBaseCM = datosTalla.cuelloCirc;
    
    let holguraCuelloCM = 0;
    // Aplicar holgura de cuello (+7 cm) solo para tallas de adulto (Pecho >= 80cm)
    if (datosTalla.pechoCirc >= 80) { 
        holguraCuelloCM = 7;
    } 

    const anchoCuelloCM = anchoCuelloBaseCM + holguraCuelloCM; 
    const puntosMontadosTotal = Math.round(anchoCuelloCM * pXcm); 
    
    const puntosRanglanFijos = 8;
    let puntosRestantes = puntosMontadosTotal - puntosRanglanFijos;

    // A. REPARTO ESTÁNDAR 3-3-1-1 
    const unidadBase = puntosRestantes / 8;
    
    // Asignación base (puede tener decimales)
    let pEspaldaBase = unidadBase * 3;
    let pDelanteroBase = unidadBase * 3;
    let pMangasBase = unidadBase * 1;

    // Redondeo y ajuste para que la suma sea exacta
    let puntosEspalda = Math.round(pEspaldaBase);
    let puntosMangas = Math.round(pMangasBase);
    
    let puntosDelanteroTotal = puntosRestantes - puntosEspalda - (puntosMangas * 2);

    let puntosDelantero = puntosDelanteroTotal;
    if (tipoPrenda === 'chaqueta') {
        puntosDelantero = Math.round(puntosDelanteroTotal / 2);
        // Ajuste fino: la diferencia del redondeo se suma/resta a la espalda
        const sumaCheck = puntosEspalda + (puntosMangas * 2) + (puntosDelantero * 2) + puntosRanglanFijos;
        if (sumaCheck !== puntosMontadosTotal) {
             puntosEspalda += puntosMontadosTotal - sumaCheck; 
        }
    } else {
        // Jersey: Ajuste fino
        const sumaCheck = puntosEspalda + (puntosMangas * 2) + puntosDelanteroTotal + puntosRanglanFijos;
        if (sumaCheck !== puntosMontadosTotal) {
             puntosEspalda += puntosMontadosTotal - sumaCheck; 
             puntosDelantero = puntosDelanteroTotal;
        } else {
            puntosDelantero = puntosDelanteroTotal;
        }
    }

    // 3. CÁLCULO DE LARGOS EN PASADAS
    const largoRanglanCM = datosTalla.ranglan; 
    const pasadasRanglan = pasadasValidas ? Math.round(largoRanglanCM * paXcm) : null;
    const largoMangaCM = datosTalla.largoManga;
    const pasadasLargoManga = pasadasValidas ? Math.round(largoMangaCM * paXcm) : null;
    const largoCuerpoCM = datosTalla.largoTotal - datosTalla.largoSisa;
    const pasadasLargoCuerpo = pasadasValidas ? Math.round(largoCuerpoCM * paXcm) : null;
    
    const tallaEtiquetaCompleta = getTallaEtiqueta(datosTalla);
    let html = `<h3>📐 Resultados Top-Down (Escote) para Talla ${tallaEtiquetaCompleta}</h3>`;

    html += `
        <p class="resultado-principal">Puntos para montar en el escote (ancho ${anchoCuelloCM.toFixed(1)} cm con ${holguraCuelloCM.toFixed(1)} cm de holgura): <strong>${puntosMontadosTotal} puntos</strong></p>
        <hr>
        
        <h4>Reparto de Puntos Inicial (Antes de empezar a hacer aumentos):</h4>
        <ul>
            <li>Espalda: <strong>${puntosEspalda}</strong> puntos.</li>
            <li>Mangas (cada una): <strong>${puntosMangas}</strong> puntos.</li>
            <li>Delantero (${tipoPrenda === 'chaqueta' ? 'cada mitad' : 'pieza única'}): <strong>${puntosDelantero}</strong> puntos.</li>
            <li>Ranglan (4 líneas): 2 puntos por línea (8 puntos en total).</li>
        </ul>
        <p class="nota-medida">*(El total de puntos iniciales es ${puntosMontadosTotal} puntos)*</p>
    `;
    
    if (tipoPrenda === 'chaqueta') {
        html += `<div class="nota-adicional">
            **ATENCIÓN - CHAQEUETA:** Los ${puntosDelantero} puntos son para **UNA** de las mitades del delantero. 
            Recuerda sumar los puntos adicionales (ej: 5 a 10 puntos) para la **tapeta o borde** a cada mitad.
        </div>`;
    }

    html += `
        <hr>
        <h4>Instrucciones de Largo:</h4>
        <p>
            Largo del Ranglan (Diagonal Escote a Sisa): Teje hasta que la línea de ranglan mida ${largoRanglanCM.toFixed(1)} cm.
            ${pasadasValidas ? `<span class="nota-medida">(Aproximadamente <strong>${pasadasRanglan} pasadas</strong> de aumento).</span>` : ''}
        </p>
        <p>
            Largo de las Mangas (desde sisa a puño): ${largoMangaCM.toFixed(1)} cm.
            ${pasadasValidas ? `<span class="nota-medida">(Aproximadamente <strong>${pasadasLargoManga} pasadas</strong>).</span>` : ''}
        </p>
        <p>
            Largo del Cuerpo (desde sisa al bajo): ${largoCuerpoCM.toFixed(1)} cm.
            ${pasadasValidas ? `<span class="nota-medida">(Aproximadamente <strong>${pasadasLargoCuerpo} pasadas</strong>).</span>` : ''}
        </p>
    `;
    
    const pasadasCuello = pasadasValidas ? Math.round(2.5 * paXcm) : null;
    html += `<div class="nota-adicional">
        SUGERENCIA DE CUELLO: Sugerimos tejer al menos ${pasadasValidas ? `<strong>${pasadasCuello} pasadas</strong> ` : ''} (aprox. 2.5cm) en punto elástico (ej: 1/1, 2/2) para la terminación del cuello antes de dividir los puntos y empezar con los aumentos del ranglan.
    </div>`;
    
    resultadosDiv.innerHTML = html;
}

/**
 * Realiza el cálculo para el método "Solo Regla de Tres (CM a Puntos)".
 */
function calcularCmDeseados(p10, pa10, cmDeseados) {
    const resultadosDiv = document.getElementById('contenido-resultados');
    const pXcm = p10 / 10;
    
    const pasadasValidas = pa10 > 0;
    let paXcm = pasadasValidas ? pa10 / 10 : 0;
    
    const puntosNecesarios = Math.round(cmDeseados * pXcm);
    const pasadasNecesarias = pasadasValidas ? Math.round(cmDeseados * paXcm) : null;
    
    let html = `<h3>📏 Resultados para ${cmDeseados.toFixed(1)} cm Deseados</h3>`;

    html += `
        <p class="resultado-principal">Puntos necesarios: <strong>${puntosNecesarios} puntos</strong></p>
        <hr>
        <p>
            Esto significa que para tejer **${cmDese
