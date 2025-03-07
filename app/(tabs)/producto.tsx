import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Boton from '../../Components/Boton';


const Productos = () => {
  const router = useRouter();

  type Producto = {
    id: number;
    title: string;
    price?: number;
    description: string;
    category?: string;
    image: string;
    rating?: {
      rate: number;
      count: number;
    };
  };

  // Estados
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const consultar = async () => {
      setCargando(true);
      try {
        // Llamada al API
        const respuesta = await fetch('https://fakestoreapi.com/products');
        if (!respuesta.ok) {
          throw new Error(`Error al realizar la petición: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setProductos(datos);
        setCargando(false);
      } catch (error) {
        console.log('Error al obtener los datos:', error);
      }
    };
    consultar();
  }, []);

  // Renderizar cada producto
  const ProductoItem = (props: Producto) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>{props.title}</Text>
      <Image source={{ uri: props.image }} style={styles.imagen} />
      <Boton
        titulo="Ver Detalles..."
        onPress={() => {
          router.push(`/producto/${props.id}`); // 📌 Redirige a la pantalla de detalles del producto
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {cargando ? (
        <View style={styles.loadscreen}>
          <Text style={styles.titulo}>Cargando productos...</Text>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <FlatList
          data={productos}
          renderItem={({ item }) => (
            <ProductoItem title={item.title} description={item.description} image={item.image} id={item.id} />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.flatlist}
        />
      )}
    </View>
  );
};

export default Productos;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  card: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
  },
  flatlist: { width: '100%' },
  loadscreen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  imagen: { height: 100, width: 100, marginVertical: 10 },
});
