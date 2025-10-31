// =================================================================================
// 1. DATOS DE TALLAS (MODIFICADO: numTalla vacío para bebés/niños)
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
    actualizarUI();
});

// MODIFICADO: Solo añade numTalla si existe para evitar duplicados y números en tallas pequeñas.
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
    const tipoPrenda = document.getElementById('tipo-prenda').value;

    // Solo mostrar selector de pieza para el método "Empezar por el Bajo"
    if (metodo === 'desde-bajo') {
        piezaDiv.style.display = 'block';
    } else {
        piezaDiv.style.display = 'none';
    }
}

function manejarCalculo(event) {
    event.preventDefault();

    const p10 = parseFloat(document.getElementById('puntos-10cm').value);
    const pa10Str = document.getElementById('pasadas-10cm').value;
    const pa10 = pa10Str === '' ? 0 : parseFloat(pa10Str); // Acepta cadena vacía como 0
    
    const metodo = document.getElementById('metodo').value;
    const tipoPrenda = document.getElementById('tipo-prenda').value;
    const etiquetaTalla = document.getElementById('selector-talla').value;
    const pieza = document.getElementById('pieza').value;

    if (isNaN(p10) || p10 <= 0) {
        alert("Por favor, introduce un número válido de Puntos en 10cm.");
        return;
    }

    const datosTalla = DATOS_TALLAS.find(t => t.etiqueta === etiquetaTalla);
    if (!datosTalla) return;

    if (metodo === 'desde-bajo') {
        calcularDesdeBajo(p10, pa10, datosTalla, tipoPrenda, pieza);
    } else if (metodo === 'desde-escote') {
        calcularDesdeEscote(p10, pa10, datosTalla, tipoPrenda);
    } else if (metodo === 'cm-deseados') {
        // Asumiendo que esta función existe y maneja pa10 opcionalmente
        calcularCmDeseados(p10, pa10, datosTalla); 
    }
}

// =================================================================================
// 3. FUNCIONES DE CÁLCULO
// =================================================================================

/**
 * Realiza el cálculo para el método "Empezar por el Bajo".
 * (CORREGIDO: Lógica de Chaqueta/Delantero, Escote y Pasadas Opcionales)
 */
function calcularDesdeBajo(p10, pa10, datosTalla, tipoPrenda, pieza) {
    const resultadosDiv = document.getElementById('contenido-resultados');
    const pXcm = p10 / 10;
    
    // VALIDACIÓN DE PASADAS/VUELTAS (pa10 > 0)
    const pasadasValidas = pa10 > 0;
    let paXcm = 0;
    if (pasadasValidas) {
        paXcm = pa10 / 10;
    }

    const tallaEtiquetaCompleta = datosTalla.numTalla ? `${datosTalla.etiqueta} (${datosTalla.numTalla})` : datosTalla.etiqueta;
    let html = `<h3>📐 Resultados para Talla ${tallaEtiquetaCompleta} - Pieza: **${pieza.toUpperCase()}**</h3>`;

    let anchoCM, anchoParaPuntos, largoCM;
    
    // Estimación de Profundidad de Escote Frontal (CORRECCIÓN DE VALORES)
    let profundidadEscoteFrontalCM;
    if (datosTalla.pechoCirc <= 56) {
        // Bebé (3.0 a 4.0 cm)
        profundidadEscoteFrontalCM = 3.5; 
    } else if (datosTalla.pechoCirc <= 90) {
        // Niño grande/Adulto pequeño (5.0 a 6.0 cm)
        profundidadEscoteFrontalCM = 6.0; 
    } else {
        // Adulto estándar/grande (7.0 a 8.5 cm)
        profundidadEscoteFrontalCM = 8.0; 
    }

    // Cálculos de largos comunes
    const largoBajoSisa = datosTalla.largoTotal - datosTalla.largoSisa;
    
    const pasadasBajoSisa = pasadasValidas ? Math.round(largoBajoSisa * paXcm) : null;
    const pasadasHastaEscote = pasadasValidas ? Math.round((datosTalla.largoTotal - datosTalla.escoteBajoSisa) * paXcm) : null;
    
    largoCM = datosTalla.largoTotal;

    if (pieza === 'espalda' || (pieza === 'delantero' && tipoPrenda === 'jersey')) {
        // Espalda o Delantero Jersey = Mitad del contorno de pecho
        anchoCM = datosTalla.pechoCirc / 2;
        anchoParaPuntos = anchoCM;
        const puntosIniciales = Math.round(anchoParaPuntos * pXcm);
        
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
        // Delantero Chaqueta = Mitad del ancho de la espalda
        const anchoEspalda = datosTalla.pechoCirc / 2;
        anchoCM = anchoEspalda / 2; 
        anchoParaPuntos = anchoCM;
        const puntosIniciales = Math.round(anchoParaPuntos * pXcm);
        
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
        anchoCM = datosTalla.pechoCirc * 0.2; 
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
 * (CORREGIDO: Formato simple y Pasadas Opcionales)
 */
function calcularDesdeEscote(p10, pa10, datosTalla, tipoPrenda) {
    const resultadosDiv = document.getElementById('contenido-resultados');
    const pXcm = p10 / 10;
    
    // VALIDACIÓN DE PASADAS/VUELTAS (pa10 > 0)
    const pasadasValidas = pa10 > 0;
    let paXcm = 0;
    if (pasadasValidas) {
        paXcm = pa10 / 10;
    }

    // 1. CÁLCULO DE PUNTOS TOTALES
    const anchoCuelloCM = datosTalla.pechoCirc * 0.3; 
    const puntosEscoteTotal = Math.round(anchoCuelloCM * pXcm); 
    
    // 2. REPARTO BASE
    const puntosRanglan = 8;
    let puntosRestantes = puntosEscoteTotal - puntosRanglan;
    const puntosBasePorParte = puntosRestantes / 6;
    
    let puntosEspalda = Math.round(puntosBasePorParte * 2.5);
    let puntosMangas = Math.round(puntosBasePorParte * 0.5);
    let puntosDelanteroTotal = puntosRestantes - puntosEspalda - (puntosMangas * 2);

    let puntosDelantero = puntosDelanteroTotal;
    if (tipoPrenda === 'chaqueta') {
        puntosDelantero = Math.round(puntosDelanteroTotal / 2);
    }

    const puntosMontados = puntosEspalda + (puntosMangas * 2) + (puntosDelantero * (tipoPrenda === 'chaqueta' ? 2 : 1)) + puntosRanglan;

    // 3. CÁLCULO DE LARGOS EN PASADAS
    const largoRanglanCM = datosTalla.ranglan; 
    const pasadasRanglan = pasadasValidas ? Math.round(largoRanglanCM * paXcm) : null;
    const largoMangaCM = datosTalla.largoManga;
    const pasadasLargoManga = pasadasValidas ? Math.round(largoMangaCM * paXcm) : null;
    const largoCuerpoCM = datosTalla.largoTotal - datosTalla.largoSisa;
    const pasadasLargoCuerpo = pasadasValidas ? Math.round(largoCuerpoCM * paXcm) : null;
    
    const tallaEtiquetaCompleta = datosTalla.numTalla ? `${datosTalla.etiqueta} (${datosTalla.numTalla})` : datosTalla.etiqueta;
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
    
    if (pasadasValidas) {
        html += `<div class="nota-adicional">
            SUGERENCIA DE CUELLO: Sugerimos tejer al menos **${Math.round(2.5 * paXcm)} pasadas** (aprox. 2.5cm) en punto elástico (ej: 1/1, 2/2) para la terminación del cuello antes de dividir los puntos y empezar con los aumentos del ranglan.
        </div>`;
    } else {
         html += `<div class="nota-adicional">
            SUGERENCIA DE CUELLO: Sugerimos tejer al menos 2.5 cm en punto elástico (ej: 1/1, 2/2) para la terminación del cuello antes de dividir los puntos y empezar con los aumentos del ranglan.
        </div>`;
    }
    
    resultadosDiv.innerHTML = html;
}

// ... (Otras funciones como calcularCmDeseados y funciones auxiliares si existen)
/**
 * Realiza el cálculo para el método "Solo Regla de Tres (CM a Puntos)".
 * Calcula puntos y pasadas para cualquier centímetro deseado.
 * @param {number} p10 Puntos en 10cm.
 * @param {number} pa10 Pasadas en 10cm (Opcional).
 */
function calcularCmDeseados(p10, pa10, datosTalla) {
    const resultadosDiv = document.getElementById('contenido-resultados');
    const pXcm = p10 / 10;
    
    // VALIDACIÓN DE PASADAS/VUELTAS
    const pasadasValidas = pa10 > 0;
    let paXcm = 0;
    if (pasadasValidas) {
        paXcm = pa10 / 10;
    }

    // Se necesita un campo de entrada para los CM deseados. 
    // Por simplicidad, asumiremos que tienes un input con ID 'cm-deseados-input' 
    // en tu HTML que solo se muestra con este método.

    // *******************************************************************
    // NOTA IMPORTANTE: Para que esto funcione, DEBES AÑADIR un nuevo input
    // en tu HTML cuando se selecciona el método 'cm-deseados'.
    // Por ahora, usamos un valor placeholder.
    // *******************************************************************
    const cmDeseados = 30; // <-- Cambia esto por el valor real del input del usuario
    
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
