// =================================================================================
// 1. DATOS DE TALLAS
// =================================================================================

const DATOS_TALLAS = [
    // Tallas de Bebé/Niño (numTalla vacío para no mostrarlo)
    { etiqueta: 'Prematuro (00)', numTalla: '', pechoCirc: 38, largoTotal: 18, largoManga: 13, largoSisa: 7, ranglan: 11, escoteBajoSisa: 4 },
    { etiqueta: '0 (Recién Nacido)', numTalla: '', pechoCirc: 40, largoTotal: 20, largoManga: 16, largoSisa: 8, ranglan: 13, escoteBajoSisa: 6 },
    { etiqueta: '1-3 meses', numTalla: '', pechoCirc: 46, largoTotal: 24, largoManga: 18, largoSisa: 10, ranglan: 15, escoteBajoSisa: 7 },
    { etiqueta: '3-6 meses', numTalla: '', pechoCirc: 50, largoTotal: 27, largoManga: 20, largoSisa: 11, ranglan: 16, escoteBajoSisa: 7 },
    { etiqueta: '6-12 meses', numTalla: '', pechoCirc: 54, largoTotal: 30, largoManga: 22, largoSisa: 12, ranglan: 17, escoteBajoSisa: 7 },
    { etiqueta: '12-18 meses', numTalla: '', pechoCirc: 56, largoTotal: 33, largoManga: 25, largoSisa: 13, ranglan: 18, escoteBajoSisa: 8 },
    { etiqueta: '2 años', numTalla: '', pechoCirc: 58, largoTotal: 35, largoManga: 28, largoSisa: 14, ranglan: 19, escoteBajoSisa: 8 },
    { etiqueta: '4 años', numTalla: '', pechoCirc: 62, largoTotal: 40, largoManga: 32, largoSisa: 15, ranglan: 20, escoteBajoSisa: 9 },
    { etiqueta: '6 años', numTalla: '', pechoCirc: 66, largoTotal: 44, largoManga: 36, largoSisa: 16, ranglan: 21, escoteBajoSisa: 9 },
    { etiqueta: '8 años', numTalla: '', pechoCirc: 70, largoTotal: 48, largoManga: 40, largoSisa: 17, ranglan: 22, escoteBajoSisa: 10 },
    { etiqueta: '10 años', numTalla: '', pechoCirc: 76, largoTotal: 52, largoManga: 44, largoSisa: 18, ranglan: 23, escoteBajoSisa: 10 },
    // Tallas de Adulto (numTalla visible solo en estas)
    { etiqueta: 'XS', numTalla: '34-36', pechoCirc: 80, largoTotal: 58, largoManga: 56, largoSisa: 20, ranglan: 32, escoteBajoSisa: 14 },
    { etiqueta: 'S', numTalla: '38-40', pechoCirc: 88, largoTotal: 60, largoManga: 58, largoSisa: 22, ranglan: 36, escoteBajoSisa: 15 },
    { etiqueta: 'M', numTalla: '40-42', pechoCirc: 98, largoTotal: 62, largoManga: 59, largoSisa: 24, ranglan: 38, escoteBajoSisa: 16 },
    { etiqueta: 'L', numTalla: '42-44', pechoCirc: 108, largoTotal: 64, largoManga: 60, largoSisa: 26, ranglan: 40, escoteBajoSisa: 17 },
    { etiqueta: 'XL', numTalla: '46-48', pechoCirc: 118, largoTotal: 66, largoManga: 61, largoSisa: 28, ranglan: 42, escoteBajoSisa: 18 },
    { etiqueta: 'XXL', numTalla: '50-52', pechoCirc: 128, largoTotal: 68, largoManga: 62, largoSisa: 30, ranglan: 44, escoteBajoSisa: 19 }
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

// MODIFICADO: Muestra/oculta campos según el método elegido
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
 * (Corregido el formato, lógica de chaqueta, y pasadas opcionales)
 */
function calcularDesdeBajo(p10, pa10, datosTalla, tipoPrenda, pieza) {
    const resultadosDiv = document.getElementById('contenido-resultados');
    const pXcm = p10 / 10;
    
    const pasadasValidas = pa10 > 0;
    let paXcm = pasadasValidas ? pa10 / 10 : 0;

    const tallaEtiquetaCompleta = getTallaEtiqueta(datosTalla);
    let html = `<h3>📐 Resultados para Talla ${tallaEtiquetaCompleta} - Pieza: **${pieza.toUpperCase()}**</h3>`;
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
            <p class="resultado-principal">Puntos a tejer para empezar (ancho ${anchoCM.toFixed(1)} cm): **${puntosIniciales} puntos**</p>
            <p>Largo total de la pieza (desde bajo a cuello): ${largoCM.toFixed(1)} cm</p>
            <hr>
            <p>
                Inicio de la Sisa: A los ${largoBajoSisa.toFixed(1)} cm desde el bajo. 
                ${pasadasValidas ? `(Aprox. **${pasadasBajoSisa} pasadas**).` : ''}
                <span class="nota-medida">(Sisa: ${datosTalla.largoSisa.toFixed(1)} cm)</span>
            </p>
            <p>
                Inicio del Escote (Redondo): A los ${(datosTalla.largoTotal - datosTalla.escoteBajoSisa).toFixed(1)} cm desde el bajo. 
                ${pasadasValidas ? `(Aprox. **${pasadasHastaEscote} pasadas**).` : ''}
                <span class="nota-medida">(Para un escote redondo estándar, la curva delantera tendrá una profundidad de aprox. ${profundidadEscoteFrontalCM.toFixed(1)} cm).</span>
            </p>
        `;

    } else if (pieza === 'delantero' && tipoPrenda === 'chaqueta') {
        const anchoEspalda = datosTalla.pechoCirc / 2;
        anchoCM = anchoEspalda / 2; 
        const puntosIniciales = Math.round(anchoCM * pXcm);
        
        html += `
            <p class="resultado-principal">Puntos a tejer para empezar para **UNA MITAD** del delantero (ancho ${anchoCM.toFixed(1)} cm): **${puntosIniciales} puntos**</p>
            <p>Largo total de la pieza (desde bajo a cuello): ${largoCM.toFixed(1)} cm</p>
            <hr>
            <p>
                Inicio de la Sisa: A los ${largoBajoSisa.toFixed(1)} cm desde el bajo. 
                ${pasadasValidas ? `(Aprox. **${pasadasBajoSisa} pasadas**).` : ''}
                <span class="nota-medida">(Sisa: ${datosTalla.largoSisa.toFixed(1)} cm)</span>
            </p>
            <p>
                Inicio del Escote (Redondo): A los ${(datosTalla.largoTotal - datosTalla.escoteBajoSisa).toFixed(1)} cm desde el bajo. 
                ${pasadasValidas ? `(Aprox. **${pasadasHastaEscote} pasadas**).` : ''}
                <span class="nota-medida">(Para un escote redondo estándar, la curva delantera tendrá una profundidad de aprox. ${profundidadEscoteFrontalCM.toFixed(1)} cm).</span>
            </p>

            <div class="nota-adicional">
                **NOTA ADICIONAL - CHAQEUETA:** Estos puntos (${puntosIniciales} puntos) corresponden a **UNA** de las mitades del delantero (derecha o izquierda). ¡Recuerda que debes sumar los puntos necesarios para la **tapeta/borde** (ej: 5-10 puntos) a este resultado!
            </div>
        `;

    } else if (pieza === 'mangas') {
        largoCM = datosTalla.largoManga;
        const puntosSisa = Math.round(datosTalla.pechoCirc * 0.4 * pXcm);
        const puntosIniciales = Math.round(datosTalla.pechoCirc * 0.18 * pXcm); 
        const pasadasLargoManga = pasadasValidas ? Math.round(largoCM * paXcm) : null;
        
        html += `
            <p class="resultado-principal">Puntos a tejer para empezar (Puño, ancho aprox. ${(datosTalla.pechoCirc * 0.18).toFixed(1)} cm): **${puntosIniciales} puntos**</p>
            <p>Puntos que deberá tener la manga al llegar a la sisa: **${puntosSisa} puntos**</p>
            <p>Largo total de la manga (desde sisa a puño): ${largoCM.toFixed(1)} cm</p>
            <hr>
            <p>
                Deberás tejer ${largoCM.toFixed(1)} cm. Aumenta puntos de manera uniforme para pasar de ${puntosIniciales} puntos a ${puntosSisa} puntos.
            </p>
            ${pasadasValidas ? `<p>Total de pasadas hasta el puño: **${pasadasLargoManga} pasadas**.</p>` : ''}
        `;
    }
    
    resultadosDiv.innerHTML = html;
}


/**
 * Realiza el cálculo para el método "Empezar por el Escote (Top-Down)".
 * (Corregido el formato y pasadas opcionales)
 */
function calcularDesdeEscote(p10, pa10, datosTalla, tipoPrenda) {
    const resultadosDiv = document.getElementById('contenido-resultados');
    const pXcm = p10 / 10;
    
    const pasadasValidas = pa10 > 0;
    let paXcm = pasadasValidas ? pa10 / 10 : 0;

    // ... (Lógica de reparto de puntos y cálculo de montaje) ...
    const anchoCuelloCM = datosTalla.pechoCirc * 0.3; 
    const puntosEscoteTotal = Math.round(anchoCuelloCM * pXcm); 
    const puntosRanglan = 8;
    let puntosRestantes = puntosEscoteTotal - puntosRanglan;
    const puntosBasePorParte = puntosRestantes / 6;
    let puntosEspalda = Math.round(puntosBasePorParte * 2.5);
    let puntosMangas = Math.round(puntosBasePorParte * 0.5);
    let puntosDelanteroTotal = puntosRestantes - puntosEspalda - (puntosMangas * 2);
    let puntosDelantero = tipoPrenda === 'chaqueta' ? Math.round(puntosDelanteroTotal / 2) : puntosDelanteroTotal;
    const puntosMontados = puntosEspalda + (puntosMangas * 2) + (puntosDelantero * (tipoPrenda === 'chaqueta' ? 2 : 1)) + puntosRanglan;
    // ... (Fin de la lógica de reparto) ...

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
        <p class="resultado-principal">Puntos para montar en el escote (ancho ${anchoCuelloCM.toFixed(1)} cm): **${puntosMontados} puntos**</p>
        <hr>
        
        <h4>Reparto de Puntos Inicial (Antes de empezar a hacer aumentos):</h4>
        <ul>
            <li>Espalda: **${puntosEspalda}** puntos.</li>
            <li>Mangas (c/u): **${puntosMangas}** puntos.</li>
            <li>Delantero (total/cada lado): **${puntosDelantero}** puntos (Si es chaqueta, ${puntosDelantero} puntos en cada lado).</li>
            <li>Ranglan (c/u): 2 puntos (para cada una de las 4 líneas de aumento).</li>
        </ul>
        <p class="nota-medida">*(Nota: El total de puntos repartidos es ${puntosMontados} puntos)*</p>
    `;
    
    if (tipoPrenda === 'chaqueta') {
        html += `<div class="nota-adicional">
            **ATENCIÓN - CHAQEUETA:** Los ${puntosDelantero} puntos del delantero deben tejerse en dos mitades (lado derecho e izquierdo). 
            Recuerda sumar los puntos adicionales (ej: 5 a 10 puntos) para la **tapeta/borde** a cada mitad del delantero.
        </div>`;
    }

    html += `
        <hr>
        <h4>Instrucciones de Largo:</h4>
        <p>
            Largo del Ranglan (Diagonal Escote a Sisa): Teje hasta que la línea de ranglan mida ${largoRanglanCM.toFixed(1)} cm.
            ${pasadasValidas ? `<span class="nota-medida">(Aprox. **${pasadasRanglan} pasadas** de aumento).</span>` : ''}
        </p>
        <p>
            Largo de las Mangas (desde sisa a puño): ${largoMangaCM.toFixed(1)} cm.
            ${pasadasValidas ? `<span class="nota-medida">(Aprox. **${pasadasLargoManga} pasadas**).</span>` : ''}
        </p>
        <p>
            Largo del Cuerpo (desde sisa al bajo): ${largoCuerpoCM.toFixed(1)} cm.
            ${pasadasValidas ? `<span class="nota-medida">(Aprox. **${pasadasLargoCuerpo} pasadas**).</span>` : ''}
        </p>
    `;
    
    // Sugerencia de cuello
    const pasadasCuello = pasadasValidas ? Math.round(2.5 * paXcm) : null;

    html += `<div class="nota-adicional">
        SUGERENCIA DE CUELLO: Sugerimos tejer al menos ${pasadasValidas ? `**${pasadasCuello} pasadas** ` : ''} (aprox. 2.5cm) en punto elástico (ej: 1/1, 2/2) para la terminación del cuello antes de dividir los puntos y empezar con los aumentos del ranglan.
    </div>`;
    
    resultadosDiv.innerHTML = html;
}

/**
 * Realiza el cálculo para el método "Solo Regla de Tres (CM a Puntos)".
 * @param {number} p10 Puntos en 10cm.
 * @param {number} pa10 Pasadas en 10cm (Opcional).
 * @param {number} cmDeseados Centímetros que el usuario desea medir.
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
        <p class="resultado-principal">Puntos necesarios: **${puntosNecesarios} puntos**</p>
        <hr>
        <p>
            Esto significa que para tejer **${cmDeseados.toFixed(1)} cm** de ancho,
            necesitas montar **${puntosNecesarios} puntos**, basándote en tu muestra de **${p10} puntos en 10 cm**.
        </p>
    `;
    
    if (pasadasValidas) {
        html += `
            <p class="resultado-principal">Pasadas (hileras) necesarias:</p>
            <p>
                Para tejer **${cmDeseados.toFixed(1)} cm** de largo,
                necesitas realizar **${pasadasNecesarias} pasadas**, basándote en tu muestra de **${pa10} pasadas en 10 cm**.
            </p>
        `;
    } else {
        html += `<p class="nota-medida">*(Para calcular las pasadas, introduce el dato en el campo de "Pasadas en 10cm")*</p>`;
    }

    resultadosDiv.innerHTML = html;
}
