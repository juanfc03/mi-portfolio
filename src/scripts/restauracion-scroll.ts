import type { BeforeSwapEvento } from '@/types/eventos-astro';

document.addEventListener('astro:before-swap', (evento) => {
  const event = evento as BeforeSwapEvento;
  if (event.navigationType === 'traverse') {
    const scrollYAnterior: number = history.state?.scrollY ?? 0;
    requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollYAnterior,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      });
    });
  } else {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
  }
});
