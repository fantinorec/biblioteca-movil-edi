import type { Reserva } from './tipos';
import { mockLibros } from './libros';

// Guardamos las reservas en memoria (un arreglo del módulo).
// Persistencia real (AsyncStorage o API) queda para el 2do parcial.
const reservas: Reserva[] = [];

export function crearReserva(datos: Omit<Reserva, 'id'>): Reserva {
  const nueva: Reserva = { id: Date.now(), ...datos };
  reservas.push(nueva);

  // El libro pasa a estar "Reservado" para que el catálogo lo refleje.
  const libro = mockLibros.find((l) => l.id === datos.libroId);
  if (libro) libro.estado = 'Reservado';

  return nueva;
}

export function obtenerReservas(): Reserva[] {
  return [...reservas];
}

export function buscarReservaPorId(id: number): Reserva | undefined {
  return reservas.find((r) => r.id === id);
}
