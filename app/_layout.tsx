import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colores } from '@/lib/tema';

// Layout raíz: define la navegación tipo "pila" (Stack) para toda la app.
// Cada archivo dentro de app/ es una pantalla/ruta.
export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colores.primario },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colores.fondo },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="catalogo" options={{ title: 'Catálogo' }} />
        <Stack.Screen name="libro/[id]" options={{ title: 'Detalle del libro' }} />
        <Stack.Screen name="reservar/[id]" options={{ title: 'Reservar libro' }} />
        <Stack.Screen name="confirmacion" options={{ title: 'Reserva confirmada', headerBackVisible: false }} />
        <Stack.Screen name="mis-reservas" options={{ title: 'Mis reservas' }} />
      </Stack>
    </>
  );
}
