import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

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
  titleContainer: {
    marginBottom: 20,
  },
  container: {
    width: width,
    backgroundColor: '#0A0A1F',
    padding: 40,
    minHeight: 400,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    maxWidth: 600,
    marginBottom: 20,
    position: 'relative',
    zIndex: 1,
  },
  tag: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    color: '#7B68EE',
    padding: 12,
    borderRadius: 20,
    fontSize: 14,
    width: 'auto',
    alignSelf: 'flex-start',
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 20,
    textShadowColor: '#7B68EE',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#B8B8E6',
    marginBottom: 20,
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: '#7B68EE',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignSelf: 'flex-start',
    shadowColor: '#7B68EE',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});