/**
 * Inicializa el botón "Volver" de la página de detalle de proyecto.
 *
 * Si el usuario llegó vía navegación SPA (hay ruta anterior en sessionStorage
 * y entradas en el historial), ejecuta `history.back()`. Si entró directamente
 * a la URL (deep link / refresco), redirige a la home.
 */
export const inicializarVolverDetalle = (): void => {
  const boton = document.getElementById('volver-detalle');
  if (!boton || boton.dataset.inicializado === 'true') return;
  boton.dataset.inicializado = 'true';

  boton.addEventListener('click', () => {
    let ultimaRuta: string | null = null;
    try {
      ultimaRuta = sessionStorage.getItem('jfc-ultima-ruta');
    } catch {}
    if (ultimaRuta !== null && history.length > 1) {
      history.back();
    } else {
      location.href = '/';
    }
  });
};
