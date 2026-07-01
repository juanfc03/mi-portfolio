interface RutaAstro {
  pathname: string;
}

interface BeforeSwapEvento extends Event {
  readonly navigationType: 'push' | 'replace' | 'traverse';
  readonly from: RutaAstro;
  readonly to: RutaAstro;
}

interface BeforePreparationEvento extends Event {
  readonly from: RutaAstro;
  readonly to: RutaAstro;
}

export type { BeforeSwapEvento, BeforePreparationEvento, RutaAstro };
