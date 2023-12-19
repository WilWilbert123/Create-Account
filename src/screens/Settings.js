import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SettingsScreen = ({navigation}) => {
  const handleChangePassword = () => {
    // Implement logic for changing the password
    console.log('Change Password');
  };

  const handleRecoveryAnswer = () => {
    // Implement logic for managing recovery answers
    console.log('Manage Recovery Answer');
  };
  const handleGoBack = () => {
    navigation.replace("Detail");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* View for Change Password */}
      <TouchableOpacity style={styles.optionContainer} onPress={handleChangePassword}>
        <Text style={styles.optionText}>Change Password</Text>
      </TouchableOpacity>

      {/* View for Recovery Answer */}
      <TouchableOpacity style={styles.optionContainer} onPress={handleRecoveryAnswer}>
        <Text style={styles.optionText}>Manage Recovery Answer</Text>
      </TouchableOpacity>
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
    marginBottom: 15,
    alignItems: 'center',
  },
  optionText: {
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
