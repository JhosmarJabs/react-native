import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import WeatherCard from '../components/WeatherCard';

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const apiKey = '81e594329a13bb1d11f9295244063217'; // 🔑 Reemplaza con tu API Key
      const city = 'Mexico City';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=40&appid=${apiKey}&lang=es`
      );

      if (!response.ok) {
        throw new Error(response.status === 401 ? 'API Key inválida' : 'Error del servidor');
      }

      const data = await response.json();

      if (!data.list || data.list.length === 0) {
        throw new Error('No se encontraron datos del clima.');
      }

      const groupedByDay = data.list.reduce((acc, item) => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toISOString().split('T')[0];

        if (!acc[dateKey]) {
          acc[dateKey] = {
            dateObj: date,
            temps: [],
            rainProbabilities: [],
            conditions: [],
          };
        }
        acc[dateKey].temps.push(item.main.temp_max);
        acc[dateKey].rainProbabilities.push(item.pop);
        acc[dateKey].conditions.push(item.weather[0].description);
        return acc;
      }, {});

      const forecastDays = Object.values(groupedByDay).map(day => ({
        day: day.dateObj.toLocaleDateString('es-ES', { weekday: 'long' }),
        date: day.dateObj.toLocaleDateString('es-ES'),
        maxTemp: Math.round(Math.max(...day.temps)),
        minTemp: Math.round(Math.min(...day.temps)),
        rainProbability: Math.round(Math.max(...day.rainProbabilities) * 100),
        condition: day.conditions[0],
      }));

      setWeatherData(forecastDays.slice(0, 5));
    } catch (error) {
      setError(error.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando pronóstico...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pronóstico para México</Text>
      <View style={styles.listContainer}>
        {weatherData.length > 0 ? (
          weatherData.map((data, index) => (
            <WeatherCard
              key={index}
              day={data.day}
              date={data.date}
              maxTemp={data.maxTemp}
              minTemp={data.minTemp}
              rainProbability={data.rainProbability}
              condition={data.condition}
            />
          ))
        ) : (
          <Text style={styles.noDataText}>No hay datos disponibles.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: '#0081f1',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});

export default HomeScreen;