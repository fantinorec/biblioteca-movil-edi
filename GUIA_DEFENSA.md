# Guía rápida para la defensa (leer antes del recuperatorio)

## 1. Qué es la app (30 segundos)
"Es una app móvil para socios de una biblioteca. Pueden ingresar, buscar libros en el catálogo, ver si están disponibles y reservarlos. Está hecha con React Native, Expo, TypeScript y Expo Router. Los datos son un mock porque el backend del grupo todavía no está; cuando esté, solo cambio la función que trae los datos."

## 2. Cómo está organizada
- `app/` → cada archivo es una pantalla/ruta (Expo Router). `app/index.tsx` es la ruta `/` (Login).
- `app/libro/[id].tsx` → ruta dinámica: `/libro/3` muestra el libro con id 3. Leo el id con `useLocalSearchParams()`.
- `components/` → piezas reutilizables: `Boton`, `CampoTexto`, `LibroCard`, `Insignia`, `EstadoVista`.
- `lib/` → `tipos.ts` (contrato de datos), `libros.ts` (mock + servicio), `reservas.ts`, `validaciones.ts`, `tema.ts` (colores).

## 3. Preguntas probables y respuestas

**¿Qué es un mock?** Datos ficticios con la misma forma que los reales. Sirve para construir la interfaz sin depender del backend. No guarda nada: si cierro la app, se pierde.

**¿Para qué sirve TypeScript acá?** `Libro` define qué campos tiene un libro. `EstadoLibro = 'Disponible' | 'Prestado' | 'Reservado'` solo permite esos tres valores: si escribo otro, TypeScript marca error antes de ejecutar.

**¿Qué es `useState`?** Guarda un dato del componente; cuando cambia, la pantalla se vuelve a dibujar. Ej: en Login, `email` y `clave` (formulario controlado: cada input muestra y actualiza su estado).

**¿Qué hace `useEffect` en el catálogo?** Ejecuta `cargar()` una sola vez al abrir la pantalla (por el `[]`). Ahí se piden los libros.

**¿Cuáles son los 3 estados de una pantalla con datos?** Cargando (ActivityIndicator), error (mensaje + botón Reintentar), datos (FlatList). Además: vacío (búsqueda sin resultados). Lo resuelve `EstadoVista`. En el catálogo hay un botón "Probar estado de error" para mostrarlo.

**¿Por qué `then / catch / finally`?** `then` guarda los datos, `catch` guarda el error, `finally` apaga el "cargando" pase lo que pase.

**¿Qué es FlatList y `keyExtractor`?** Lista optimizada para muchos elementos. Cada fila necesita una key única y estable: uso el `id` del libro, no el índice.

**¿`router.push` vs `router.replace`?** `push` agrega pantalla (se puede volver atrás). `replace` reemplaza: después del login o de confirmar la reserva no se puede volver al formulario con "atrás".

**¿Cómo validás el formulario?** Funciones en `lib/validaciones.ts` que devuelven un mensaje de error o `''`. Al tocar Confirmar se validan todos los campos; si alguno tiene error, se muestra debajo del campo y no se avanza. El botón está deshabilitado mientras falten campos.
- Email: expresión regular `algo@algo.algo`.
- Socio: 4 a 6 dígitos. Fecha: formato dd/mm/aaaa, que exista y no sea pasada. Días: 1 a 14.

**¿Qué son las props?** Datos que un componente recibe del padre. Ej: `<Boton titulo="Ingresar" onPress={ingresar} />`. Por eso `Boton` se reutiliza en 4 pantallas.

**¿Qué es real y qué es simulado?** Simulado: el login (no verifica contra un servidor), los libros (mock) y las reservas (en memoria). Real: navegación, validaciones, estados de interfaz, componentes.

**¿Qué falta para el 2do parcial?** Guardar reservas con AsyncStorage, conectar la API real, pruebas y generar la APK con EAS Build.

## 4. Demo sugerida (2 minutos)
1. Login con un correo mal escrito → muestra error. Luego correcto → entra.
2. Catálogo: buscar "borges" → filtra. Buscar "zzz" → estado vacío. Tocar "Probar estado de error" → Reintentar.
3. Abrir "Ficciones" (Prestado) → botón deshabilitado.
4. Abrir "Rayuela" → Reservar → poner fecha pasada → error → corregir → Confirmar.
5. Confirmación → Mis reservas → volver al catálogo: Rayuela ahora figura "Reservado".
