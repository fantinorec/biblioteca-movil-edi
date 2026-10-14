import { Pressable, StyleSheet, Text } from 'react-native';
import { colores } from '@/lib/tema';

// Componente reutilizable: se usa en Login, Detalle, Reservar y Confirmación.
type Props = {
  titulo: string;
  onPress: () => void;
  variante?: 'primario' | 'secundario';
  deshabilitado?: boolean;
};

export function Boton({ titulo, onPress, variante = 'primario', deshabilitado = false }: Props) {
  const esPrimario = variante === 'primario';

  return (
    <Pressable
      onPress={onPress}
      disabled={deshabilitado}
      accessibilityRole="button"
      accessibilityLabel={titulo}
      accessibilityState={{ disabled: deshabilitado }}
      style={({ pressed }) => [
        styles.base,
        esPrimario ? styles.primario : styles.secundario,
        deshabilitado && styles.deshabilitado,
        pressed && !deshabilitado && styles.presionado,
      ]}
    >
      <Text style={[styles.texto, esPrimario ? styles.textoPrimario : styles.textoSecundario]}>
        {titulo}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48, // tamaño de toque cómodo (accesibilidad, clase 7)
    borderRadius: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  primario: { backgroundColor: colores.primario },
  secundario: { backgroundColor: colores.tarjeta, borderWidth: 1, borderColor: colores.primario },
  deshabilitado: { opacity: 0.45 },
  presionado: { opacity: 0.8 },
  texto: { fontSize: 16, fontWeight: '600' },
  textoPrimario: { color: '#FFFFFF' },
  textoSecundario: { color: colores.primario },
});
