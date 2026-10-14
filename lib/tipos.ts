// Contrato de datos de la app (clase 2 y clase 5).
// Si mañana los datos vienen de una API real, estos tipos se mantienen.

// Unión de valores cerrados: TypeScript no deja usar otro estado.
export type EstadoLibro = 'Disponible' | 'Prestado' | 'Reservado';

export type Libro = {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  anio: number;
  paginas: number;
  descripcion: string;
  estado: EstadoLibro;
};

export type Reserva = {
  id: number;
  libroId: number;
  tituloLibro: string;
  nombre: string;
  numeroSocio: string;
  fechaRetiro: string; // formato dd/mm/aaaa
  dias: number;
};
