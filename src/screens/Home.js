import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'; // Import AsyncStorage
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });
    const isSignInButtonDisabled = !username || !password;

    const navigation = useNavigation();

    // useEffect(() => {
    //     loadUserDataFromStorage();
    // }, []);

    // const loadUserDataFromStorage = async () => {
    //     try {
    //         const storedUsername = await AsyncStorage.getItem('user_username');
    //         const storedPassword = await AsyncStorage.getItem('user_password');

    //         if (storedUsername) {
    //             setUsername(storedUsername);
    //         }
    //         if (storedPassword) {
    //             setPassword(storedPassword);
    //         }
    //     } catch (error) {  
    //         console.error('Error loading user data from AsyncStorage: ', error);
    //     }
    // };


    const navigateToSignUp = () => {
        navigation.navigate('SignUpScreen');
        setUsername('');
        setPassword('');
    };

    const navigateToForgotPassword = () => {
        navigation.navigate('ForgotPasswordScreen');
        setUsername('');
        setPassword('');
    };

    const handleLogin = async () => {
        try {
            // Retrieve stored username and password from AsyncStorage
            const storedUsername = (await AsyncStorage.getItem('user_username'))?.trim();
            const storedPassword = (await AsyncStorage.getItem('user_password'))?.trim();

            console.log('Stored Username:', storedUsername);
            console.log('Stored Password:', storedPassword);
            

            if (username === storedUsername && password === storedPassword) {
                navigation.replace('Detail');
                setUsername('');
                setPassword('');
            } else {
                setModalContent({
                    title: 'Login Failed',
                    message: 'Invalid username or password. Please try again.',
                });
                setModalVisible(true);
                
            }
        } catch (error) {
            // Handle AsyncStorage errors
            console.error('Error retrieving user data from AsyncStorage: ', error);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setUsername('');
        setPassword('');
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>Hello</Text>
                <Text style={styles.title}>Sign in!</Text>
            </View>

            <View style={styles.bottomContainer}>
                <Text style={{ marginLeft: 8, color: 'red', fontWeight: 'bold' }}>Gmail</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <Text style={{ marginLeft: 8, color: 'red', fontWeight: 'bold' }}>Password</Text>
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableWithoutFeedback onPress={toggleShowPassword}>
                        <Ionicons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color="black"
                            style={{ paddingHorizontal: 10 }}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <TouchableOpacity onPress={navigateToForgotPassword}>
                    <View style={{ marginLeft: 200, marginBottom: 30 }}>
                        <Text style={{ fontWeight: 'bold' }}>Forgot password?</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, isSignInButtonDisabled && styles.disabledButton]}
                    onPress={handleLogin}
                    disabled={isSignInButtonDisabled}
                >
                    <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 200, marginLeft: 170 }}>
                    <Text style={{ color: 'gray', marginRight: -15 }}>Don't have an account?</Text>
                    <TouchableOpacity style={{ marginLeft: 80 }} onPress={navigateToSignUp}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{modalContent.title}</Text>
                        <Text style={styles.modalMessage}>{modalContent.message}</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'darkred',
        // marginTop: Platform.OS === 'android' ? 38 : 0,
    },
    topContainer: {
        padding: 40,
        backgroundColor: 'darkred',
        alignItems: 'center',
        marginRight: 200,
        marginTop: 60,
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 20,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 0,
        color: 'white',
    },
    input: {
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 20,
        paddingHorizontal: 10,
        fontSize: 18,
    },
    button: {
        backgroundColor: 'darkred',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        margin: 30,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 12,
        marginBottom: 20,
    },
    modalButton: {
        width: 200,
        height: 40,
        backgroundColor: 'darkred',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 20,
        paddingHorizontal: 10,
        fontSize: 18,
    },
    passwordInput: {
        flex: 1,
        height: 45,
        fontSize: 18,

    },
    disabledButton: {
        backgroundColor: 'darkgray',
    },
});

export default Home;
