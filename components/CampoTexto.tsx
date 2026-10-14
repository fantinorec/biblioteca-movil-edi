import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colores } from '@/lib/tema';

// Campo de formulario reutilizable: etiqueta + input + mensaje de error.
// Recibe todas las props normales de TextInput (keyboardType, secureTextEntry, etc.).
type Props = TextInputProps & {
  etiqueta: string;
  error?: string;
};

export function CampoTexto({ etiqueta, error, ...resto }: Props) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <TextInput
        accessibilityLabel={etiqueta}
        placeholderTextColor={colores.textoSuave}
        style={[styles.input, error ? styles.inputError : null]}
        {...resto}
      />
      {/* Renderizado condicional: el error solo aparece si existe */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { marginBottom: 14 },
  etiqueta: { fontSize: 14, fontWeight: '600', color: colores.texto, marginBottom: 6 },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: colores.tarjeta,
    color: colores.texto,
  },
  inputError: { borderColor: colores.error },
  error: { color: colores.error, fontSize: 13, marginTop: 4 },
});
