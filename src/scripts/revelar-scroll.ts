/**
 * Inicializa el efecto de revelado progresivo de secciones al hacer scroll.
 *
 * Añade la clase `js-reveal` a las secciones de `main` que aún no son visibles
 * y las observa con `IntersectionObserver`. Cuando una sección entra en el
 * viewport se le aplica `is-visible` para activar la transición CSS.
 *
 * Respeta `prefers-reduced-motion: reduce` y la ausencia de `IntersectionObserver`.
 */
export const inicializarRevelarScroll = (): void => {
  const secciones = document.querySelectorAll<HTMLElement>('main > section');
  if (!secciones.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const observador = new IntersectionObserver(
    (entradas, obs) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add('is-visible');
        obs.unobserve(entrada.target);
      }
    },
    { threshold: 0.1 },
  );

  secciones.forEach((seccion) => {
    if (
      seccion.classList.contains('js-reveal') ||
      seccion.classList.contains('is-visible')
    ) {
      return;
    }
    const rect = seccion.getBoundingClientRect();
    const enViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (enViewport) {
      seccion.classList.add('is-visible');
    } else {
      seccion.classList.add('js-reveal');
      observador.observe(seccion);
    }
  });
};
