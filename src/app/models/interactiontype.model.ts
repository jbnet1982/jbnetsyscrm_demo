export interface InteractionType {
  id: number;
  name: 'Llamada' | 'Correo Electrónico' | 'Reunión';
  icon: string; // Ejemplo: 'cil-phone', 'cil-envelope-closed'
}