import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export function Banner() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.tag}>Purpose</Text>
        
        <Text style={styles.title}>\n          Atlas: Where Code{`\n`}Meets Motion\n        </Text>

        <Text style={styles.subtitle}>
          The humanoid companion that learns and adapts alongside you.
        </Text>
        
        <View>
          <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Request Access →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#FFF5F1',
    padding: 40,
    minHeight: 400,
  },
  content: {
    maxWidth: 600,
    gap: 20,
  },
  tag: {
    backgroundColor: '#FFE4D6',
    color: '#FF4500',
    padding: 8,
    borderRadius: 20,
    fontSize: 14,
    width: 'auto',
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#FF4500',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignSelf: 'flex-start',
    shadowColor: '#FF4500',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});