import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Boton } from '@/components/Boton';
import { CampoTexto } from '@/components/CampoTexto';
import { EstadoVista } from '@/components/EstadoVista';
import { buscarLibroPorId } from '@/lib/libros';
import { crearReserva } from '@/lib/reservas';
import { colores } from '@/lib/tema';
import {
  validarDias,
  validarFecha,
  validarNombre,
  validarNumeroSocio,
} from '@/lib/validaciones';

// PANTALLA 4 · Formulario de reserva (ruta "/reservar/[id]")
// Formulario validado: no deja confirmar hasta que todos los campos sean correctos.
export default function ReservarScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const libro = buscarLibroPorId(Number(id));

  // Un solo estado con todos los campos del formulario.
  const [form, setForm] = useState({ nombre: '', numeroSocio: '', fechaRetiro: '', dias: '7' });
  const [errores, setErrores] = useState({ nombre: '', numeroSocio: '', fechaRetiro: '', dias: '' });

  // Actualiza un campo y borra su error mientras el usuario escribe.
  function cambiar(campo: keyof typeof form, valor: string) {
    setForm({ ...form, [campo]: valor });
    setErrores({ ...errores, [campo]: '' });
  }

  if (!libro || libro.estado !== 'Disponible') {
    return (
      <EstadoVista
        tipo="error"
        mensaje="Este libro no se puede reservar en este momento."
        onReintentar={() => router.back()}
      />
    );
  }

  const camposCompletos = Object.values(form).every((v) => v.trim() !== '');

  function confirmar() {
    if (!libro) return;
    const nuevosErrores = {
      nombre: validarNombre(form.nombre),
      numeroSocio: validarNumeroSocio(form.numeroSocio),
      fechaRetiro: validarFecha(form.fechaRetiro),
      dias: validarDias(form.dias),
    };
    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some((e) => e !== '');
    if (hayErrores) return;

    const reserva = crearReserva({
      libroId: libro.id,
      tituloLibro: libro.titulo,
      nombre: form.nombre.trim(),
      numeroSocio: form.numeroSocio,
      fechaRetiro: form.fechaRetiro,
      dias: Number(form.dias),
    });

    router.replace({ pathname: '/confirmacion', params: { reservaId: String(reserva.id) } });
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
        <Text style={styles.libro}>{libro.titulo}</Text>
        <Text style={styles.autor}>{libro.autor}</Text>

        <CampoTexto
          etiqueta="Nombre y apellido"
          placeholder="Ej: Ana Torres"
          value={form.nombre}
          onChangeText={(v) => cambiar('nombre', v)}
          error={errores.nombre}
        />
        <CampoTexto
          etiqueta="Número de socio"
          placeholder="Ej: 10234"
          value={form.numeroSocio}
          onChangeText={(v) => cambiar('numeroSocio', v)}
          keyboardType="number-pad"
          maxLength={6}
          error={errores.numeroSocio}
        />
        <CampoTexto
          etiqueta="Fecha de retiro (dd/mm/aaaa)"
          placeholder="Ej: 20/10/2026"
          value={form.fechaRetiro}
          onChangeText={(v) => cambiar('fechaRetiro', v)}
          keyboardType="numbers-and-punctuation"
          maxLength={10}
          error={errores.fechaRetiro}
        />
        <CampoTexto
          etiqueta="Días de préstamo (1 a 14)"
          value={form.dias}
          onChangeText={(v) => cambiar('dias', v)}
          keyboardType="number-pad"
          maxLength={2}
          error={errores.dias}
        />

        <Boton titulo="Confirmar reserva" onPress={confirmar} deshabilitado={!camposCompletos} />
        <Boton titulo="Cancelar" variante="secundario" onPress={() => router.back()} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 20, paddingBottom: 40 },
  libro: { fontSize: 20, fontWeight: '800', color: colores.texto },
  autor: { fontSize: 15, color: colores.textoSuave, marginTop: 2, marginBottom: 20 },
});
