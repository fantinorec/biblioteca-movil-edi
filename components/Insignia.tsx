import { StyleSheet, Text, View } from 'react-native';
import type { EstadoLibro } from '@/lib/tipos';
import { estiloEstado } from '@/lib/tema';

// Etiqueta de color según el estado del libro.
export function Insignia({ estado }: { estado: EstadoLibro }) {
  const estilo = estiloEstado[estado];
  return (
    <View style={[styles.insignia, { backgroundColor: estilo.fondo }]}>
      <Text style={[styles.texto, { color: estilo.texto }]}>{estado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  insignia: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  texto: { fontSize: 12, fontWeight: '700' },
});
