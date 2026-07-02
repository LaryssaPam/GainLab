import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { auth } from '../../firebase'; // Ce chemin remonte bien vers ton fichier firebase.ts
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); 

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "S'il te plaît, remplis tous les champs !");
      return;
    }

    setLoading(true);
    try {
      if (isRegistering) {
        // Inscription d'un nouvel athlète
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Succès", "Compte GainLab créé avec succès ! 🎉");
      } else {
        // Connexion
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Bienvenue !", "Connexion réussie à GainLab 🏋️‍♂️");
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert("Erreur", "Problème d'identifiants ou de réseau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>GainLab 🏋️‍♂️</Text>
      <Text style={style.subtitle}>
        {isRegistering ? "Crée ton compte pour débuter" : "Connecte-toi pour suivre tes perfs"}
      </Text>

      <TextInput 
        style={style.input}
        placeholder="Adresse Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput 
        style={style.input}
        placeholder="Mot de passe"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />

      <TouchableOpacity style={style.button} onPress={handleAuth} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={style.buttonText}>
            {isRegistering ? "S'inscrire" : "Se connecter"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)} style={style.switchLink}>
        <Text style={style.switchText}>
          {isRegistering ? "Déjà un compte ? Connecte-toi" : "Pas encore de compte ? Inscris-toi"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fond sombre
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#ff4747', // Rouge dynamique "GainLab"
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  switchText: {
    color: '#ff4747',
    fontSize: 14,
  },
});