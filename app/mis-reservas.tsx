import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Boton } from '@/components/Boton';
import { EstadoVista } from '@/components/EstadoVista';
import { obtenerReservas } from '@/lib/reservas';
import type { Reserva } from '@/lib/tipos';
import { colores } from '@/lib/tema';

// PANTALLA 6 · Mis reservas (ruta "/mis-reservas")
// Lista las reservas hechas. Tiene estado "vacío" si todavía no hay ninguna.
export default function MisReservasScreen() {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  // Cada vez que la pantalla gana el foco, volvemos a leer las reservas.
  useFocusEffect(
    useCallback(() => {
      setReservas(obtenerReservas());
    }, [])
  );

  return (
    <View style={styles.pantalla}>
      <FlatList
        data={reservas}
        keyExtractor={(r) => String(r.id)}
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            <Text style={styles.titulo}>{item.tituloLibro}</Text>
            <Text style={styles.detalle}>Retiro: {item.fechaRetiro} · {item.dias} días</Text>
            <Text style={styles.detalle}>Socio N° {item.numeroSocio}</Text>
          </View>
        )}
        ListEmptyComponent={
          <EstadoVista tipo="vacio" mensaje="Todavía no reservaste ningún libro." />
        }
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
      />
      <Boton titulo="Ir al catálogo" onPress={() => router.replace('/catalogo')} />
      <Boton titulo="Cerrar sesión" variante="secundario" onPress={() => router.replace('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, padding: 16 },
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: 16,
    marginBottom: 12,
  },
  titulo: { fontSize: 17, fontWeight: '700', color: colores.texto },
  detalle: { fontSize: 14, color: colores.textoSuave, marginTop: 4 },
});
