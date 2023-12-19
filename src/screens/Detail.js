import React, { useState } from 'react';
import { StyleSheet, View, Image, FlatList, Text, TouchableOpacity, Modal,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';

const Detail = ({ navigation }) => {
  const [numColumns, setNumColumns] = useState(2);
  const [key, setKey] = useState('key-1');
const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const data = [
    {uri :'https://images.twinkl.co.uk/tr/raw/upload/u/ux/usawiki-fish-clownfish_ver_1.jpg', name:"Nemo"},
    {uri :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT508CVXmnsLTyV8Fnh_yzLERuxdCWVUlgdQA&usqp=CAU.jpg', name:"qwerty"},
    {uri :'https://www.worldatlas.com/r/w1200/upload/04/ab/d1/fish-species-tropical.jpg', name:"Wish"},
    {uri :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6A8X-J6T9hbN0uqumgDtoOIwPhqFuSt6s6buGTkBGfXn4DT5ABSKn1bNKNejE2SSbynY&usqp=CAU.jpg',name:"Clown"},
   { uri :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi8XuK2YUZPbYLM5kUgfCFPEw3sxzLIAA_bw&usqp=CAU.jpg', name:"born"},
    {uri :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRETkuMaSjru1Wrxdcpu9XUO-LfTx98X9qJ8yCVBXupQ1YmVRVUnp9ZYRvVCYxAl4VxnHE&usqp=CAU.jpg', name:"jack"},
    {uri :'https://www.americanoceans.org/wp-content/uploads/2021/03/fullsizeoutput_27c-1024x674.jpeg', name:"youuu"},
    {uri :'https://static.ffx.io/images/$zoom_1%2C$multiply_0.3317%2C$ratio_1.777778%2C$width_1869%2C$x_0%2C$y_28/t_crop_custom/q_86%2Cf_auto/35edc889f712e7d66c8d73c4682fee44fddc6ed0.jpg', name:"Poweder"},
    {uri :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs8ro76tEhMgdtSka7Zk8A_6owTtharKGMLuKqODx55J-vmdlVh96i2oWchnJClt1IpwA&usqp=CAU.jpg', name:"Alcohol"},
    {uri :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTazrGeP0yLp2kBXRhw6rBHNcaHwjoHb4iwXYvzzmWqBGl-wDIx9gwRP1hDUVna2jKw0PM&usqp=CAU.jpg', name:"Cloud"},
    {uri :'https://i.pinimg.com/736x/5d/9d/99/5d9d99c2b15ac5ff18865cbf5fc5d4e8.jpg', name:"Snake"},
    {uri :'https://i.pinimg.com/736x/23/09/2a/23092a6557422f6daec98434e87d5ac5.jpg', name:"Sea"},
  ];
 

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.touchableImageContainer}
      onPress={() => navigateToDetail(item.uri, item.name)}
    >
      <Image source={{ uri: item.uri }} style={styles.image} />
    </TouchableOpacity>
  );

  const navigateToDetail = (imageUri, name) => {
    navigation.replace('DetailScreen', { imageUri, name });
  };

  const changeColumns = () => {
    setNumColumns(numColumns === 2 ? 1 : 2);
    setKey(`key-${Date.now()}`);
  };

  const goBackHome = () => {
    navigation.replace('Home');
  };

  const navigateToSettings = () => {
    // Navigate to the Settings screen
    navigation.replace('Settings');
  };
  return (
    <View style={styles.container}>
      {/* Settings Icon */}
      <TouchableOpacity style={styles.settingsIcon} onPress={navigateToSettings}>
        <Ionicons name="ios-settings" size={24} color="white" />
      </TouchableOpacity>
      <FlatList
        key={key}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.imageContainer}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goBackHome}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={changeColumns}>
          <Text style={styles.buttonText}>Show more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 40,
  },
  imageContainer: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop:60,
  },
  touchableImageContainer: {
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 5,
    margin: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'darkred',
    padding: 10,
    borderRadius: 15,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  settingsIcon: {
    position: 'absolute',
    top:-50,
    right: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'darkred',
    zIndex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    maxHeight: 200,
    marginHorizontal: 20,
    marginTop: '30%',
    borderRadius: 15,
    padding: 15,
  },
  modalOption: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingVertical: 15,
  },
  modalOptionText: {
    fontSize: 16,
  },
});

export default Detail;