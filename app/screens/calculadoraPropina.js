import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const TipCalculator = () => {
  const [amount, setAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState(10);
  const [customTip, setCustomTip] = useState("");
  const [history, setHistory] = useState([]);

  // Calcular propina y total
  const calculateTip = () => {
    const billAmount = parseFloat(amount);
    if (isNaN(billAmount) || billAmount <= 0) return;

    const tipPercent = customTip ? parseFloat(customTip) : tipPercentage;
    if (isNaN(tipPercent) || tipPercent < 0) return;

    const tipAmount = (billAmount * tipPercent) / 100;
    const totalAmount = billAmount + tipAmount;

    // Guardar en el historial
    const newEntry = {
      id: Date.now().toString(),
      amount: billAmount.toFixed(2),
      tipPercent: tipPercent,
      tipAmount: tipAmount.toFixed(2),
      total: totalAmount.toFixed(2),
    };
    setHistory([newEntry, ...history]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Propinas</Text>

      {/* Entrada del monto */}
      <TextInput
        style={styles.input}
        placeholder="Monto de consumo"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Botones de porcentaje */}
      <View style={styles.buttonContainer}>
        {[10, 15, 20].map((percent) => (
          <TouchableOpacity
            key={percent}
            style={[
              styles.button,
              tipPercentage === percent && styles.selectedButton,
            ]}
            onPress={() => {
              setTipPercentage(percent);
              setCustomTip("");
            }}
          >
            <Text style={styles.buttonText}>{percent}%</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Entrada de porcentaje personalizado */}
      <TextInput
        style={styles.input}
        placeholder="Otro porcentaje (%)"
        keyboardType="numeric"
        value={customTip}
        onChangeText={setCustomTip}
      />

      {/* Botón de cálculo */}
      <TouchableOpacity style={styles.calculateButton} onPress={calculateTip}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {/* Historial de cálculos */}
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text>Consumo: ${item.amount}</Text>
            <Text>Propina: {item.tipPercent}% (${item.tipAmount})</Text>
            <Text>Total: ${item.total}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#d4d4d4" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonContainer: { flexDirection: "row", justifyContent: "space-around" },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  selectedButton: { backgroundColor: "#0056b3" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  calculateButton: {
    backgroundColor: "#28a745",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  historyItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});

export default TipCalculator;
