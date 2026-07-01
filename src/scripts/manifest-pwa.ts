/**
 * Inyecta de forma diferida el enlace al manifest PWA,
 * fuera de la ruta crítica de renderizado.
 */
export const inyectarManifest = (): void => {
  if (document.querySelector('link[rel="manifest"]')) return;
  const enlace = document.createElement('link');
  enlace.rel = 'manifest';
  enlace.href = '/site.webmanifest';
  document.head.appendChild(enlace);
};

/**
 * Inicializa la carga diferida del manifest PWA.
 * Usa `requestIdleCallback` si está disponible; en caso contrario,
 * difiere con `setTimeout`.
 */
export const inicializarManifestPwa = (): void => {
  const alCargar = (): void => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(inyectarManifest);
    } else {
      setTimeout(inyectarManifest, 0);
    }
  };
  alCargar();
};
