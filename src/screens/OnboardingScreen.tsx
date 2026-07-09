import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

interface UserData {
  name: string;
  birthDate: string;
  currentWeight: string;
  targetWeight: string;
  level: string | null;
  objective: string | null;
  discipline: string | null;
  disciplineSubChoice: string | null;
}

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    birthDate: '',
    currentWeight: '',
    targetWeight: '',
    level: null,
    objective: null,
    discipline: null,
    disciplineSubChoice: null,
  });

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("Félicitations ! Profil GainLab configuré :\n" + JSON.stringify(userData, null, 2));
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Validation pour activer/désactiver le bouton "SUIVANT"
  const isStepValid = () => {
    switch (currentStep) {
      case 1: return userData.name.trim().length > 0 && userData.birthDate.trim().length > 0;
      case 2: return userData.currentWeight.trim().length > 0 && userData.targetWeight.trim().length > 0;
      case 3: return userData.level !== null;
      case 4: return userData.objective !== null;
      case 5: return userData.discipline !== null;
      case 6: return userData.disciplineSubChoice !== null;
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>COMMENT T'APPELLES-TU ?</Text>
            <Text style={styles.subtitle}>Faisons connaissance pour personnaliser ton Lab.</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Ton prénom"
              placeholderTextColor="#666"
              value={userData.name}
              onChangeText={(txt) => setUserData({...userData, name: txt})}
            />
            <TextInput
              style={styles.input}
              placeholder="Date de naissance (JJ/MM/AAAA)"
              placeholderTextColor="#666"
              value={userData.birthDate}
              onChangeText={(txt) => setUserData({...userData, birthDate: txt})}
              keyboardType="numeric"
            />
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>QUEL EST TON POIDS ?</Text>
            <Text style={styles.subtitle}>Essentiel pour calibrer tes futurs entraînements.</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Poids actuel (kg)"
              placeholderTextColor="#666"
              value={userData.currentWeight}
              onChangeText={(txt) => setUserData({...userData, currentWeight: txt})}
              keyboardType="decimal-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Objectif de poids (kg)"
              placeholderTextColor="#666"
              value={userData.targetWeight}
              onChangeText={(txt) => setUserData({...userData, targetWeight: txt})}
              keyboardType="decimal-pad"
            />
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>QUEL EST TON NIVEAU ?</Text>
            {renderCard('debutant', 'Débutant', 'Idéal pour commencer le sport en douceur.', userData.level, 'level')}
            {renderCard('intermediaire', 'Intermédiaire', 'Tu connais les bases et tu veux progresser.', userData.level, 'level')}
            {renderCard('avance', 'Avancé / Expert', 'Tu veux du lourd et dépasser tes limites.', userData.level, 'level')}
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>QUEL EST TON OBJECTIF ?</Text>
            {renderCard('prise_de_masse', 'Prise de masse ', 'Augmenter la masse et le volume musculaire.', userData.objective, 'objective')}
            {renderCard('perte_graisse', 'Perte de graisse ', 'Brûler les calories et affiner la silhouette.', userData.objective, 'objective')}
          </View>
        );

      case 5:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>QUELLE DISCIPLINE VISES-TU ?</Text>
            {renderCard('musculation', 'Musculation ', 'Poids et machines.', userData.discipline, 'discipline')}
            {renderCard('calisthenics', 'Calisthénie ', 'Au poids du corps.', userData.discipline, 'discipline')}
            {renderCard('crossfit', 'CrossFit ', 'Haute intensité et WODs.', userData.discipline, 'discipline')}
          </View>
        );

      case 6:
        // ÉTAPE DYNAMIQUE SELON LE CHOIX DE L'ÉTAPE 5 !
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>PRÉCISE TA PRATIQUE</Text>
            <Text style={styles.subtitle}>Ajustons les détails de ton programme.</Text>
            
            {userData.discipline === 'musculation' && (
              <>
                {renderCard('full_body', 'Full Body', 'Tout le corps à chaque séance.', userData.disciplineSubChoice, 'disciplineSubChoice')}
                {renderCard('ppl', 'Push / Pull / Legs', 'Division par mouvements.', userData.disciplineSubChoice, 'disciplineSubChoice')}
              </>
            )}
            {userData.discipline === 'calisthenics' && (
              <>
                {renderCard('pompes_tractions', 'Bases (Pompes / Tractions)', 'Idéal pour construire les fondations.', userData.disciplineSubChoice, 'disciplineSubChoice')}
                {renderCard('muscle_up', 'Avancé (Muscle-up / Street)', 'Focus figures et force pure.', userData.disciplineSubChoice, 'disciplineSubChoice')}
              </>
            )}
            {userData.discipline === 'crossfit' && (
              <>
                {renderCard('wods', 'WODs & Cardio', 'Focus condition physique générale.', userData.disciplineSubChoice, 'disciplineSubChoice')}
                {renderCard('emom_amrap', 'EMOM / AMRAP', 'Gestion du temps et intensité max.', userData.disciplineSubChoice, 'disciplineSubChoice')}
              </>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  const renderCard = (value: string, title: string, description: string, selectedValue: string | null, field: keyof UserData) => {
    const isSelected = selectedValue === value;
    return (
      <TouchableOpacity 
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={() => setUserData({ ...userData, [field]: value })}
        activeOpacity={0.8}
      >
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* HEADER */}
        <View style={styles.headerContainer}>
          {currentStep > 1 && (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          )}
          <View style={styles.progressContainer}>
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <View key={step} style={[styles.progressStep, currentStep >= step ? styles.stepActive : null]} />
            ))}
          </View>
        </View>

        {/* CONTENU */}
        {renderStepContent()}

        {/* BOUTON */}
        <TouchableOpacity 
          style={[styles.buttonNext, !isStepValid() && styles.buttonDisabled]}
          disabled={!isStepValid()}
          onPress={handleNext}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>
            {currentStep === 6 ? "CRÉER MON PLAN PROVÉ →" : "SUIVANT →"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 50, paddingBottom: 40, justifyContent: 'space-between' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  backButton: { marginRight: 10 },
  backButtonText: { color: '#A0A0A0', fontSize: 24, fontWeight: 'bold' },
  progressContainer: { flexDirection: 'row', flex: 1, justifyContent: 'space-between' },
  progressStep: { flex: 1, height: 4, backgroundColor: '#2A2A2A', borderRadius: 2, marginHorizontal: 2 },
  stepActive: { backgroundColor: '#D4AF37' },
  stepContainer: { flex: 1, justifyContent: 'center' },
  title: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitle: { color: '#A0A0A0', fontSize: 14, textAlign: 'center', marginBottom: 24 },
  input: { backgroundColor: '#121212', borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 12, padding: 16, color: '#FFFFFF', fontSize: 16, marginVertical: 8 },
  card: { backgroundColor: '#121212', borderWidth: 1, borderColor: '#2A2A2A', borderRadius: 12, padding: 16, marginVertical: 8 },
  cardSelected: { borderColor: '#D4AF37', backgroundColor: '#1A1608' },
  cardTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  cardDescription: { color: '#A0A0A0', fontSize: 13, marginTop: 4 },
  buttonNext: { backgroundColor: '#D4AF37', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  buttonDisabled: { backgroundColor: '#2A2A2A', opacity: 0.5 },
  buttonText: { color: '#000000', fontSize: 16, fontWeight: 'bold' },
});