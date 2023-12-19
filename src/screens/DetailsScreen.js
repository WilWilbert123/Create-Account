import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailScreen = ({ route }) => {
  const { imageUri, name } = route.params;
  const navigation = useNavigation();

  const goBack = () => {
    navigation.replace("Detail");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.indexText}>{name}</Text>
      
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  indexText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: 'darkred',
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DetailScreen;
