import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { EstadoVista } from '@/components/EstadoVista';
import { LibroCard } from '@/components/LibroCard';
import { obtenerLibros } from '@/lib/libros';
import type { Libro } from '@/lib/tipos';
import { colores } from '@/lib/tema';

// PANTALLA 2 · Catálogo (ruta "/catalogo")
// Patrón de la clase virtual: 3 estados -> cargando, error y datos.
export default function CatalogoScreen() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState('');

  function cargar(simularError = false) {
    setCargando(true);
    setError(null);
    obtenerLibros(simularError)
      .then((datos) => setLibros([...datos]))
      .catch((err: Error) => setError(err.message))
      .finally(() => setCargando(false));
  }

  // Se ejecuta una sola vez, al abrir la pantalla.
  useEffect(() => {
    cargar();
  }, []);

  // Al volver a esta pantalla (por ej. después de reservar) refrescamos los estados.
  useFocusEffect(
    useCallback(() => {
      setLibros((actuales) => [...actuales]);
    }, [])
  );

  // Filtro por título o autor (sin mayúsculas/minúsculas).
  const texto = busqueda.trim().toLowerCase();
  const filtrados = libros.filter(
    (l) => l.titulo.toLowerCase().includes(texto) || l.autor.toLowerCase().includes(texto)
  );

  if (cargando) return <EstadoVista tipo="cargando" mensaje="Cargando catálogo..." />;
  if (error) return <EstadoVista tipo="error" mensaje={error} onReintentar={() => cargar()} />;

  return (
    <View style={styles.pantalla}>
      <TextInput
        style={styles.buscador}
        placeholder="Buscar por título o autor"
        placeholderTextColor={colores.textoSuave}
        value={busqueda}
        onChangeText={setBusqueda}
        accessibilityLabel="Buscar libros"
      />

      <View style={styles.acciones}>
        <Text style={styles.total}>{filtrados.length} libros</Text>
        <Pressable onPress={() => router.push('/mis-reservas')} accessibilityRole="link">
          <Text style={styles.link}>Mis reservas →</Text>
        </Pressable>
      </View>

      <FlatList
        data={filtrados}
        keyExtractor={(libro) => String(libro.id)}
        renderItem={({ item }) => (
          <LibroCard
            libro={item}
            onPress={() => router.push({ pathname: '/libro/[id]', params: { id: String(item.id) } })}
          />
        )}
        ListEmptyComponent={<EstadoVista tipo="vacio" mensaje="No encontramos libros con esa búsqueda." />}
        contentContainerStyle={{ paddingBottom: 24, flexGrow: 1 }}
      />

      {/* Solo para la demo: muestra el estado de error a propósito */}
      <Pressable onPress={() => cargar(true)} style={styles.demoError}>
        <Text style={styles.demoErrorTexto}>Probar estado de error</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, padding: 16 },
  buscador: {
    minHeight: 48,
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: colores.texto,
  },
  acciones: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 12 },
  total: { color: colores.textoSuave, fontSize: 14 },
  link: { color: colores.primario, fontSize: 15, fontWeight: '700', padding: 4 },
  demoError: { alignItems: 'center', padding: 8 },
  demoErrorTexto: { color: colores.textoSuave, fontSize: 12, textDecorationLine: 'underline' },
});
