// =================================================================================
// 1. DATOS DE TALLAS (FINAL: Incluye Contorno Puño y Contorno Brazo Superior)
// =================================================================================

const DATOS_TALLAS = [
    // Tallas de Bebé/Niño (Nuevas medidas: contornoPuno y contornoBrazoSup)
    { etiqueta: 'Prematuro (00)', numTalla: '', pechoCirc: 35, largoTotal: 18, largoManga: 10, largoSisa: 7, ranglan: 9.0, escoteBajoSisa: 4, cuelloCirc: 28, contornoPuno: 11, contornoBrazoSup: 16 }, 
    { etiqueta: '0 (Recién Nacido)', numTalla: '', pechoCirc: 40, largoTotal: 20, largoManga: 12, largoSisa: 8, ranglan: 10.0, escoteBajoSisa: 6, cuelloCirc: 30, contornoPuno: 12, contornoBrazoSup: 18 }, 
    { etiqueta: '1-3 meses', numTalla: '', pechoCirc: 44, largoTotal: 24, largoManga: 15, largoSisa: 9, ranglan: 11.0, escoteBajoSisa: 7, cuelloCirc: 33, contornoPuno: 13, contornoBrazoSup: 20 }, 
    { etiqueta: '3-6 meses', numTalla: '', pechoCirc: 46, largoTotal: 27, largoManga: 18, largoSisa: 10, ranglan: 12.5, escoteBajoSisa: 7, cuelloCirc: 35, contornoPuno: 14, contornoBrazoSup: 21 }, 
    { etiqueta: '6-12 meses', numTalla: '', pechoCirc: 50, largoTotal: 30, largoManga: 21, largoSisa: 12, ranglan: 15.0, escoteBajoSisa: 7, cuelloCirc: 38, contornoPuno: 14.5, contornoBrazoSup: 22 }, 
    { etiqueta: '12-18 meses', numTalla: '', pechoCirc: 52, largoTotal: 33, largoManga: 24, largoSisa: 13, ranglan: 16.0, escoteBajoSisa: 8, cuelloCirc: 40, contornoPuno: 15, contornoBrazoSup: 23 }, 
    { etiqueta: '2 años', numTalla: '', pechoCirc: 55, largoTotal: 35, largoManga: 27, largoSisa: 14, ranglan: 17.5, escoteBajoSisa: 8, cuelloCirc: 43, contornoPuno: 15.5, contornoBrazoSup: 24 }, 
    { etiqueta: '4 años', numTalla: '', pechoCirc: 66, largoTotal: 40, largoManga: 29, largoSisa: 16, ranglan: 20.0, escoteBajoSisa: 9, cuelloCirc: 46, contornoPuno: 16, contornoBrazoSup: 26 }, 
    { etiqueta: '6 años', numTalla: '', pechoCirc: 72, largoTotal: 44, largoManga: 31, largoSisa: 17, ranglan: 21.5, escoteBajoSisa: 9, cuelloCirc: 48, contornoPuno: 17, contornoBrazoSup: 27 }, 
    { etiqueta: '8 años', numTalla: '', pechoCirc: 78, largoTotal: 48, largoManga: 33, largoSisa: 18, ranglan: 22.5, escoteBajoSisa: 10, cuelloCirc: 50, contornoPuno: 18, contornoBrazoSup: 28 }, 
    { etiqueta: '10 años', numTalla: '', pechoCirc: 84, largoTotal: 52, largoManga: 36, largoSisa: 19, ranglan: 24.0, escoteBajoSisa: 10, cuelloCirc: 52, contornoPuno: 19, contornoBrazoSup: 30 }, 
    // Tallas de Adulto (Nuevas medidas: contornoPuno y contornoBrazoSup)
    { etiqueta: 'XS', numTalla: '34-36', pechoCirc: 88, largoTotal: 58, largoManga: 40, largoSisa: 20, ranglan: 26.0, escoteBajoSisa: 14, cuelloCirc: 54, contornoPuno: 20, contornoBrazoSup: 32 }, 
    { etiqueta: 'S', numTalla: '38-40', pechoCirc: 94, largoTotal: 60, largoManga: 42, largoSisa: 21, ranglan: 27.5, escoteBajoSisa: 15, cuelloCirc: 55, contornoPuno: 21, contornoBrazoSup: 34 }, 
    { etiqueta: 'M', numTalla: '40-42', pechoCirc: 102, largoTotal: 62, largoManga: 44, largoSisa: 22, ranglan: 29.0, escoteBajoSisa: 16, cuelloCirc: 56, contornoPuno: 22, contornoBrazoSup: 36 }, 
    { etiqueta: 'L', numTalla: '42-44', pechoCirc: 110, largoTotal: 64, largoManga: 45, largoSisa: 23, ranglan: 30.5, escoteBajoSisa: 17, cuelloCirc: 58, contornoPuno: 23, contornoBrazoSup: 38 }, 
    { etiqueta: 'XL', numTalla: '46-48', pechoCirc: 118, largoTotal: 66, largoManga: 46, largoSisa: 24, ranglan: 32.0, escoteBajoSisa: 18, cuelloCirc: 60, contornoPuno: 24, contornoBrazoSup: 40 }, 
    { etiqueta: 'XXL', numTalla: '50-52', pechoCirc: 126, largoTotal: 68, largoManga: 47, largoSisa: 25, ranglan: 34.0, escoteBajoSisa: 19, cuelloCirc: 62, contornoPuno: 25, contornoBrazoSup: 42 } 
];

// =================================================================================
// 2. FUNCIONES DE INICIALIZACIÓN Y EVENTOS (SIN CAMBIOS)
// =================================================================================

document.addEventListener('DOMContentLoaded', () => {
    cargarTallas(DATOS_TALLAS);
    document.getElementById('calculadora-form').addEventListener('submit', manejarCalculo);
    document.getElementById('metodo').addEventListener('change', actualizarUI);
    actualizarUI(); 
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
    document.getElementById('resultados').style.display = 'block'; 

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
// 3. FUNCIONES DE CÁLCULO (LÓGICA ACTUALIZADA PARA MANGAS)
// =================================================================================

function getTallaEtiqueta(datosTalla) {
    return datosTalla.numTalla ? `${datosTalla.etiqueta} (${datosTalla.numTalla})` : datosTalla.etiqueta;
}

/**
 * Agrega el cálculo detallado de la forma de manga (Bottom-Up) a los resultados.
 */
function agregarCalculoMangaBottomUp(html, pXcm, paXcm, pasadasValidas, datosTalla) {
    const pUno = datosTalla.contornoPuno / 2; // Media circunferencia del puño
    const pSisa = datosTalla.contornoBrazoSup / 2; // Media circunferencia del brazo sup.

    const puntosIniciales = Math.round(datosTalla.contornoPuno * pXcm);
    const puntosFinales = Math.round(datosTalla.contornoBrazoSup * pXcm);
    
    const totalIncrementoPuntadas = puntosFinales - puntosIniciales;

    html += `<div class="nota-adicional">
        <h4>Forma de la Manga (Bottom-Up)</h4>
        <p>Puntos iniciales (Puño): <strong>${puntosIniciales}</strong> puntos.</p>
        <p>Puntos finales (Sisa): <strong>${puntosFinales}</strong> puntos.</p>
        <p>Puntos totales a aumentar: <strong>${totalIncrementoPuntadas}</strong> puntos.</p>`;

    if (pasadasValidas) {
        const totalFilasParaManga = Math.round(datosTalla.largoManga * 10 * paXcm / 10); // Largo * Filas/cm

        // Aumentos se hacen de 2 en 2 (uno a cada lado)
        const numeroDeEventosDeAumento = Math.ceil(totalIncrementoPuntadas / 2);

        // La frecuencia debe ser al menos 2 pasadas (aumentar en una pasada de derecho, descansar en la de revés)
        let aumentarFrecuenciaEnFilas = Math.floor(totalFilasParaManga / numeroDeEventosDeAumento);
        aumentarFrecuenciaEnFilas = Math.max(2, aumentarFrecuenciaEnFilas); // Mínimo de 2 pasadas

        // Calcular el número real de veces que se aumentará
        const vecesRealAumentar = Math.floor(totalFilasParaManga / aumentarFrecuenciaEnFilas);
        
        // Los aumentos sobrantes (por el redondeo) se hacen al principio o se reparten
        const aumentosSobrantes = numeroDeEventosDeAumento - vecesRealAumentar;

        html += `<p>Total de pasadas disponibles: <strong>${totalFilasParaManga}</strong> pasadas.</p>
            <p>Deberás realizar **${numeroDeEventosDeAumento}** eventos de aumento (uno a cada lado).</p>
            <p class="resultado-principal-manga">
                Se recomienda hacer 1 aumento a cada lado cada **${aumentarFrecuenciaEnFilas}** pasadas.
            </p>
            <p class="nota-medida">
                *Esto cubrirá ${vecesRealAumentar * 2} de los ${totalIncrementoPuntadas} puntos. Si ${aumentosSobrantes > 0 ? `sobran ${aumentosSobrantes * 2} puntos, repártelos al inicio.` : 'no sobran aumentos, simplemente sigue la secuencia.'}*
            </p>`;
    } else {
        html += `<p class="resultado-principal-manga">
            Reparte los **${totalIncrementoPuntadas}** puntos de aumento uniformemente a lo largo de los **${datosTalla.largoManga.toFixed(1)} cm** de la manga.
        </p>
        <p class="nota-medida">
            *(Para la frecuencia exacta de pasadas, introduce el dato en el campo "Pasadas en 10cm").*
        </p>`;
    }

    html += `</div>`;
    return html;
}

/**
 * Agrega el cálculo detallado de la forma de manga (Top-Down) a los resultados.
 */
function agregarCalculoMangaTopDown(html, pXcm, paXcm, pasadasValidas, datosTalla) {
    const puntosIniciales = Math.round(datosTalla.contornoBrazoSup * pXcm);
    const puntosFinales = Math.round(datosTalla.contornoPuno * pXcm);
    
    const totalDisminucionPuntadas = puntosIniciales - puntosFinales;

    html += `<div class="nota-adicional">
        <h4>Forma de la Manga (Top-Down)</h4>
        <p>Puntos iniciales (Sisa): <strong>${puntosIniciales}</strong> puntos.</p>
        <p>Puntos finales (Puño): <strong>${puntosFinales}</strong> puntos.</p>
        <p>Puntos totales a disminuir: <strong>${totalDisminucionPuntadas}</strong> puntos.</p>`;

    if (pasadasValidas) {
        const totalFilasParaManga = Math.round(datosTalla.largoManga * 10 * paXcm / 10); // Largo * Filas/cm

        // Disminuciones se hacen de 2 en 2 (uno a cada lado)
        const numeroDeEventosDeDisminucion = Math.ceil(totalDisminucionPuntadas / 2);

        // La frecuencia debe ser al menos 2 pasadas
        let disminuirFrecuenciaEnFilas = Math.floor(totalFilasParaManga / numeroDeEventosDeDisminucion);
        disminuirFrecuenciaEnFilas = Math.max(2, disminuirFrecuenciaEnFilas); // Mínimo de 2 pasadas

        // Calcular el número real de veces que se disminuirá
        const vecesRealDisminuir = Math.floor(totalFilasParaManga / disminuirFrecuenciaEnFilas);
        
        // Disminuciones sobrantes (por el redondeo)
        const disminucionesSobrantes = numeroDeEventosDeDisminucion - vecesRealDisminuir;

        html += `<p>Total de pasadas disponibles: <strong>${totalFilasParaManga}</strong> pasadas.</p>
            <p>Deberás realizar **${numeroDeEventosDeDisminucion}** eventos de disminución (uno a cada lado).</p>
            <p class="resultado-principal-manga">
                Se recomienda hacer 1 disminución a cada lado cada **${disminuirFrecuenciaEnFilas}** pasadas.
            </p>
            <p class="nota-medida">
                *Esto cubrirá ${vecesRealDisminuir * 2} de los ${totalDisminucionPuntadas} puntos. Si ${disminucionesSobrantes > 0 ? `sobran ${disminucionesSobrantes * 2} puntos, repártelos uniformemente.` : 'no sobran disminuciones, simplemente sigue la secuencia.'}*
            </p>`;
    } else {
        html += `<p class="resultado-principal-manga">
            Reparte los **${totalDisminucionPuntadas}** puntos de disminución uniformemente a lo largo de los **${datosTalla.largoManga.toFixed(1)} cm** de la manga.
        </p>
        <p class="nota-medida">
            *(Para la frecuencia exacta de pasadas, introduce el dato en el campo "Pasadas en 10cm").*
        </p>`;
    }

    html += `</div>`;
    return html;
}

// ------------------- Función calcularDesdeBajo (Bottom-Up) -------------------
function calcularDesdeBajo(p10, pa10, datosTalla, tipoPrenda, pieza) {
    const resultadosDiv = document.getElementById('contenido-resultados');
    const pXcm = p10 / 10;
    
    const pasadasValidas = pa10 > 0;
    let paXcm = pasadasValidas ? pa10 / 10 : 0;

    const tallaEtiquetaCompleta = getTallaEtiqueta(datosTalla);
    let html = `<h3>📐 Resultados para Talla ${tallaEtiquetaCompleta} - Pieza: ${pieza.toUpperCase()}</h3>`;
    let anchoCM, largoCM;
    
    let profundidadEscoteFrontalCM;
    if (datosTalla.pechoCirc <= 56) {
        profundidadEscoteFrontalCM = 3.5; 
    } else if (datosTalla.pechoCirc <= 90) {
        profundidadEscoteFrontalCM = 6.0; 
    } else {
        profundidadEscoteFrontalCM = 8.0; 
    }

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
        
        // Puntos y pasadas para la cabeza de manga (no el cuerpo)
        const puntosSisa = Math.round(datosTalla.contornoBrazoSup * pXcm);
        const puntosIniciales = Math.round(datosTalla.contornoPuno * pXcm); 
        const pasadasLargoManga = pasadasValidas ? Math.round(largoCM * paXcm) : null;
        
        const anchoMangaSisaCM = datosTalla.contornoBrazoSup; // Usar contorno brazo superior

        html += `
            <p class="resultado-principal">Puntos a tejer para empezar (Puño, ancho aprox. ${datosTalla.contornoPuno.toFixed(1)} cm): <strong>${puntosIniciales} puntos</strong></p>
            <p>Puntos que deberá tener la manga al llegar a la sisa (Ancho Aprox. ${anchoMangaSisaCM.toFixed(1)} cm): <strong>${puntosSisa} puntos</strong></p>
            <p>Largo total de la manga (desde sisa a puño): ${largoCM.toFixed(1)} cm</p>
            <hr>
            <p>
                Deberás tejer ${largoCM.toFixed(1)} cm. Aumenta puntos de manera uniforme para pasar de ${puntosIniciales} puntos a ${puntosSisa} puntos.
            </p>
            ${pasadasValidas ? `<p>Total de pasadas hasta la sisa: <strong>${pasadasLargoManga} pasadas</strong>.</p>` : ''}
        `;
        
        // ** NUEVO CALCULO DETALLADO DE MANGA BOTTOM-UP **
        html = agregarCalculoMangaBottomUp(html, pXcm, paXcm, pasadasValidas, datosTalla);
    }
    
    resultadosDiv.innerHTML = html;
}

// ------------------- Función calcularDesdeEscote (Top-Down) -------------------
function calcularDesdeEscote(p10, pa10, datosTalla, tipoPrenda) {
    const resultadosDiv = document.getElementById('contenido-resultados');
    const pXcm = p10 / 10;
    
    const pasadasValidas = pa10 > 0;
    let paXcm = pasadasValidas ? pa10 / 10 : 0;

    let anchoCuelloCM;
    let holguraCuelloCM = 0;
    const cuelloCircBase = datosTalla.cuelloCirc;
    
    anchoCuelloCM = cuelloCircBase * 0.8; 
    
    if (datosTalla.pechoCirc >= 80) { 
        holguraCuelloCM = 7;
        anchoCuelloCM += holguraCuelloCM; 
    } 

    const puntosMontadosTotal = Math.round(anchoCuelloCM * pXcm); 
    
    const puntosRanglanFijos = 8;
    let puntosRestantes = puntosMontadosTotal - puntosRanglanFijos;

    const unidadBase = puntosRestantes / 6; 
    
    let puntosEspalda, puntosMangas, puntosDelantero, puntosDelanteroTotal;

    if (tipoPrenda === 'chaqueta') {
        puntosMangas = Math.round(unidadBase * 1); 
        puntosEspalda = Math.round(unidadBase * 2); 
        puntosDelantero = Math.round(unidadBase * 1); 
        puntosDelanteroTotal = puntosDelantero * 2;
    } else {
        puntosMangas = Math.round(unidadBase * 1); 
        puntosEspalda = Math.round(unidadBase * 2); 
        puntosDelantero = Math.round(unidadBase * 2); 
        puntosDelanteroTotal = puntosDelantero;
    }

    const sumaActual = puntosEspalda + (puntosMangas * 2) + puntosDelanteroTotal + puntosRanglanFijos;
    const diferencia = puntosMontadosTotal - sumaActual;
    
    puntosEspalda += diferencia;
    
    const largoRanglanCM = datosTalla.ranglan; 
    const pasadasRanglan = pasadasValidas ? Math.round(largoRanglanCM * paXcm) : null;
    const largoMangaCM = datosTalla.largoManga;
    const pasadasLargoManga = pasadasValidas ? Math.round(largoMangaCM * paXcm) : null;
    const largoCuerpoCM = datosTalla.largoTotal - datosTalla.largoSisa;
    const pasadasLargoCuerpo = pasadasValidas ? Math.round(largoCuerpoCM * paXcm) : null;
    
    const tallaEtiquetaCompleta = getTallaEtiqueta(datosTalla);
    let html = `<h3>📐 Resultados Top-Down (Escote) para Talla ${tallaEtiquetaCompleta}</h3>`;

    html += `
        <p class="resultado-principal">Puntos a montar en el escote: <strong>${puntosMontadosTotal} puntos</strong></p>
        <p class="nota-medida">*(Para un ancho aproximado de ${anchoCuelloCM.toFixed(1)} cm)*</p>
        <hr>
        
        <h4>Distribución de Puntos Inicial:</h4>
        <ul>
            <li>Espalda: <strong>${puntosEspalda}</strong> puntos.</li>
            <li>Mangas (cada una): <strong>${puntosMangas}</strong> puntos.</li>
            <li>Ranglan (4 marcadores): 8 puntos fijos.</li>
    `;
    
    if (tipoPrenda === 'chaqueta') {
        html += `<li>Delantero (cada mitad): <strong>${puntosDelantero}</strong> puntos.</li>`;
    } else {
        html += `<li>Delantero (pieza única): <strong>${puntosDelantero}</strong> puntos.</li>`;
    }

    html += `
        </ul>
        <p class="nota-medida">*(Total de puntos iniciales: ${puntosMontadosTotal} puntos)*</p>
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
            Largo del Ranglan (Diagonal Escote a Sisa): Teje hasta que la línea de ranglan mida **${largoRanglanCM.toFixed(1)} cm**.
            ${pasadasValidas ? `<span class="nota-medida">(Aproximadamente <strong>${pasadasRanglan} pasadas</strong> de aumento).</span>` : ''}
        </p>
        <p>
            Largo de las Mangas (desde sisa a puño): ${largoMangaCM.toFixed(1)} cm.
            ${pasadasValidas ? `<span class="nota-medida">(Aproximadamente <strong>${pasadasLargoManga} pasadas</strong>).</span>` : ''}
        </p>
    `;
    
    // ** NUEVO CALCULO DETALLADO DE MANGA TOP-DOWN **
    // Agregamos el cálculo de la manga Top-Down aquí:
    html = agregarCalculoMangaTopDown(html, pXcm, paXcm, pasadasValidas, datosTalla);
    
    // Continuamos con el cuerpo
    html += `
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
