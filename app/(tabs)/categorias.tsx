import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

const Categorias = () => {
  const router = useRouter();
  const [categorias, setCategorias] = useState<string[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const obtenerCategorias = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch('https://fakestoreapi.com/products/categories');
        if (!respuesta.ok) {
          throw new Error(`Error en la petición: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setCategorias(datos);
        setCargando(false);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
    obtenerCategorias();
  }, []);

  return (
    <View style={styles.container}>
      {cargando ? (
        <View style={styles.loadscreen}>
          <Text style={styles.titulo}>Cargando Categorías...</Text>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <FlatList
          data={categorias}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/categorias/${item}`)} // 📌 Redirige a productos de la categoría
            >
              <Text style={styles.texto}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          style={styles.flatlist}
        />
      )}
    </View>
  );
};

export default Categorias;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  loadscreen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  flatlist: { width: '100%' },
  card: {
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  texto: { fontSize: 18, fontWeight: 'bold', color: '#333' },
});
