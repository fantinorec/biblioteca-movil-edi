# Biblioteca — Ficha de diseño (EDI · Frontend individual)

Alumno: Renzo Fantino Recalde · Comisión B · Prof. David Lerea

## 1. Ficha del proyecto (v2)

| Ítem | Definición |
|---|---|
| Proyecto de referencia | Sistema de gestión de la biblioteca (proyecto grupal de Práctica Profesionalizante) |
| Problema | Para saber si un libro está disponible hay que ir o llamar a la biblioteca; muchas veces se viaja y el libro está prestado. |
| Usuario principal | Socio/a de la biblioteca que usa el celular |
| Objetivo de la app | Consultar el catálogo, ver si un libro está disponible y reservarlo para retirarlo después |
| Fuente de datos | Mock local tipado (`lib/libros.ts`) que simula una API con demora y error. Se reemplaza por la API del grupo cuando esté disponible. |

### Alcance: qué entra y qué queda fuera

| Entra en mi app (frontend) | Queda en el backend / fuera de alcance |
|---|---|
| Login con validación (acceso simulado) | Autenticación real y tokens |
| Catálogo con búsqueda | Base de datos central de libros |
| Detalle del libro | Panel administrativo (alta/baja de libros) |
| Formulario de reserva validado | Reglas de negocio reales (multas, cupos) |
| Confirmación y "Mis reservas" | Persistencia en servidor |
| Estados de carga, vacío y error | Notificaciones |

## 2. Persona usuaria

**Lucía, 21 años.** Estudiante de la tecnicatura, socia de la biblioteca del instituto.
- **Objetivo:** saber antes de viajar si el libro que necesita para estudiar está disponible, y apartarlo.
- **Frustración actual:** fue dos veces a la biblioteca y el libro estaba prestado; perdió tiempo y plata en colectivo.
- **Contexto de uso:** desde el celular, en el colectivo o entre clases; con datos móviles a veces lentos; tiene pocos minutos.
- **Cómo sabe que salió bien:** ve la confirmación de la reserva y la encuentra después en "Mis reservas".

> Como **socia de la biblioteca**, necesito **saber si un libro está disponible y reservarlo** para **no viajar en vano**, considerando que **lo hago desde el celular y con poco tiempo**.

## 3. Flujo principal

```
Login → Catálogo → Detalle del libro → Formulario de reserva → Confirmación → Mis reservas
           ↑ (buscar)                                                         │
           └──────────────────────────── Ir al catálogo ──────────────────────┘
```

Estados críticos: **cargando** (al abrir el catálogo), **vacío** (búsqueda sin resultados / sin reservas), **error** (falla al cargar, con botón "Reintentar"), **éxito** (pantalla de confirmación).

## 4. Historias de usuario y criterios de aceptación

**H1 — Ingresar a la app**
Como socia, quiero ingresar con mi correo y contraseña para acceder al catálogo.
- Dado que dejo un campo vacío, cuando toco "Ingresar", entonces veo un mensaje de error debajo del campo y no avanzo.
- Dado que escribo un correo sin formato válido (sin @ o sin dominio), cuando toco "Ingresar", entonces veo "El correo no tiene un formato válido".
- Dado que completo correo válido y contraseña de 6+ caracteres, cuando toco "Ingresar", entonces paso al Catálogo y no puedo volver al login con "atrás".

**H2 — Consultar el catálogo**
Como socia, quiero ver la lista de libros y buscar por título o autor para encontrar rápido el que necesito.
- Dado que abro el catálogo, cuando los datos todavía no llegaron, entonces veo un indicador de carga.
- Dado que escribo en el buscador, cuando hay coincidencias, entonces la lista se filtra y el contador muestra la cantidad.
- Dado que busco algo que no existe, entonces veo el mensaje "No encontramos libros con esa búsqueda".
- Dado que falla la carga, entonces veo un mensaje de error y un botón "Reintentar".

**H3 — Ver el detalle de un libro**
Como socia, quiero ver el detalle de un libro para saber de qué trata y si está disponible.
- Dado que toco un libro del catálogo, entonces veo título, autor, género, año, páginas, sinopsis y estado.
- Dado que el libro no está "Disponible", entonces el botón de reservar aparece deshabilitado con un aviso.

**H4 — Reservar un libro**
Como socia, quiero reservar un libro disponible indicando cuándo lo retiro para asegurarme de que me lo guarden.
- Dado que falta algún campo, entonces el botón "Confirmar reserva" está deshabilitado.
- Dado que el número de socio no tiene 4 a 6 dígitos, o la fecha no existe / es anterior a hoy, o los días no están entre 1 y 14, cuando confirmo, entonces veo el error en el campo correspondiente.
- Dado que todos los datos son válidos, cuando confirmo, entonces paso a la pantalla de confirmación y el libro queda "Reservado" en el catálogo.

**H5 — Ver mis reservas**
Como socia, quiero ver mis reservas para recordar qué libros tengo que retirar y cuándo.
- Dado que no hice ninguna reserva, entonces veo "Todavía no reservaste ningún libro".
- Dado que hice reservas, entonces veo cada una con título, fecha de retiro y días de préstamo.

## 5. Ficha técnica por pantalla

| Pantalla (archivo) | Componentes | Estado / datos | Acciones | Navega hacia |
|---|---|---|---|---|
| Login (`app/index.tsx`) | CampoTexto ×2, Boton | `email`, `clave`, `errores` | Ingresar | Catálogo (`replace`) |
| Catálogo (`app/catalogo.tsx`) | TextInput buscador, FlatList, LibroCard, EstadoVista | `libros`, `cargando`, `error`, `busqueda` | Buscar, abrir libro, reintentar | Detalle, Mis reservas |
| Detalle (`app/libro/[id].tsx`) | Insignia, Dato, Boton | parámetro `id` → libro | Reservar (si está disponible) | Reservar |
| Reservar (`app/reservar/[id].tsx`) | CampoTexto ×4, Boton ×2 | `form`, `errores` | Confirmar, cancelar | Confirmación (`replace`), atrás |
| Confirmación (`app/confirmacion.tsx`) | Fila, Boton ×2 | parámetro `reservaId` → reserva | Ver reservas, volver | Mis reservas, Catálogo |
| Mis reservas (`app/mis-reservas.tsx`) | FlatList, EstadoVista, Boton ×2 | `reservas` | Ir al catálogo, cerrar sesión | Catálogo, Login |

**Componentes reutilizables (`components/`):** `Boton` (primario/secundario, deshabilitado), `CampoTexto` (etiqueta + input + error), `LibroCard`, `Insignia` (color según estado), `EstadoVista` (carga / vacío / error).

## 6. Contrato de datos (mock)

```ts
type EstadoLibro = 'Disponible' | 'Prestado' | 'Reservado';

type Libro = {
  id: number;          // identificador único (se usa como key y en la ruta /libro/[id])
  titulo: string;
  autor: string;
  genero: string;
  anio: number;
  paginas: number;
  descripcion: string;
  estado: EstadoLibro;
};
```

- **Listado** muestra: título, autor, género, año y estado.
- **Detalle** muestra: todos los campos.
- **Se guarda localmente:** las reservas (en memoria por ahora; persistencia con AsyncStorage en el 2do parcial).
- Endpoint previsto cuando exista la API del grupo: `GET /libros` y `GET /libros/:id`, `POST /reservas`.
