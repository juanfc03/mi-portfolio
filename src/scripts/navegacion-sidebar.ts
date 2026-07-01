/**
 * Convierte los enlaces del sidebar de secciones en navegación
 * por scroll sin añadir entradas al historial, para que el botón
 * "Volver" pueda hacer `history.back()` correctamente hasta la home.
 */
export const inicializarNavegacionSidebar = (): void => {
  const sidebar = document.querySelector<HTMLElement>('[data-sidebar]');
  if (!sidebar) return;

  sidebar.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((enlace) => {
    enlace.addEventListener('click', (evento) => {
      evento.preventDefault();
      const destino = document.querySelector(enlace.getAttribute('href') ?? '');
      destino?.scrollIntoView({ behavior: 'smooth' });
    });
  });
};
