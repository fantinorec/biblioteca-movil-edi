import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colores } from '@/lib/tema';
import { Boton } from './Boton';

// Un solo componente para los estados de interfaz: carga, vacío y error.
type Props =
  | { tipo: 'cargando'; mensaje?: string }
  | { tipo: 'vacio'; mensaje: string }
  | { tipo: 'error'; mensaje: string; onReintentar: () => void };

export function EstadoVista(props: Props) {
  if (props.tipo === 'cargando') {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={colores.primario} />
        <Text style={styles.texto}>{props.mensaje ?? 'Cargando...'}</Text>
      </View>
    );
  }

  if (props.tipo === 'vacio') {
    return (
      <View style={styles.centro}>
        <Text style={styles.icono}>📚</Text>
        <Text style={styles.texto}>{props.mensaje}</Text>
      </View>
    );
  }

  return (
    <View style={styles.centro}>
      <Text style={styles.icono}>⚠️</Text>
      <Text style={[styles.texto, { color: colores.error }]}>{props.mensaje}</Text>
      <Boton titulo="Reintentar" onPress={props.onReintentar} variante="secundario" />
    </View>
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  icono: { fontSize: 40 },
  texto: { fontSize: 16, color: colores.textoSuave, marginTop: 12, textAlign: 'center' },
});
