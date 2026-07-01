import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const handlePress = () => {
    Alert.alert("Succès", "Ton application GainLab fonctionne parfaitement sur ton téléphone ! 🎉");
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>GainLab 🏋️‍♂️</Text>
      <Text style={style.subtitle}>L'aventure commence ici.</Text>
      
      <TouchableOpacity style={style.button} onPress={handlePress}>
        <Text style={style.buttonText}>Tester l'application</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Mode sombre pour s'entraîner avec style
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ff4757',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
