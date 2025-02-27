import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherCard = ({ day, date, maxTemp, minTemp, rainProbability, condition }) => {
    return (
        <View style={styles.card}>
        <Text style={styles.day}>{day} - {date}</Text>
        <Text>Máx: {maxTemp}°C / Mín: {minTemp}°C</Text>
        <Text>Probabilidad de lluvia: {rainProbability}%</Text>
        <Text>Condición: {condition}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
    },
    day: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WeatherCard;