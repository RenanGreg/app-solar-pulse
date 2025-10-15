import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';
import { Header } from '../../components/Header';
import { ParallaxScrollView } from '../../components/ParallaxScrollView';

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
    <View style={styles.container}>
      <ParallaxScrollView>
        <View style={styles.headerWrapper}>
          <Header />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Pronto para economizar?</Text>
          <Text style={styles.subtitle}>
            Solicite um orçamento gratuito e descubra quanto você pode economizar com energia solar
          </Text>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Seu melhor e-mail"
              placeholderTextColor="#B8B8E6"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Solicitar contato</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contactOptions}>
            <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
              <Text style={styles.contactButtonText}>📞 Ligar agora</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactButton} onPress={handleEmail}>
              <Text style={styles.contactButtonText}>✉️ E-mail</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactButton} onPress={handleLocation}>
              <Text style={styles.contactButtonText}>�� Localização</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
  headerWrapper: {
    position: 'relative',
    zIndex: 100,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: Platform.OS === 'web' ? 36 : 28,
    fontWeight: 'bold',
    color: '#E6E6FA',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(123, 104, 238, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    color: '#B8B8E6',
    textAlign: 'center',
    marginBottom: 32,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
    marginBottom: 32,
  },
  input: {
    backgroundColor: 'rgba(230, 230, 250, 0.1)',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#E6E6FA',
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
  },
  submitButton: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
  },
  submitButtonText: {
    color: '#7B68EE',
    fontSize: 16,
    fontWeight: '600',
  },
  contactOptions: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: 16,
    width: '100%',
    maxWidth: 400,
    justifyContent: 'center',
  },
  contactButton: {
    backgroundColor: 'rgba(230, 230, 250, 0.05)',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: Platform.OS === 'web' ? 1 : undefined,
    borderWidth: 1,
    borderColor: 'rgba(230, 230, 250, 0.1)',
  },
  contactButtonText: {
    color: '#E6E6FA',
    fontSize: 16,
  },
});
