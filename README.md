# Biblioteca · App móvil (EDI — Frontend individual)

App móvil hecha con **React Native + Expo + TypeScript + Expo Router**.
Permite a un socio de la biblioteca ingresar, consultar el catálogo, ver el detalle de un libro y reservarlo.

**Alumno:** Renzo Fantino Recalde · Comisión B · Prof. David Lerea

## Pantallas (6)
1. **Login** (`app/index.tsx`) — formulario validado (formato de correo, contraseña ≥ 6).
2. **Catálogo** (`app/catalogo.tsx`) — lista con FlatList, buscador, estados de carga / vacío / error.
3. **Detalle** (`app/libro/[id].tsx`) — ruta dinámica por id.
4. **Reservar** (`app/reservar/[id].tsx`) — formulario validado (socio, fecha, días).
5. **Confirmación** (`app/confirmacion.tsx`).
6. **Mis reservas** (`app/mis-reservas.tsx`).

## Estructura
- `app/` pantallas y rutas (Expo Router)
- `components/` componentes reutilizables (Boton, CampoTexto, LibroCard, Insignia, EstadoVista)
- `lib/` tipos TypeScript, datos mock, validaciones y tema
- `DISENO.md` persona, historias de usuario, criterios de aceptación, flujo y ficha técnica

## Ejecutar
```
npm install
npx expo start
```
Escanear el QR con Expo Go.

## Fuente de datos
Mock local tipado (`lib/libros.ts`) que simula una API con demora y error.
Se reemplaza por la API del proyecto grupal cuando esté disponible.
