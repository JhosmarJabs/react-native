import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function MercadoPago() {
    return (
        <View style={styles.gradientContainer}>
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>PODAI</Text>
                <Text style={styles.labels}>Usuario</Text>
                <TextInput style={styles.cajas} placeholder="Usuario..." placeholderTextColor="#4B2E1E" />
                <Text style={styles.labels}>Password</Text>
                <TextInput style={styles.cajas} placeholder="Password..." placeholderTextColor="#4B2E1E" secureTextEntry={true} />
                <Button 
                    title="Login" 
                    color={'#4B2e1e'} 
                    onPress={() => { Alert.alert('Logeando...') }} 
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative'
    },
    contenedor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: '100%',
        backgroundColor: 'rgba(0, 89, 255, 0.8)', // Fondo semi-transparente para el contenido
        borderRadius: 15
    },
    titulo: {
        fontSize: 25,
        color: '#4B2E1E',
        fontWeight: 'bold'
    },
    labels: {
        fontSize: 18,
        color: '#4B2E1E',
        fontWeight: '700',
        marginTop: 10
    },
    cajas: {
        borderColor: '#4B2E1E',
        borderWidth: 2,
        borderRadius: 7,
        marginVertical: 7,
        padding: 7,
        width: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },
    gradientBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        backgroundColor: 'rgba(0, 119, 255, 0.8)',
        opacity: 0.3 // Ajusta la opacidad para simular el degradado
    }
});
