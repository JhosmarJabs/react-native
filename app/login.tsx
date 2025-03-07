import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace('/(tabs)/categorias'); // O '/(tabs)/productos' si quieres otra pestaña como inicio
// Redirige a las pestañas después del login
  };

  return (
    <View style={styles.contenedor}>
      <Image style={styles.img} source={require('../assets/cli.png')} resizeMode="contain" />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput style={styles.input} placeholder="Ingresa tu usuario" placeholderTextColor="#999" />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput style={styles.input} placeholder="Ingresa tu contraseña" placeholderTextColor="#999" secureTextEntry />
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.btn}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  img: { marginBottom: 30, width: 150, height: 150 },
  formContainer: { width: '80%' },
  label: { fontSize: 16, marginBottom: 8, color: '#333' },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 20, backgroundColor: '#fff' },
  btn: { backgroundColor: 'blue', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 5, alignItems: 'center' },
  btnText: { color: 'white', fontSize: 16 },
});
