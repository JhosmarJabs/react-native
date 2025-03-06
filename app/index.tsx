import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'

const index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Index</Text>
      <Link href={'propiedades'} style={styles.link}>Ir a Propiedades...</Link>
      <Button title="Ir a Propiedades" 
      onPress={() => {router.replace('propiedades',{relativeToDirectory:true})}} />
      <Link href={'./(tabs)/'} style={styles.link}>Ir a Tabs...</Link>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
titulo:{
    fontSize: 20,
    fontWeight: 'bold'
},
link:{
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 20,
    textAlign: 'center'
}
})