import type { BeforePreparationEvento } from '@/types/eventos-astro';

document.addEventListener('astro:before-preparation', (evento) => {
  try {
    const event = evento as BeforePreparationEvento;
    const desde = event.from?.pathname;
    if (desde) sessionStorage.setItem('jfc-ultima-ruta', desde);
  } catch {}
});
