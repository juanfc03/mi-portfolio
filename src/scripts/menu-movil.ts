/**
 * Controla la visibilidad, atributos ARIA e iconos del menú móvil.
 */
const establecerMenu = (
  menu: HTMLElement,
  iconoMenu: SVGElement,
  iconoCerrar: SVGElement,
  botonAlternar: HTMLButtonElement,
  abierto: boolean,
  enfocarPrimerEnlace = false,
): void => {
  menu.dataset.abierto = abierto ? 'true' : 'false';
  menu.inert = !abierto;
  iconoMenu.classList.toggle('hidden', abierto);
  iconoCerrar.classList.toggle('hidden', !abierto);
  botonAlternar.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  botonAlternar.setAttribute(
    'aria-label',
    abierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación',
  );

  if (abierto && enfocarPrimerEnlace) {
    const primerEnlace = menu.querySelector<HTMLAnchorElement>('a');
    primerEnlace?.focus();
  }
};

/**
 * Inicializa la lógica de alternancia del menú móvil (hamburguesa).
 * Usa un guardia `data-inicializado` para evitar duplicar listeners en SPA.
 */
export const inicializarMenuMovil = (): void => {
  const botonAlternar = document.querySelector<HTMLButtonElement>('#alternar-menu');
  const menu = document.querySelector<HTMLElement>('#menu-movil');
  const iconoMenu = document.querySelector<SVGElement>('#icono-menu');
  const iconoCerrar = document.querySelector<SVGElement>('#icono-cerrar');
  if (!botonAlternar || !menu || !iconoMenu || !iconoCerrar) return;

  if (botonAlternar.dataset.inicializado === 'true') return;
  botonAlternar.dataset.inicializado = 'true';

  botonAlternar.addEventListener('click', () => {
    const seAbrira = menu.dataset.abierto !== 'true';
    establecerMenu(menu, iconoMenu, iconoCerrar, botonAlternar, seAbrira, seAbrira);
  });

  menu.querySelectorAll('a').forEach((enlace) => {
    enlace.addEventListener('click', () =>
      establecerMenu(menu, iconoMenu, iconoCerrar, botonAlternar, false),
    );
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && menu.dataset.abierto === 'true') {
      establecerMenu(menu, iconoMenu, iconoCerrar, botonAlternar, false);
      botonAlternar.focus();
    }
  });
};
