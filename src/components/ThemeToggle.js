// ThemeToggle.js
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <TouchableOpacity onPress={toggleDarkMode} style={[styles.toggleButton, { backgroundColor: isDarkMode ? 'black' : 'darkred' }]}>
      <View style={styles.toggleIconContainer}>
        <Ionicons
          name={isDarkMode ? 'ios-moon' : 'ios-sunny'}
          size={24}
          color="white"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    padding: 10,
    borderRadius: 20,
  },
  toggleIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThemeToggle;
