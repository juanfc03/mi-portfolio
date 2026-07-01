/**
 * Representa una categoría de tecnologías con su listado de herramientas.
 */
export interface CategoriaTecnologia {
  readonly nombre: string;
  readonly tecnologias: readonly string[];
}
