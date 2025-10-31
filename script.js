// Base de Datos de Medidas (en Centímetros)
// Tallas: 00 (prematuro), 0 (recién nacido), 1-3M, 3-6M, 6-9M, 9-12M, 12-18M, 18-24M
// Niños: 2, 3, 4, 5, 6, 7, 8, 9, 10 años
// Adultos: XS (36), S (38-40), M (40-42), L (42-44), XL (46-48), XXL (50-52)
const TALLAS_DATA = {
    // PREMATURO / BEBÉ
    '00': { etiqueta: '00 (Prematuro)', numTalla: '32', pechoCirc: 38, largoTotal: 18, largoSisa: 7, largoManga: 11, anchoEspalda: 18, ranglan: 12, escoteBajoSisa: 5 },
    '0': { etiqueta: '0 (Recién Nacido)', numTalla: '34', pechoCirc: 40, largoTotal: 20, largoSisa: 8, largoManga: 13, anchoEspalda: 19, ranglan: 13, escoteBajoSisa: 6 },
    '1-3M': { etiqueta: '1-3 Meses', numTalla: '36', pechoCirc: 44, largoTotal: 22, largoSisa: 9, largoManga: 15, anchoEspalda: 20, ranglan: 14, escoteBajoSisa: 6.5 },
    '3-6M': { etiqueta: '3-6 Meses', numTalla: '38', pechoCirc: 48, largoTotal: 25, largoSisa: 10, largoManga: 17, anchoEspalda: 21, ranglan: 15, escoteBajoSisa: 7 },
    '6-9M': { etiqueta: '6-9 Meses', numTalla: '40', pechoCirc: 50, largoTotal: 28, largoSisa: 10.5, largoManga: 19, anchoEspalda: 22, ranglan: 16, escoteBajoSisa: 7.5 },
    '9-12M': { etiqueta: '9-12 Meses', numTalla: '42', pechoCirc: 52, largoTotal: 31, largoSisa: 11, largoManga: 21, anchoEspalda: 23, ranglan: 17, escoteBajoSisa: 8 },
    '12-18M': { etiqueta: '12-18 Meses', numTalla: '44', pechoCirc: 54, largoTotal: 34, largoSisa: 12, largoManga: 23, anchoEspalda: 24, ranglan: 18, escoteBajoSisa: 9 },
    '18-24M': { etiqueta: '18-24 Meses', numTalla: '46', pechoCirc: 56, largoTotal: 37, largoSisa: 13, largoManga: 25, anchoEspalda: 25, ranglan: 19, escoteBajoSisa: 10 },
    
    // NIÑOS (Usando la referencia T2: Largo total 37, Bajo-Sisa 23, Escote desde bajo 33)
    '2A': { etiqueta: '2 Años', numTalla: '50', pechoCirc: 58, largoTotal: 37, largoSisa: 14, largoManga: 27, anchoEspalda: 27, ranglan: 20, escoteBajoSisa: 10.5 },
    '3A': { etiqueta: '3 Años', numTalla: '54', pechoCirc: 62, largoTotal: 41, largoSisa: 15, largoManga: 30, anchoEspalda: 30, ranglan: 22, escoteBajoSisa: 11 },
    '4A': { etiqueta: '4 Años', numTalla: '58', pechoCirc: 66, largoTotal: 44, largoSisa: 16, largoManga: 33, anchoEspalda: 35, ranglan: 24, escoteBajoSisa: 11.5 },
    '5A': { etiqueta: '5 Años', numTalla: '62', pechoCirc: 70, largoTotal: 47, largoSisa: 16.5, largoManga: 36, anchoEspalda: 36.5, ranglan: 25.5, escoteBajoSisa: 12 },
    '6A': { etiqueta: '6 Años', numTalla: '66', pechoCirc: 74, largoTotal: 50, largoSisa: 17, largoManga: 39, anchoEspalda: 38, ranglan: 27, escoteBajoSisa: 12.5 },
    '7A': { etiqueta: '7 Años', numTalla: '70', pechoCirc: 78, largoTotal: 51.5, largoSisa: 17.5, largoManga: 42, anchoEspalda: 39.5, ranglan: 28.5, escoteBajoSisa: 12.5 },
    '8A': { etiqueta: '8 Años', numTalla: '74', pechoCirc: 82, largoTotal: 53, largoSisa: 18, largoManga: 45, anchoEspalda: 41, ranglan: 30, escoteBajoSisa: 12 },
    '9A': { etiqueta: '9 Años', numTalla: '78', pechoCirc: 86, largoTotal: 55.5, largoSisa: 19, largoManga: 48, anchoEspalda: 42.5, ranglan: 31.5, escoteBajoSisa: 13 },
    '10A': { etiqueta: '10 Años', numTalla: '82', pechoCirc: 90, largoTotal: 58, largoSisa: 20, largoManga: 51, anchoEspalda: 44, ranglan: 33, escoteBajoSisa: 14 },
    
    // ADULTOS (Usando la referencia L: Largo Total 60)
    'XS': { etiqueta: 'XS (34-36)', numTalla: '34-36', pechoCirc: 84, largoTotal: 56, largoSisa: 21, largoManga: 58, anchoEspalda: 35, ranglan: 34, escoteBajoSisa: 15 },
    'S': { etiqueta: 'S (38-40)', numTalla: '38-40', pechoCirc: 92, largoTotal: 58, largoSisa: 22, largoManga: 59, anchoEspalda: 37, ranglan: 35.5, escoteBajoSisa: 16 },
    'M': { etiqueta: 'M (40-42)', numTalla: '40-42', pechoCirc: 100, largoTotal: 59, largoSisa: 23, largoManga: 60, anchoEspalda: 39, ranglan: 37, escoteBajoSisa: 17 },
    'L': { etiqueta: 'L (42-44)', numTalla: '42-44', pechoCirc: 108, largoTotal: 60, largoSisa: 24, largoManga: 61, anchoEspalda: 41, ranglan: 38.5, escoteBajoSisa: 18 },
    'XL': { etiqueta: 'XL (46-48)', numTalla: '46-48', pechoCirc: 116, largoTotal: 62, largoSisa: 25, largoManga: 62, anchoEspalda: 43, ranglan: 40, escoteBajoSisa: 19 },
    'XXL': { etiqueta: 'XXL (50-52)', numTalla: '50-52', pechoCirc: 124, largoTotal: 64, largoSisa: 26, largoManga: 63, anchoEspalda: 45, ranglan: 41.5, escoteBajoSisa: 20 }
};

// =========================================================================
// INICIALIZACIÓN Y MANEJO DE LA INTERFAZ
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    cargarOpcionesTalla();
    document.getElementById('metodoConstruccion').addEventListener('change', actualizarOpcionesUI);
    // Para asegurar que la UI se ajusta al cargar si hay valores predeterminados
    actualizarOpcionesUI(); 
});

/**
 * Carga las opciones de talla en el <select>
 */
function cargarOpcionesTalla() {
    const selectTalla = document.getElementById('talla');
    // Mapea y crea un elemento <option> por cada talla en TALLAS_DATA
    Object.keys(TALLAS_DATA).forEach(key => {
        const data = TALLAS_DATA[key];
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `${data.etiqueta} (${data.numTalla})`;
        selectTalla.appendChild(option);
    });
}

/**
 * Muestra u oculta los campos de selección de prenda/pieza según el método de construcción.
 */
function actualizarOpcionesUI() {
    const metodo = document.getElementById('metodoConstruccion').value;
    const opcionesPrendaDiv = document.getElementById('opciones-prenda');
    const opcionesPiezaDiv = document.getElementById('opciones-pieza');
    const opcionesCMDiv = document.getElementById('opciones-cm');
    const tipoPrendaSelect = document.getElementById('tipoPrenda');
    const piezaSelect = document.getElementById('pieza');

    // Ocultar todo por defecto
    opcionesPrendaDiv.classList.add('oculto');
    opcionesPiezaDiv.classList.add('oculto');
    opcionesCMDiv.classList.add('oculto');

    if (metodo === 'bajo' || metodo === 'escote') {
        opcionesPrendaDiv.classList.remove('oculto');
        
        // La pieza solo se elige si es por el bajo, NO si es Top-Down (escote)
        if (metodo === 'bajo') {
            opcionesPiezaDiv.classList.remove('oculto');
            // Requerir selección de prenda y pieza
            tipoPrendaSelect.required = true;
            piezaSelect.required = true;
        } else {
            // Si es escote, no se elige pieza (se calcula el total)
            opcionesPiezaDiv.classList.add('oculto');
            // Requerir solo selección de prenda (el jersey/chaqueta afecta al cálculo del delantero)
            tipoPrendaSelect.required = true;
            piezaSelect.required = false; // Ya no es necesario
        }
    } else if (metodo === 'cm') {
        opcionesCMDiv.classList.remove('oculto');
        // No se requiere prenda ni pieza
        tipoPrendaSelect.required = false;
        piezaSelect.required = false;
    } else {
        // Ningún método seleccionado
        tipoPrendaSelect.required = false;
        piezaSelect.required = false;
    }
}

// =========================================================================
// FUNCIONES DE CÁLCULO
// =========================================================================

/**
 * Realiza el cálculo principal al hacer clic en el botón.
 */
function calcularPuntos() {
    const puntos10cm = parseFloat(document.getElementById('puntos10cm').value);
    const pasadas10cm = parseFloat(document.getElementById('pasadas10cm').value);
    const metodo = document.getElementById('metodoConstruccion').value;
    const tipoPrenda = document.getElementById('tipoPrenda').value;
    const tallaKey = document.getElementById('talla').value;
    const pieza = document.getElementById('pieza').value;
    const cmDeseados = parseFloat(document.getElementById('cmDeseados').value);
    const resultadosDiv = document.getElementById('contenido-resultados');
    const errorDiv = document.getElementById('mensaje-error');
    
    // Resetear resultados y errores
    resultadosDiv.innerHTML = '';
    errorDiv.classList.add('oculto');
    errorDiv.textContent = '';

    // Validaciones básicas
    if (isNaN(puntos10cm) || puntos10cm <= 0 || isNaN(pasadas10cm) || pasadas10cm <= 0) {
        mostrarError("Debes introducir la Muestra de Tensión (Puntos y Pasadas en 10cm) con valores válidos.");
        return;
    }

    if (!metodo) {
        mostrarError("Debes seleccionar un Método de Construcción.");
        return;
    }

    // Validación según el método
    if (metodo === 'bajo' || metodo === 'escote') {
        if (!tipoPrenda || !tallaKey) {
            mostrarError("Debes seleccionar la Prenda y la Talla.");
            return;
        }
        if (metodo === 'bajo' && !pieza) {
            mostrarError("Debes seleccionar la Pieza a tejer (Delantero, Espalda o Mangas) para el método 'Empezar por el Bajo'.");
            return;
        }
    } else if (metodo === 'cm') {
        if (isNaN(cmDeseados) || cmDeseados <= 0) {
            mostrarError("Debes introducir los Centímetros Deseados (un valor numérico mayor que 0).");
            return;
        }
        
        // Si elige "CM Deseados", calcula y termina
        calcularCM(puntos10cm, pasadas10cm, cmDeseados);
        return;
    }
    
    // Si llegamos aquí, es 'bajo' o 'escote'
    const datosTalla = TALLAS_DATA[tallaKey];
    
    if (metodo === 'bajo') {
        calcularDesdeBajo(puntos10cm, pasadas10cm, datosTalla, tipoPrenda, pieza);
    } else if (metodo === 'escote') {
        calcularDesdeEscote(puntos10cm, pasadas10cm, datosTalla, tipoPrenda);
    }
}

/**
 * Muestra un mensaje de error.
 * @param {string} mensaje El mensaje de error.
 */
function mostrarError(mensaje) {
    const errorDiv = document.getElementById('mensaje-error');
    errorDiv.textContent = '⚠️ ' + mensaje;
    errorDiv.classList.remove('oculto');
    document.getElementById('contenido-resultados').innerHTML = '<p>Corrige los errores y vuelve a calcular.</p>';
}


/**
 * Calcula los puntos y pasadas para unos CM deseados.
 * @param {number} p10 Puntos en 10cm.
 * @param {number} pa10 Pasadas en 10cm.
 * @param {number} cm CM deseados.
 */
function calcularCM(p10, pa10, cm) {
    const puntos = Math.round((p10 / 10) * cm);
    const pasadas = Math.round((pa10 / 10) * cm);
    const resultadosDiv = document.getElementById('contenido-resultados');
    
    resultadosDiv.innerHTML = `
        <h3>Cálculo para ${cm.toFixed(1)} cm</h3>
        <p class="resultado-principal">
            Necesitas montar o tejer **${puntos} puntos** para ${cm.toFixed(1)} cm de ancho.
        </p>
        <p class="resultado-principal">
            Necesitas tejer **${pasadas} pasadas** para ${cm.toFixed(1)} cm de largo.
        </p>
        <p>Estos resultados te sirven para calcular cualquier pieza que no sea una prenda completa (ej: mantas, bufandas, puños, etc.).</p>
    `;
}

/**
 * Realiza el cálculo para el método "Empezar por el Bajo".
 * @param {number} p10 Puntos en 10cm.
 * @param {number} pa10 Pasadas en 10cm.
 * @param {object} datosTalla Objeto con las medidas de la talla.
 * @param {string} tipoPrenda 'jersey' o 'chaqueta'.
 * @param {string} pieza 'delantero', 'espalda' o 'mangas'.
 */
function calcularDesdeBajo(p10, pa10, datosTalla, tipoPrenda, pieza) {
    const resultadosDiv = document.getElementById('contenido-resultados');
    const pXcm = p10 / 10;
    const paXcm = pa10 / 10;
    let html = `<h3>📐 Resultados para Talla ${datosTalla.etiqueta} (${datosTalla.numTalla}) - Pieza: **${pieza.toUpperCase()}**</h3>`;

    let anchoCM, largoCM;
    let anchoParaPuntos = 0; // Usado para calcular los puntos iniciales

    if (pieza === 'espalda') {
        // La espalda es la mitad del contorno de pecho
        anchoCM = datosTalla.pechoCirc / 2;
        largoCM = datosTalla.largoTotal;
        anchoParaPuntos = anchoCM;
        
        const puntosIniciales = Math.round(anchoParaPuntos * pXcm);
        const largoBajoSisa = datosTalla.largoTotal - datosTalla.largoSisa; // Largo hasta el inicio de la sisa
        const pasadasBajoSisa = Math.round(largoBajoSisa * paXcm);
        const pasadasHastaEscote = Math.round((datosTalla.largoTotal - datosTalla.escoteBajoSisa) * paXcm);
        
        html += `
            <p class="resultado-principal">Puntos a tejer para empezar (ancho ${anchoCM.toFixed(1)} cm): **${puntosIniciales} puntos**</p>
            <p>Largo total de la pieza (desde bajo a cuello): **${largoCM.toFixed(1)} cm**</p>
            <hr>
            <p>
                **Inicio de la Sisa:** A los **${largoBajoSisa.toFixed(1)} cm** desde el bajo. 
                (Aprox. **${pasadasBajoSisa} pasadas**).
                <span class="nota-medida">(Sisa: ${datosTalla.largoSisa.toFixed(1)} cm)</span>
            </p>
            <p>
                **Inicio del Escote (Redondo):** A los **${datosTalla.largoTotal - datosTalla.escoteBajoSisa} cm** desde el bajo. 
                (Aprox. **${pasadasHastaEscote} pasadas**).
                <span class="nota-medida">(Escote: ${datosTalla.escoteBajoSisa.toFixed(1)} cm de profundidad desde el hombro)</span>
            </p>
        `;

    } else if (pieza === 'delantero') {
        // El delantero es la mitad del contorno de pecho
        anchoCM = datosTalla.pechoCirc / 2;
        largoCM = datosTalla.largoTotal;
        anchoParaPuntos = anchoCM;
        
        const puntosIniciales = Math.round(anchoParaPuntos * pXcm);
        const largoBajoSisa = datosTalla.largoTotal - datosTalla.largoSisa;
        const pasadasBajoSisa = Math.round(largoBajoSisa * paXcm);
        const pasadasHastaEscote = Math.round((datosTalla.largoTotal - datosTalla.escoteBajoSisa) * paXcm);
        
        html += `
            <p class="resultado-principal">Puntos a tejer para empezar (ancho ${anchoCM.toFixed(1)} cm): **${puntosIniciales} puntos**</p>
            <p>Largo total de la pieza (desde bajo a cuello): **${largoCM.toFixed(1)} cm**</p>
            <hr>
            <p>
                **Inicio de la Sisa:** A los **${largoBajoSisa.toFixed(1)} cm** desde el bajo. 
                (Aprox. **${pasadasBajoSisa} pasadas**).
                <span class="nota-medida">(Sisa: ${datosTalla.largoSisa.toFixed(1)} cm)</span>
            </p>
            <p>
                **Inicio del Escote (Redondo):** A los **${datosTalla.largoTotal - datosTalla.escoteBajoSisa} cm** desde el bajo. 
                (Aprox. **${pasadasHastaEscote} pasadas**).
                <span class="nota-medida">(Escote: ${datosTalla.escoteBajoSisa.toFixed(1)} cm de profundidad desde el hombro)</span>
            </p>
        `;
        
        if (tipoPrenda === 'chaqueta') {
            html += `<div class="nota-adicional">
                **NOTA ADICIONAL - CHAQEUETA:** Estos puntos son para la mitad del delantero. 
                Recuerda que si elijes tejer la pieza **entera** para luego dividirla, el total de puntos será el mismo que la espalda. 
                Si tejes las **dos mitades** por separado, deberás sumar los puntos de la **tapeta/borde** (ej: 5-10 puntos) al resultado para *cada lado*.
            </div>`;
        }

    } else if (pieza === 'mangas') {
        anchoCM = datosTalla.pechoCirc * 0.2; // Ancho del puño (aproximado, solo para referencia)
        largoCM = datosTalla.largoManga;
        anchoParaPuntos = datosTalla.anchoEspalda / 2; // Puntos iniciales se basan en el ancho del puño o el ancho que elija la tejedora
        
        const puntosSisa = Math.round(datosTalla.pechoCirc * 0.4 * pXcm); // Un ancho en la sisa (ej: 40% del contorno)
        const puntosIniciales = Math.round(datosTalla.pechoCirc * 0.18 * pXcm); // Puntos del puño, aprox. 18% del contorno
        const pasadasLargoManga = Math.round(largoCM * paXcm);
        
        html += `
            <p class="resultado-principal">Puntos a tejer para empezar (Puño, ancho aprox. ${(datosTalla.pechoCirc * 0.18).toFixed(1)} cm): **${puntosIniciales} puntos**</p>
            <p>Puntos que deberá tener la manga al llegar a la sisa (ancho ${datosTalla.largoSisa.toFixed(1)} cm): **${puntosSisa} puntos** (para encajar en la sisa)</p>
            <p>Largo total de la manga (desde sisa a puño): **${largoCM.toFixed(1)} cm**</p>
            <hr>
            <p>
                Deberás tejer un total de **${pasadasLargoManga} pasadas** hasta el puño. 
                Aumenta puntos de manera uniforme a lo largo de este tramo para pasar de ${puntosIniciales} puntos a ${puntosSisa} puntos.
            </p>
            <span class="nota-medida">(Largo de Sisa: ${datosTalla.largoSisa.toFixed(1)} cm)</span>
        `;
    }
    
    resultadosDiv.innerHTML = html;
}

/**
 * Realiza el cálculo para el método "Empezar por el Escote (Top-Down)".
 * @param {number} p10 Puntos en 10cm.
 * @param {number} pa10 Pasadas en 10cm.
 * @param {object} datosTalla Objeto con las medidas de la talla.
 * @param {string} tipoPrenda 'jersey' o 'chaqueta'.
 */
function calcularDesdeEscote(p10, pa10, datosTalla, tipoPrenda) {
    const resultadosDiv = document.getElementById('contenido-resultados');
    const pXcm = p10 / 10;
    const paXcm = pa10 / 10;
    
    // 1. CÁLCULO DE PUNTOS TOTALES
    // Ancho del cuello (aproximado 30% del contorno de pecho para un cuello estándar)
    const anchoCuelloCM = datosTalla.pechoCirc * 0.3; 
    const puntosEscoteTotal = Math.round(anchoCuelloCM * pXcm); 
    
    // 2. REPARTO BASE
    const puntosRanglan = 8; // 2 puntos por cada una de las 4 líneas de aumento
    let puntosRestantes = puntosEscoteTotal - puntosRanglan;

    // Reparto por cuartos, dando un poco más a la espalda. 
    // Distribución típica: 2/6 Espalda, 1/6 cada Manga, 2/6 Delantero (o 1/6 cada delantero en chaqueta)
    // Usaremos fracciones para mayor precisión: 2.5 partes Espalda, 2.5 partes Delantero, 0.5 partes cada Manga (Total 6 partes)
    
    const puntosBasePorParte = puntosRestantes / 6;
    
    let puntosEspalda = Math.round(puntosBasePorParte * 2.5);
    let puntosMangas = Math.round(puntosBasePorParte * 0.5); // Puntos de una sola manga
    let puntosDelanteroTotal = puntosRestantes - puntosEspalda - (puntosMangas * 2);

    // Ajustamos el delantero si es chaqueta
    let puntosDelantero = puntosDelanteroTotal;
    if (tipoPrenda === 'chaqueta') {
        // En chaqueta, el delantero total se divide en dos mitades
        puntosDelantero = Math.round(puntosDelanteroTotal / 2);
    }

    // Recalcular el total real después del redondeo para un check
    const puntosMontados = puntosEspalda + (puntosMangas * 2) + (puntosDelantero * (tipoPrenda === 'chaqueta' ? 2 : 1)) + puntosRanglan;

    // 3. CÁLCULO DE LARGOS EN PASADAS
    // Dimensiones de Ranglan
    const largoRanglanCM = datosTalla.ranglan; 
    const pasadasRanglan = Math.round(largoRanglanCM * paXcm);
    
    // Dimensiones de Largo
    const largoMangaCM = datosTalla.largoManga;
    const pasadasLargoManga = Math.round(largoMangaCM * paXcm);
    const largoCuerpoCM = datosTalla.largoTotal - datosTalla.largoSisa; // Largo desde la sisa al bajo
    const pasadasLargoCuerpo = Math.round(largoCuerpoCM * paXcm);
    
    let html = `<h3>📐 Resultados Top-Down (Escote) para Talla ${datosTalla.etiqueta} (${datosTalla.numTalla})</h3>`;

    html += `
        <p class="resultado-principal">Puntos para montar en el escote (ancho ${anchoCuelloCM.toFixed(1)} cm): **${puntosMontados} puntos**</p>
        <hr>
        
        <h4>Reparto de Puntos Inicial (Antes de empezar a hacer aumentos):</h4>
        <ul>
            <li>**Espalda:** **${puntosEspalda}** puntos.</li>
            <li>**Mangas (c/u):** **${puntosMangas}** puntos.</li>
            <li>**Delantero (total/cada lado):** **${puntosDelantero}** puntos (Si es chaqueta, **${puntosDelantero} puntos en cada lado**).</li>
            <li>**Ranglan (c/u):** **2** puntos (para cada una de las 4 líneas de aumento).</li>
        </ul>
        <p class="nota-medida">*(Nota: El total de puntos repartidos es ${puntosMontados} puntos)*</p>
    `;
    
    if (tipoPrenda === 'chaqueta') {
        html += `<div class="nota-adicional">
            **ATENCIÓN - CHAQEUETA:** Los **${puntosDelantero}** puntos del delantero deben tejerse en dos mitades (lado derecho e izquierdo). 
            Recuerda sumar los puntos adicionales (ej: 5 a 10 puntos) para la **tapeta/borde** a **cada mitad** del delantero.
        </div>`;
    }

    html += `
        <hr>
        <h4>Instrucciones de Largo:</h4>
        <p>
            **Largo del Ranglan (Diagonal Escote a Sisa):** Teje hasta que la línea de ranglan mida **${largoRanglanCM.toFixed(1)} cm**.
            <span class="nota-medida">(Aprox. **${pasadasRanglan} pasadas** de aumento).</span>
        </p>
        <p>
            **Largo de las Mangas (desde sisa a puño):** **${largoMangaCM.toFixed(1)} cm**.
            <span class="nota-medida">(Aprox. **${pasadasLargoManga} pasadas**).</span>
        </p>
        <p>
            **Largo del Cuerpo (desde sisa al bajo):** **${largoCuerpoCM.toFixed(1)} cm**.
            <span class="nota-medida">(Aprox. **${pasadasLargoCuerpo} pasadas**).</span>
        </p>
        
        <div class="nota-adicional">
            **SUGERENCIA DE CUELLO:** Sugerimos tejer al menos **${Math.round(2.5 * paXcm)} pasadas** (aprox. 2.5cm) en punto elástico (ej: 1/1, 2/2) para la terminación del cuello **antes** de dividir los puntos y empezar con los aumentos del ranglan.
        </div>
    `;
    
    resultadosDiv.innerHTML = html;
}
