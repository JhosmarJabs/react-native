import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import Boton from './app-temp/Components/Boton';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function App() {
  return (
    <View style={styles.container}>
      
      <Text>Aplicacion movil 5B</Text>
      
      <ActivityIndicator size={'large'} color={'pink'} />
      
      <Text>Esta app es un ejemplo</Text>
      
      <Boton titulo='Press me...' 
      onPress={()=>{Alert.alert('Saludos a Acuario...')}}
      icono ={<AntDesign name="play" size={24} color="white"/>}
      posicionIcono='izquierda'
      variante='peligro'
      disable={true}/>

      <Boton titulo='Google' onPress={()=>{Alert.alert('Se logueo con google')}}
        icono={<AntDesign name="googleplus" size={24} color="black"/>}
        estilo={styles.botong}/>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },botong:{
    backgroundColor:'blue'
  }

});
