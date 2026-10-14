// Funciones puras de validación: reciben un valor y devuelven
// un mensaje de error, o '' si está todo bien. Fáciles de probar.

export function validarEmail(email: string): string {
  if (email.trim() === '') return 'Ingresá tu correo.';
  // algo@algo.algo
  const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formato.test(email.trim())) return 'El correo no tiene un formato válido.';
  return '';
}

export function validarClave(clave: string): string {
  if (clave === '') return 'Ingresá tu contraseña.';
  if (clave.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
  return '';
}

export function validarNombre(nombre: string): string {
  if (nombre.trim().length < 3) return 'Ingresá tu nombre completo (mínimo 3 letras).';
  return '';
}

export function validarNumeroSocio(numero: string): string {
  if (!/^\d{4,6}$/.test(numero)) return 'El número de socio debe tener entre 4 y 6 dígitos.';
  return '';
}

// Fecha en formato dd/mm/aaaa, que exista y que no sea pasada.
export function validarFecha(texto: string): string {
  const partes = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(texto);
  if (!partes) return 'Usá el formato dd/mm/aaaa.';

  const dia = Number(partes[1]);
  const mes = Number(partes[2]);
  const anio = Number(partes[3]);
  const fecha = new Date(anio, mes - 1, dia);

  // new Date(2026, 1, 31) "se pasa" a marzo: así detectamos fechas inexistentes.
  if (fecha.getDate() !== dia || fecha.getMonth() !== mes - 1) return 'Esa fecha no existe.';

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  if (fecha < hoy) return 'La fecha no puede ser anterior a hoy.';
  return '';
}

export function validarDias(texto: string): string {
  const dias = Number(texto);
  if (!Number.isInteger(dias) || dias < 1 || dias > 14) return 'Elegí entre 1 y 14 días.';
  return '';
}
