// =================================================================================
// 1. DATOS DE TALLAS (SECCIÓN INICIAL SIN CAMBIOS)
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

// (El resto de funciones de inicialización y cálculo se mantienen igual hasta calcularDesdeEscote)

// =================================================================================
// 3. FUNCIONES DE CÁLCULO (FUNCIÓN MODIFICADA)
// =================================================================================

// (Funciones auxiliares y calcularDesdeBajo van aquí, sin cambios)

// ...

/**
 * Realiza el cálculo para el método "Empezar por el Escote (Top-Down - Ranglán)".
 */
function calcularDesdeEscote(p10, pa10, datosTalla, tipoPrenda) {
    const resultadosDiv = document.getElementById('contenido-resultados');
    const pXcm = p10 / 10;
    
    const pasadasValidas = pa10 > 0;
    let paXcm = pasadasValidas ? pa10 / 10 : 0;

    // 1. CÁLCULO DE PUNTOS TOTALES DEL CUELLO
    let anchoCuelloCM;
    let holguraCuelloCM = 0;
    const cuelloCircBase = datosTalla.cuelloCirc;
    
    // El 80% del contorno de cabeza es la medida base para montar los puntos
    anchoCuelloCM = cuelloCircBase * 0.8; 
    
    // Aplicar holgura adicional (+7 cm) solo para tallas de adulto si se desea
    if (datosTalla.pechoCirc >= 80) { 
        holguraCuelloCM = 7;
        anchoCuelloCM += holguraCuelloCM; // Sumamos los 7cm de holgura de cuello
    } 

    const puntosMontadosTotal = Math.round(anchoCuelloCM * pXcm); 
    
    const puntosRanglanFijos = 8;
    let puntosRestantes = puntosMontadosTotal - puntosRanglanFijos;

    // 2. REPARTO DE PUNTOS (Método 1/6 - 2/6 - 2/6 - 1/6)
    
    // La unidad base es la sexta parte de los puntos restantes
    const unidadBase = puntosRestantes / 6; 
    
    let puntosEspalda, puntosMangas, puntosDelantero, puntosDelanteroTotal;

    if (tipoPrenda === 'chaqueta') {
        // REPARTO PARA CHAQEUETA (1/6 para cada manga, 1/6 para cada delantero, 2/6 para espalda)
        puntosMangas = Math.round(unidadBase * 1); // 1/6
        puntosEspalda = Math.round(unidadBase * 2); // 2/6
        puntosDelantero = Math.round(unidadBase * 1); // 1/6 (Para CADA mitad del delantero)
        
        // El total de partes es 1(Manga) + 1(Delantero) + 2(Espalda) + 1(Delantero) + 1(Manga) = 6
        puntosDelanteroTotal = puntosDelantero * 2;
        
    } else {
        // REPARTO PARA JERSEY CERRADO (1/6 para cada manga, 2/6 para delantero, 2/6 para espalda)
        puntosMangas = Math.round(unidadBase * 1); // 1/6
        puntosEspalda = Math.round(unidadBase * 2); // 2/6
        puntosDelantero = Math.round(unidadBase * 2); // 2/6 (Pieza única)
        puntosDelanteroTotal = puntosDelantero;
    }

    // Ajuste fino para asegurar que la suma de los puntos sea EXACTAMENTE puntosMontadosTotal
    const sumaActual = puntosEspalda + (puntosMangas * 2) + puntosDelanteroTotal + puntosRanglanFijos;
    const diferencia = puntosMontadosTotal - sumaActual;
    
    // Ajustar la diferencia a la pieza más grande (Espalda) para mantener las proporciones.
    puntosEspalda += diferencia;
    
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
        <p class="resultado-principal">Puntos para montar en el escote (ancho ${anchoCuelloCM.toFixed(1)} cm): <strong>${puntosMontadosTotal} puntos</strong></p>
        <p class="nota-medida">*(Calculado como el 80% del contorno de cabeza + ${holguraCuelloCM} cm de holgura adicional si es adulto)*</p>
        <hr>
        
        <h4>Reparto de Puntos Inicial (Método ${tipoPrenda === 'chaqueta' ? '1-1-2-1-1' : '1-2-2-1'}):</h4>
        <ul>
            <li>Espalda (2/6 partes): <strong>${puntosEspalda}</strong> puntos.</li>
            <li>Mangas (cada una - 1/6 parte): <strong>${puntosMangas}</strong> puntos.</li>
            <li>Delantero (${tipoPrenda === 'chaqueta' ? 'cada mitad - 1/6 parte' : 'pieza única - 2/6 partes'}): <strong>${puntosDelantero}</strong> puntos.</li>
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

// ... (Resto de funciones sin cambios)
