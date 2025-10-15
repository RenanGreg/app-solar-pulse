import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../types/navigation';

type ServiceCardProps = {
  title: string;
  description: string;
  price: string;
  features: string[];
};

export function ServiceCard({ title, description, price, features }: ServiceCardProps) {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>{price}</Text>
      <View style={styles.featuresList}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Contact')}
      >
        <Text style={styles.buttonText}>Solicitar Orçamento →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(123, 104, 238, 0.05)',
    borderRadius: 20,
    padding: Platform.OS === 'web' ? 32 : 24,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.2)',
    width: Platform.OS === 'web' ? '30%' : '100%',
    minWidth: Platform.OS === 'web' ? 300 : undefined,
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
        ':hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(123, 104, 238, 0.1)',
        },
      },
    }),
  },
  title: {
    fontSize: Platform.OS === 'web' ? 24 : 20,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 12,
  },
  description: {
    fontSize: Platform.OS === 'web' ? 16 : 14,
    color: '#B8B8E6',
    marginBottom: 16,
  },
  price: {
    fontSize: Platform.OS === 'web' ? 28 : 24,
    fontWeight: 'bold',
    color: '#7B68EE',
    marginBottom: 24,
  },
  featuresList: {
    marginBottom: 32,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    color: '#7B68EE',
    fontSize: Platform.OS === 'web' ? 18 : 16,
    fontWeight: 'bold',
  },
  featureText: {
    color: '#B8B8E6',
    fontSize: Platform.OS === 'web' ? 16 : 14,
  },
  button: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    paddingVertical: Platform.OS === 'web' ? 16 : 14,
    paddingHorizontal: Platform.OS === 'web' ? 32 : 24,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
        ':hover': {
          backgroundColor: 'rgba(123, 104, 238, 0.2)',
          borderColor: 'rgba(123, 104, 238, 0.4)',
        },
      },
    }),
  },
  buttonText: {
    color: '#7B68EE',
    fontSize: Platform.OS === 'web' ? 16 : 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});