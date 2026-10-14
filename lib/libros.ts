import type { Libro } from './tipos';

// MOCK: datos ficticios con la misma forma que tendrán los datos reales.
// No es una base de datos: si se cierra la app, los cambios se pierden.
export const mockLibros: Libro[] = [
  {
    id: 1,
    titulo: 'Rayuela',
    autor: 'Julio Cortázar',
    genero: 'Novela',
    anio: 1963,
    paginas: 600,
    descripcion:
      'Novela que puede leerse en distintos órdenes. Sigue a Horacio Oliveira entre París y Buenos Aires.',
    estado: 'Disponible',
  },
  {
    id: 2,
    titulo: 'Ficciones',
    autor: 'Jorge Luis Borges',
    genero: 'Cuentos',
    anio: 1944,
    paginas: 224,
    descripcion: 'Colección de cuentos sobre laberintos, bibliotecas infinitas y espejos.',
    estado: 'Prestado',
  },
  {
    id: 3,
    titulo: 'El túnel',
    autor: 'Ernesto Sabato',
    genero: 'Novela',
    anio: 1948,
    paginas: 160,
    descripcion: 'Juan Pablo Castel narra desde la cárcel la historia de su obsesión.',
    estado: 'Disponible',
  },
  {
    id: 4,
    titulo: 'Martín Fierro',
    autor: 'José Hernández',
    genero: 'Poesía',
    anio: 1872,
    paginas: 320,
    descripcion: 'Poema gauchesco sobre la vida de un gaucho perseguido por la injusticia.',
    estado: 'Reservado',
  },
  {
    id: 5,
    titulo: 'Las venas abiertas de América Latina',
    autor: 'Eduardo Galeano',
    genero: 'Ensayo',
    anio: 1971,
    paginas: 400,
    descripcion: 'Ensayo histórico sobre la explotación económica del continente.',
    estado: 'Disponible',
  },
  {
    id: 6,
    titulo: 'Clean Code',
    autor: 'Robert C. Martin',
    genero: 'Programación',
    anio: 2008,
    paginas: 464,
    descripcion: 'Buenas prácticas para escribir código legible y fácil de mantener.',
    estado: 'Disponible',
  },
];

// "Servicio" que simula una llamada a una API: tarda un poco (estado de carga)
// y puede fallar (estado de error). Cuando exista el backend real, solo se
// cambia el interior de esta función por un fetch() a la URL del servidor.
export function obtenerLibros(simularError = false): Promise<Libro[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simularError) {
        reject(new Error('No se pudo conectar con la biblioteca.'));
      } else {
        resolve(mockLibros);
      }
    }, 800);
  });
}

export function buscarLibroPorId(id: number): Libro | undefined {
  return mockLibros.find((libro) => libro.id === id);
}
