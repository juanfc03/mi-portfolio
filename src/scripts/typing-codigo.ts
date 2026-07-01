const INTERVALO_LETRA = 35;

/**
 * Inicializa la animación de escritura letra a letra en el bloque de código
 * decorativo. Cada línea se escribe de forma secuencial. Al terminar todas,
 * se muestra un cursor parpadeante al final de la última línea.
 * Respeta `prefers-reduced-motion`.
 */
export const inicializarTypingCodigo = (): void => {
  const contenedores = document.querySelectorAll<HTMLElement>('.codigo-bloque');
  if (!contenedores.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  contenedores.forEach((contenedor) => {
    if (contenedor.dataset.typingIniciado === 'true') return;
    contenedor.dataset.typingIniciado = 'true';

    const lineas = Array.from(
      contenedor.querySelectorAll<HTMLSpanElement>('.linea-typing'),
    );
    if (!lineas.length) return;

    let lineaActual = 0;

    const escribirLinea = (): void => {
      if (lineaActual >= lineas.length) {
        const ultima = lineas[lineas.length - 1];
        ultima.insertAdjacentHTML('beforeend', '<span class="cursor">|</span>');
        return;
      }
      const span = lineas[lineaActual];
      const texto = span.dataset.texto ?? '';

      let indice = 0;
      const intervalo = setInterval(() => {
        indice++;
        span.textContent = texto.slice(0, indice);
        if (indice >= texto.length) {
          clearInterval(intervalo);
          lineaActual++;
          escribirLinea();
        }
      }, INTERVALO_LETRA);
    };

    escribirLinea();
  });
};
