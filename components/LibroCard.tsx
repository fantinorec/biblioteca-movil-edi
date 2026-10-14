import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Libro } from '@/lib/tipos';
import { colores } from '@/lib/tema';
import { Insignia } from './Insignia';

// Tarjeta reutilizable para mostrar un libro en una lista.
type Props = {
  libro: Libro;
  onPress: () => void;
};

export function LibroCard({ libro, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${libro.titulo}, de ${libro.autor}, ${libro.estado}`}
      style={({ pressed }) => [styles.tarjeta, pressed && { opacity: 0.85 }]}
    >
      <View style={styles.fila}>
        <View style={{ flex: 1 }}>
          <Text style={styles.titulo}>{libro.titulo}</Text>
          <Text style={styles.autor}>{libro.autor}</Text>
          <Text style={styles.genero}>
            {libro.genero} · {libro.anio}
          </Text>
        </View>
        <Insignia estado={libro.estado} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  fila: { flexDirection: 'row', gap: 12 },
  titulo: { fontSize: 17, fontWeight: '700', color: colores.texto },
  autor: { fontSize: 14, color: colores.textoSuave, marginTop: 2 },
  genero: { fontSize: 13, color: colores.textoSuave, marginTop: 6 },
});
