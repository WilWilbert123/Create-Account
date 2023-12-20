import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const [recoveryAnswers, setRecoveryAnswers] = useState([
    { answer: '' },
    { answer: '' },
    { answer: '' },
  ]);

  const handleChangePassword = () => {
    // Implement logic for changing the password
    console.log('Change Password');
  };

  const handleAnswerChange = (index, text) => {
    const updatedRecoveryAnswers = [...recoveryAnswers];
    updatedRecoveryAnswers[index].answer = text;
    setRecoveryAnswers(updatedRecoveryAnswers);
  };

  const handleSaveRecoveryAnswers = async () => {
    // Implement logic for saving recovery answers to AsyncStorage
    try {
      // Check if any of the answers is empty
      const isAnyAnswerEmpty = recoveryAnswers.some((item) => item.answer.trim() === '');

      if (isAnyAnswerEmpty) {
        console.log('Please fill in all the recovery answers');
        return; // Don't save if any answer is empty
      }

      await AsyncStorage.setItem('recoveryAnswers', JSON.stringify(recoveryAnswers));
      console.log('Recovery answers saved successfully');

      // Log the entered text when Save button is clicked
      recoveryAnswers.forEach((item, index) => {
        console.log(`Answer ${index + 1}: ${item.answer}`);
      });
    } catch (error) {
      console.error('Error saving recovery answers:', error);
    }
  };

  const handleGoBack = () => {
    navigation.replace('Detail');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* View for Recovery Questions and Answers */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Best friend name"
          placeholderTextColor="gray"
          value={recoveryAnswers[0].answer}
          onChangeText={(text) => handleAnswerChange(0, text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Favorite food"
          placeholderTextColor="gray"
          value={recoveryAnswers[1].answer}
          onChangeText={(text) => handleAnswerChange(1, text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Favorite place"
          placeholderTextColor="gray"
          value={recoveryAnswers[2].answer}
          onChangeText={(text) => handleAnswerChange(2, text)}
        />
      </View>

      {/* View for Save Recovery Answers */}
      <TouchableOpacity
        style={[styles.saveButton, { opacity: recoveryAnswers.some((item) => item.answer.trim() === '') ? 0.5 : 1 }]}
        onPress={handleSaveRecoveryAnswers}
        disabled={recoveryAnswers.some((item) => item.answer.trim() === '')}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} onPress={handleChangePassword}>
        <Text style={styles.optionText}>Change Password</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    backgroundColor: 'darkred',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  optionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor: 'white',
    color: 'gray',
    borderRadius: 0,
    padding: 10,
    marginBottom: 10,
    borderBottomColor: 'black',
  },
  saveButton: {
    backgroundColor: 'darkred',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  backButton: {
    backgroundColor: 'darkred',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SettingsScreen;
