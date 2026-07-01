/**
 * Inicializa el revelado progresivo del contenido del detalle (markdown renderizado).
 *
 * Observa cada elemento directo de `.detalle-contenido` con `IntersectionObserver`.
 * Al entrar en el viewport se aplica `is-visible` para activar la animación CSS
 * (desplazamiento horizontal desde la derecha + fade in).
 *
 * Respeta `prefers-reduced-motion: reduce` y la ausencia de `IntersectionObserver`.
 */
export const inicializarRevelarDetalle = (): void => {
  const contenedor = document.querySelector<HTMLElement>('.detalle-cuerpo');
  if (!contenedor) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const elementos = contenedor.querySelectorAll<HTMLElement>(
    'h2, p, ul, ol, li, strong, code',
  );
  if (!elementos.length) return;

  const observador = new IntersectionObserver(
    (entradas, obs) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add('is-visible');
        obs.unobserve(entrada.target);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );

  elementos.forEach((elemento) => {
    if (
      elemento.classList.contains('js-detalle-reveal') ||
      elemento.classList.contains('is-visible')
    ) {
      return;
    }
    const rect = elemento.getBoundingClientRect();
    const enViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (enViewport) {
      elemento.classList.add('is-visible');
    } else {
      elemento.classList.add('js-detalle-reveal');
      observador.observe(elemento);
    }
  });
};
