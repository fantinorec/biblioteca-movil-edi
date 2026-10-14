import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Boton } from '@/components/Boton';
import { CampoTexto } from '@/components/CampoTexto';
import { colores } from '@/lib/tema';
import { validarClave, validarEmail } from '@/lib/validaciones';

// PANTALLA 1 · Login (ruta "/")
// Formulario controlado: cada input guarda su valor en un estado.
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [errores, setErrores] = useState({ email: '', clave: '' });

  function ingresar() {
    const nuevosErrores = { email: validarEmail(email), clave: validarClave(clave) };
    setErrores(nuevosErrores);

    // Si hay algún error, no navegamos.
    if (nuevosErrores.email || nuevosErrores.clave) return;

    // replace: el usuario no puede "volver atrás" al login con el botón del celu.
    // Nota: el acceso es simulado; la autenticación real la resuelve el backend.
    router.replace('/catalogo');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colores.fondo }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
          <View style={styles.encabezado}>
            <Text style={styles.logo}>📚</Text>
            <Text style={styles.titulo}>Biblioteca</Text>
            <Text style={styles.subtitulo}>Buscá libros y reservalos desde tu celular</Text>
          </View>

          <CampoTexto
            etiqueta="Correo electrónico"
            placeholder="nombre@correo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={errores.email}
          />
          <CampoTexto
            etiqueta="Contraseña"
            placeholder="Mínimo 6 caracteres"
            value={clave}
            onChangeText={setClave}
            secureTextEntry
            error={errores.clave}
          />

          <Boton titulo="Ingresar" onPress={ingresar} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenido: { flexGrow: 1, justifyContent: 'center', padding: 24, maxWidth: 480, width: '100%', alignSelf: 'center' },
  encabezado: { alignItems: 'center', marginBottom: 32 },
  logo: { fontSize: 56 },
  titulo: { fontSize: 30, fontWeight: '800', color: colores.primario, marginTop: 8 },
  subtitulo: { fontSize: 15, color: colores.textoSuave, marginTop: 6, textAlign: 'center' },
});
