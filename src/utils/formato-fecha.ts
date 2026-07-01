/**
 * Formatea una fecha en formato ISO (`YYYY-MM`) a una representación
 * legible en español (ej: "oct 2025").
 */
export const formatFecha = (iso: string): string => {
  const [year, month] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('es-ES', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1)));
};
