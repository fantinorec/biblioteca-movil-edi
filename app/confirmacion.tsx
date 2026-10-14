import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Boton } from '@/components/Boton';
import { EstadoVista } from '@/components/EstadoVista';
import { buscarReservaPorId } from '@/lib/reservas';
import { colores } from '@/lib/tema';

// PANTALLA 5 · Confirmación (ruta "/confirmacion")
// Muestra el resultado de la acción principal: la reserva quedó hecha.
export default function ConfirmacionScreen() {
  const { reservaId } = useLocalSearchParams<{ reservaId: string }>();
  const reserva = buscarReservaPorId(Number(reservaId));

  if (!reserva) {
    return (
      <EstadoVista
        tipo="error"
        mensaje="No encontramos la reserva."
        onReintentar={() => router.replace('/catalogo')}
      />
    );
  }

  return (
    <View style={styles.pantalla}>
      <Text style={styles.icono}>✅</Text>
      <Text style={styles.titulo}>¡Reserva confirmada!</Text>
      <Text style={styles.subtitulo}>Te esperamos en la biblioteca.</Text>

      <View style={styles.resumen}>
        <Fila etiqueta="Libro" valor={reserva.tituloLibro} />
        <Fila etiqueta="Socio" valor={`${reserva.nombre} (N° ${reserva.numeroSocio})`} />
        <Fila etiqueta="Retiro" valor={reserva.fechaRetiro} />
        <Fila etiqueta="Préstamo" valor={`${reserva.dias} días`} />
      </View>

      <Boton titulo="Ver mis reservas" onPress={() => router.replace('/mis-reservas')} />
      <Boton titulo="Volver al catálogo" variante="secundario" onPress={() => router.replace('/catalogo')} />
    </View>
  );
}

function Fila({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <View style={styles.fila}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, padding: 24, justifyContent: 'center' },
  icono: { fontSize: 56, textAlign: 'center' },
  titulo: { fontSize: 26, fontWeight: '800', color: colores.texto, textAlign: 'center', marginTop: 12 },
  subtitulo: { fontSize: 15, color: colores.textoSuave, textAlign: 'center', marginTop: 6 },
  resumen: {
    backgroundColor: colores.tarjeta,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: 16,
    marginVertical: 24,
  },
  fila: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, gap: 12 },
  etiqueta: { fontSize: 14, color: colores.textoSuave },
  valor: { fontSize: 14, fontWeight: '700', color: colores.texto, flexShrink: 1, textAlign: 'right' },
});
