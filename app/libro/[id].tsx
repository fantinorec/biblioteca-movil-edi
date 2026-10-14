import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Boton } from '@/components/Boton';
import { EstadoVista } from '@/components/EstadoVista';
import { Insignia } from '@/components/Insignia';
import { buscarLibroPorId } from '@/lib/libros';
import { colores } from '@/lib/tema';

// PANTALLA 3 · Detalle del libro (ruta dinámica "/libro/[id]")
// El [id] del nombre del archivo es un parámetro: /libro/3 -> id = "3".
export default function DetalleLibroScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const libro = buscarLibroPorId(Number(id));

  // Si llega un id que no existe, mostramos un estado de error en vez de romper.
  if (!libro) {
    return (
      <EstadoVista tipo="error" mensaje="No encontramos ese libro." onReintentar={() => router.back()} />
    );
  }

  const disponible = libro.estado === 'Disponible';

  return (
    <ScrollView contentContainerStyle={styles.contenido}>
      <View style={styles.portada}>
        <Text style={styles.portadaIcono}>📖</Text>
      </View>

      <Text style={styles.titulo}>{libro.titulo}</Text>
      <Text style={styles.autor}>{libro.autor}</Text>
      <View style={{ marginTop: 12 }}>
        <Insignia estado={libro.estado} />
      </View>

      <View style={styles.datos}>
        <Dato etiqueta="Género" valor={libro.genero} />
        <Dato etiqueta="Año" valor={String(libro.anio)} />
        <Dato etiqueta="Páginas" valor={String(libro.paginas)} />
      </View>

      <Text style={styles.seccion}>Sinopsis</Text>
      <Text style={styles.descripcion}>{libro.descripcion}</Text>

      <Boton
        titulo={disponible ? 'Reservar este libro' : 'No disponible para reservar'}
        deshabilitado={!disponible}
        onPress={() => router.push({ pathname: '/reservar/[id]', params: { id: String(libro.id) } })}
      />
      {!disponible && (
        <Text style={styles.aviso}>Este libro está {libro.estado.toLowerCase()}. Probá con otro título.</Text>
      )}
    </ScrollView>
  );
}

// Componente chico usado solo en esta pantalla.
function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <View style={styles.dato}>
      <Text style={styles.datoEtiqueta}>{etiqueta}</Text>
      <Text style={styles.datoValor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 20, paddingBottom: 40 },
  portada: {
    height: 160,
    borderRadius: 16,
    backgroundColor: colores.primarioClaro,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  portadaIcono: { fontSize: 64 },
  titulo: { fontSize: 24, fontWeight: '800', color: colores.texto },
  autor: { fontSize: 16, color: colores.textoSuave, marginTop: 4 },
  datos: { flexDirection: 'row', gap: 10, marginTop: 20 },
  dato: {
    flex: 1,
    backgroundColor: colores.tarjeta,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  datoEtiqueta: { fontSize: 12, color: colores.textoSuave },
  datoValor: { fontSize: 16, fontWeight: '700', color: colores.texto, marginTop: 2 },
  seccion: { fontSize: 18, fontWeight: '700', color: colores.texto, marginTop: 24, marginBottom: 8 },
  descripcion: { fontSize: 15, lineHeight: 22, color: colores.texto },
  aviso: { fontSize: 13, color: colores.textoSuave, marginTop: 8, textAlign: 'center' },
});
