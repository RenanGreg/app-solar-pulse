import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

type BannerProps = {
  onRequestQuote: () => void;
};

export function Banner({ onRequestQuote }: BannerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.tag}>Energia Limpa</Text>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Transforme o Sol</Text>
          <Text style={styles.title}>em Economia</Text>
        </View>

        <Text style={styles.subtitle}>
          Soluções completas em energia solar para sua casa ou empresa.
          Economize até 95% na conta de luz com energia limpa e renovável.
        </Text>
        
        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.8}
          onPress={onRequestQuote}
        >
          <Text style={styles.buttonText}>Solicitar Orçamento →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: Platform.OS === 'web' ? 500 : 400,
    backgroundColor: '#0A0A1F',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'web' ? 80 : 40,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(123, 104, 238, 0.2)',
  },
  content: {
    maxWidth: 1200,
    marginHorizontal: 'auto',
    alignItems: Platform.OS === 'web' ? 'flex-start' : 'center',
  },
  tag: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    color: '#7B68EE',
    fontSize: Platform.OS === 'web' ? 16 : 14,
    fontWeight: '500',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    overflow: 'hidden',
    textAlign: 'center',
  },
  titleContainer: {
    marginBottom: 24,
    width: '100%',
  },
  title: {
    fontSize: Platform.select({
      web: width > 768 ? 48 : 32,
      default: 32,
    }),
    fontWeight: 'bold',
    color: '#E6E6FA',
    textAlign: Platform.OS === 'web' ? 'left' : 'center',
    textShadowColor: '#7B68EE',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: Platform.select({
      web: width > 768 ? 18 : 16,
      default: 16,
    }),
    color: '#B8B8E6',
    marginBottom: 32,
    lineHeight: Platform.OS === 'web' ? 28 : 24,
    textAlign: Platform.OS === 'web' ? 'left' : 'center',
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
  },
  button: {
    backgroundColor: '#7B68EE',
    paddingVertical: Platform.OS === 'web' ? 16 : 14,
    paddingHorizontal: Platform.OS === 'web' ? 32 : 24,
    borderRadius: 30,
    alignSelf: 'center',
    shadowColor: '#7B68EE',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
      },
    }),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? 18 : 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});