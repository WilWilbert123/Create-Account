import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [recoveryQuestion, setRecoveryQuestion] = useState('');
  
    const handleRecoverPassword = async () => {
      try {
        // Retrieve the saved recovery answer from AsyncStorage
        const savedRecoveryAnswer = await AsyncStorage.getItem('recoveryAnswer');
        
        // Check if the entered answer matches the saved answer
        if (savedRecoveryAnswer === recoveryQuestion) {
          // Navigate to the 'Detail' screen
          navigation.navigate('Detail');
        } else {
          // Handle case where answers do not match
          console.log('Recovery answer does not match');
        }
      } catch (error) {
        console.error('Error retrieving recovery answer:', error);
      }
    };
    return (
        <View style={styles.container}>
             <TouchableOpacity onPress={() => navigation.replace('Home')} style={styles.backButton}>
                <Icon name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>Enter your email and answer the recovery question</Text>
            {/* <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            /> */}
            <TextInput
                style={styles.input}
                placeholder="Best friend name"
                value={recoveryQuestion}
                onChangeText={(text) => setRecoveryQuestion(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Favorite food"
                value={recoveryQuestion}
                onChangeText={(text) => setRecoveryQuestion(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Favorite place"
                value={recoveryQuestion}
                onChangeText={(text) => setRecoveryQuestion(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleRecoverPassword}>
                <Text style={styles.buttonText}>RECOVER PASSWORD</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'darkred',
        padding: 20,
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        padding: 10,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        marginBottom: 20,
    },
    input: {
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginBottom: 20,
        paddingHorizontal: 10,
        fontSize: 18,
        color: 'white',
        
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'darkred',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ForgotPasswordScreen;
