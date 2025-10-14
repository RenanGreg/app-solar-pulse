import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Platform, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';

export function ContactPage() {
  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail.');
      return;
    }

    Alert.alert(
      'Sucesso!',
      'Recebemos sua solicitação. Em breve nossa equipe entrará em contato.',
      [{ text: 'OK', onPress: () => setEmail('') }]
    );
  };

  const handleCall = () => {
    Linking.openURL('tel:(11) 9999-9999');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:contato@solartech.com.br');
  };

  const handleLocation = () => {
    Linking.openURL('https://maps.google.com/?q=São Paulo, SP');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Pronto para economizar?</Text>
          <Text style={styles.subtitle}>
            Solicite um orçamento gratuito e descubra quanto você pode economizar com energia solar
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Seu melhor e-mail"
            placeholderTextColor="#B8B8E6"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Solicitar Orçamento</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactInfo}>
          <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
            <Text style={styles.contactIcon}>📞</Text>
            <Text style={styles.contactLabel}>Telefone</Text>
            <Text style={styles.contactValue}>(11) 9999-9999</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
            <Text style={styles.contactIcon}>✉️</Text>
            <Text style={styles.contactLabel}>E-mail</Text>
            <Text style={styles.contactValue}>contato@solartech.com.br</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={handleLocation}>
            <Text style={styles.contactIcon}>📍</Text>
            <Text style={styles.contactLabel}>Endereço</Text>
            <Text style={styles.contactValue}>São Paulo, SP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
  content: {
    padding: 40,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 36 : 28,
    fontWeight: 'bold',
    color: '#E6E6FA',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: '#7B68EE',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    color: '#B8B8E6',
    textAlign: 'center',
    maxWidth: 600,
  },
  formContainer: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: 16,
    marginBottom: 60,
  },
  input: {
    flex: Platform.OS === 'web' ? 1 : undefined,
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    borderRadius: 8,
    padding: 16,
    color: '#E6E6FA',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#7B68EE',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: Platform.OS === 'web' ? 200 : undefined,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      },
    }),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  contactInfo: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    justifyContent: 'space-around',
    gap: 24,
  },
  contactItem: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    flex: Platform.OS === 'web' ? 1 : undefined,
    margin: 8,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      },
    }),
  },
  contactIcon: {
    fontSize: 24,
    marginBottom: 12,
  },
  contactLabel: {
    color: '#7B68EE',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  contactValue: {
    color: '#E6E6FA',
    fontSize: 14,
    textAlign: 'center',
  },
});