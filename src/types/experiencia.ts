/**
 * Representa una experiencia laboral en el portfolio.
 */
export interface Experiencia {
  readonly empresa: string;
  readonly puesto: string;
  readonly fechaInicio: string;
  readonly fechaFin: string;
  readonly duracion: string;
  readonly ubicacion?: string;
  readonly descripcion: string;
}
