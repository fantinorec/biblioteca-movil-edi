// Colores y medidas en un solo lugar: si cambia el diseño, se cambia acá.
export const colores = {
  primario: '#1E4D8C',
  primarioClaro: '#E3ECF8',
  fondo: '#F5F7FA',
  tarjeta: '#FFFFFF',
  texto: '#1B1F24',
  textoSuave: '#5F6B7A',
  borde: '#D5DCE4',
  error: '#B3261E',
  errorFondo: '#FCE8E6',
};

// Estilo según el estado del libro (mismo patrón que statusStyles de la clase 5):
// el dato dice "Disponible", la interfaz decide que se ve en verde.
export const estiloEstado = {
  Disponible: { fondo: '#E0EFEB', texto: '#145F52' },
  Prestado: { fondo: '#F1F3F2', texto: '#70817D' },
  Reservado: { fondo: '#FFF5D9', texto: '#8A6514' },
};
