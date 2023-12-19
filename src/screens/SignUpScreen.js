import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = () => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [emptyInputModalVisible, setEmptyInputModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
    const [loginModalVisible, setLoginModalVisible] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        // Enable or disable the "SAVE" button based on whether username and password are empty
        setIsSaveButtonDisabled(newUsername.trim() === '' || newPassword.trim() === '');
    }, [newUsername, newPassword]);

    const handleImageUpload = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            console.error('Permission to access media library was denied');
            return;
        }

        try {
            const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: 'Images' });

            if (!result.canceled) {
                if (result.assets && result.assets.length > 0) {
                    setSelectedImage(result.assets[0].uri);
                }
            }
        } catch (error) {
            console.error('Error launching image library: ', error);
        }
    };


    const closeModal = () => {
        setEmptyInputModalVisible(false);
        setConfirmationModalVisible(false);
        setLoginModalVisible(false);

    };

    const handleSave = async () => {
        // Validate username and password
        if (newUsername.trim() === '' || newPassword.trim() === '') {
            console.error('Username or password cannot be empty');
            setEmptyInputModalVisible(true);
            return;
        }

        // Display confirmation modal
        setConfirmationModalVisible(true);
    };
    const handleConfirmSave = async () => {
        try {
            // Store user data in AsyncStorage
            await AsyncStorage.setItem('user_username', newUsername.trim());
            await AsyncStorage.setItem('user_password', newPassword.trim());

            // Hide confirmation modal
            setConfirmationModalVisible(false);

        } catch (error) {
            // Handle AsyncStorage errors
            console.error('Error saving user data to AsyncStorage: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={handleImageUpload}>
                    {selectedImage ? (
                        <Image source={{ uri: selectedImage }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.placeholderImage}>
                            <Text style={styles.placeholderText}>Upload Photo</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 30 }}>
                <Text style={styles.title}>Sign up!</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={newUsername}
                    onChangeText={(text) => setNewUsername(text)}
                />
                <View style={styles.borderBottom}></View>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                />
                <View style={styles.borderBottom}></View>
            </View>
            <TouchableOpacity
                style={[styles.button, isSaveButtonDisabled && styles.disabledButton]}
                onPress={handleSave}
                disabled={isSaveButtonDisabled}
            >
                <Text style={styles.buttonText}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.replace("Home")}>
                <Text style={styles.buttonText}>BACK</Text>
            </TouchableOpacity>

            {/* Confirmation Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={confirmationModalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirm Information</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure about the provided information?
                        </Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    setConfirmationModalVisible(false);
                                    setLoginModalVisible(false);
                                    navigation.navigate('SignUpScreen');
                                }}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    handleConfirmSave();
                                    navigation.replace("Home");
                                }}
                            >
                                <Text style={styles.buttonText}>OK</Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    placeholderImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'darkred',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    borderBottom: {
        height: 1,
        backgroundColor: 'black',
    },
    button: {
        backgroundColor: 'darkred',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'darkred',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        width: 300,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        color: 'white',
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        width: 100,
        height: 40,
        backgroundColor: 'darkred',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 1,
    },
    disabledButton: {
        backgroundColor: 'darkgray',
        color: 'darkgray',
    },
});

export default SignUpScreen;
