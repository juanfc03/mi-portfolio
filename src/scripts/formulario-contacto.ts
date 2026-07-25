import type { NotificacionTipo } from '@/types/formulario';

const RUTAS_ICONO: Readonly<Record<NotificacionTipo, string>> = {
  exito: '<polyline points="20 6 9 17 4 12"></polyline>',
  error:
    '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>',
};

const CLASES_BASE_NOTIFICACION =
  'fixed top-4 right-4 z-100 flex items-center gap-3 px-6 py-4 transition-all duration-300 ease-in-out';

let temporizadorNotificacion: ReturnType<typeof setTimeout> | null = null;

const mostrarNotificacion = (
  tipo: NotificacionTipo,
  mensaje: string,
  notificacion: HTMLDivElement,
  iconoNotificacion: SVGSVGElement,
  mensajeNotificacion: HTMLParagraphElement,
): void => {
  iconoNotificacion.innerHTML = RUTAS_ICONO[tipo];
  iconoNotificacion.setAttribute('aria-hidden', 'true');
  mensajeNotificacion.textContent = mensaje;

  const claseTipo =
    tipo === 'exito' ? 'bg-green-600 text-white' : 'bg-red-600 text-white';
  notificacion.className = `${CLASES_BASE_NOTIFICACION} ${claseTipo} opacity-100 translate-x-0 pointer-events-auto`;

  notificacion.setAttribute('role', tipo === 'error' ? 'alert' : 'status');
  notificacion.setAttribute(
    'aria-live',
    tipo === 'error' ? 'assertive' : 'polite',
  );

  if (temporizadorNotificacion) clearTimeout(temporizadorNotificacion);
  temporizadorNotificacion = setTimeout(() => {
    notificacion.className = `${CLASES_BASE_NOTIFICACION} opacity-0 translate-x-4 pointer-events-none`;
  }, 4000);
};

/**
 * Inicializa el envío del formulario de contacto vía Netlify Forms.
 * Intercepta el submit, envía POST url-encoded a `/` y muestra
 * una notificación toast con el resultado durante 4 segundos.
 */
export const inicializarFormulario = (): void => {
  const formulario = document.querySelector<HTMLFormElement>(
    '#formulario-contacto',
  );
  if (!formulario) return;
  if (formulario.dataset.inicializado === 'true') return;
  formulario.dataset.inicializado = 'true';

  const notificacion = document.querySelector<HTMLDivElement>('#notificacion');
  const iconoNotificacion = document.querySelector<SVGSVGElement>(
    '#icono-notificacion',
  );
  const mensajeNotificacion = document.querySelector<HTMLParagraphElement>(
    '#mensaje-notificacion',
  );
  if (!notificacion || !iconoNotificacion || !mensajeNotificacion) return;

  formulario.addEventListener('submit', async evento => {
    evento.preventDefault();

    const datosFormulario = new FormData(formulario);
    const cuerpo = new URLSearchParams(
      Array.from(datosFormulario, ([clave, valor]) => [clave, String(valor)]),
    ).toString();

    try {
      const respuesta = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: cuerpo,
      });

      if (respuesta.ok) {
        mostrarNotificacion(
          'exito',
          '¡Mensaje enviado correctamente!',
          notificacion,
          iconoNotificacion,
          mensajeNotificacion,
        );
        formulario.reset();
      } else {
        mostrarNotificacion(
          'error',
          'Error al enviar el mensaje. Inténtalo de nuevo.',
          notificacion,
          iconoNotificacion,
          mensajeNotificacion,
        );
      }
    } catch {
      mostrarNotificacion(
        'error',
        'Error de conexión. Inténtalo de nuevo.',
        notificacion,
        iconoNotificacion,
        mensajeNotificacion,
      );
    }
  });
};
