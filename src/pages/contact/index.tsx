import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform, Linking, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';
import { Header } from '../../components/Header';
import { ParallaxScrollView } from '../../components/ParallaxScrollView';
import { useScreenTransition } from '../../hooks/useScreenTransition';
import { LinearGradient } from 'expo-linear-gradient';

export function ContactPage() {
  const navigation = useNavigation<NavigationProps>();
  const { animatedStyle } = useScreenTransition();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!email || !name) {
      Alert.alert('Atenção', 'Por favor, preencha seu nome e e-mail.');
      return;
    }

    Alert.alert(
      '✅ Mensagem Enviada!',
      'Recebemos sua solicitação. Nossa equipe entrará em contato em até 24 horas.',
      [{ text: 'OK', onPress: () => {
        setEmail('');
        setName('');
        setMessage('');
      }}]
    );
  };

  const handleCall = () => {
    Linking.openURL('tel:(11) 9999-9999');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre energia solar.');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:contato@solarpulse.com.br');
  };

  const handleLocation = () => {
    Linking.openURL('https://maps.google.com/?q=São Paulo, SP');
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.headerWrapper}>
        <Header />
      </View>
      <ParallaxScrollView>
        <View style={styles.content}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.iconContainer}>
              <Text style={styles.heroIcon}>💬</Text>
            </View>
            <Text style={styles.title}>Vamos Conversar?</Text>
            <Text style={styles.subtitle}>
              Estamos prontos para transformar sua relação com a energia elétrica.
              Entre em contato e comece a economizar hoje mesmo!
            </Text>
          </View>

          {/* Contact Form */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>📝 Envie sua Mensagem</Text>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Como devemos te chamar?"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Mensagem (opcional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Conte-nos mais sobre seu projeto..."
                placeholderTextColor="#888"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Enviar Mensagem 🚀</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Contact Section */}
          <View style={styles.quickContactSection}>
            <Text style={styles.sectionTitle}>⚡ Contato Rápido</Text>
            
            <View style={styles.contactGrid}>
              <View style={styles.contactRow}>
                <TouchableOpacity style={styles.quickButton} onPress={handleWhatsApp}>
                  <View style={[styles.quickButtonIcon, { backgroundColor: 'rgba(37, 211, 102, 0.2)' }]}>
                    <Text style={styles.quickButtonEmoji}>💚</Text>
                  </View>
                  <Text style={styles.quickButtonTitle}>WhatsApp</Text>
                  <Text style={styles.quickButtonSubtitle}>Resposta imediata</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.quickButton} onPress={handleCall}>
                  <View style={[styles.quickButtonIcon, { backgroundColor: 'rgba(123, 104, 238, 0.2)' }]}>
                    <Text style={styles.quickButtonEmoji}>📞</Text>
                  </View>
                  <Text style={styles.quickButtonTitle}>Telefone</Text>
                  <Text style={styles.quickButtonSubtitle}>(11) 9999-9999</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.contactRow}>
                <TouchableOpacity style={styles.quickButton} onPress={handleEmail}>
                  <View style={[styles.quickButtonIcon, { backgroundColor: 'rgba(255, 107, 107, 0.2)' }]}>
                    <Text style={styles.quickButtonEmoji}>✉️</Text>
                  </View>
                  <Text style={styles.quickButtonTitle}>E-mail</Text>
                  <Text style={styles.quickButtonSubtitle}>24h de resposta</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.quickButton} onPress={handleLocation}>
                  <View style={[styles.quickButtonIcon, { backgroundColor: 'rgba(255, 193, 7, 0.2)' }]}>
                    <Text style={styles.quickButtonEmoji}>📍</Text>
                  </View>
                  <Text style={styles.quickButtonTitle}>Localização</Text>
                  <Text style={styles.quickButtonSubtitle}>São Paulo, SP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Info Cards */}
          <View style={styles.infoCardsSection}>
            <View style={styles.infoCard}>
              <Text style={styles.infoCardIcon}>⏰</Text>
              <Text style={styles.infoCardTitle}>Horário de Atendimento</Text>
              <Text style={styles.infoCardText}>Segunda a Sexta: 8h - 18h</Text>
              <Text style={styles.infoCardText}>Sábado: 9h - 13h</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoCardIcon}>🎯</Text>
              <Text style={styles.infoCardTitle}>Atendimento Rápido</Text>
              <Text style={styles.infoCardText}>Retorno em até 24h</Text>
              <Text style={styles.infoCardText}>Orçamento gratuito</Text>
            </View>
          </View>
        </View>
        {/* Espaçamento extra para não sobrepor controles do celular */}
        <View style={styles.bottomSpacer} />
      </ParallaxScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
  headerWrapper: {
    position: 'relative',
    zIndex: 1000,
    elevation: 5,
  },
  content: {
    padding: Platform.OS === 'web' ? 40 : 20,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'web' ? 20 : 40,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  bottomSpacer: {
    height: Platform.OS === 'web' ? 40 : 100,
  },
  
  // Hero Section
  heroSection: {
    alignItems: 'center',
    marginBottom: 48,
    width: '100%',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(123, 104, 238, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: 'rgba(123, 104, 238, 0.3)',
  },
  heroIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 48 : 36,
    fontWeight: 'bold',
    color: '#E6E6FA',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    color: '#B8B8E6',
    textAlign: 'center',
    maxWidth: 600,
    lineHeight: Platform.OS === 'web' ? 28 : 24,
  },

  // Form Card
  formCard: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: 'rgba(123, 104, 238, 0.08)',
    borderRadius: 24,
    padding: Platform.OS === 'web' ? 40 : 24,
    marginBottom: 48,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.2)',
    ...Platform.select({
      web: {
        boxShadow: '0 8px 32px rgba(123, 104, 238, 0.1)',
      },
      ios: {
        shadowColor: '#7B68EE',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  formTitle: {
    fontSize: Platform.OS === 'web' ? 24 : 20,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B8B8E6',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: 'rgba(230, 230, 250, 0.08)',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#E6E6FA',
    borderWidth: 1.5,
    borderColor: 'rgba(123, 104, 238, 0.25)',
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
        ':focus': {
          borderColor: '#7B68EE',
          backgroundColor: 'rgba(123, 104, 238, 0.12)',
        },
      },
    }),
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#7B68EE',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: '#8A7BEE',
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 24px rgba(123, 104, 238, 0.3)',
        },
      },
      ios: {
        shadowColor: '#7B68EE',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  // Quick Contact Section
  quickContactSection: {
    width: '100%',
    marginBottom: 48,
  },
  sectionTitle: {
    fontSize: Platform.OS === 'web' ? 28 : 24,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 24,
    textAlign: 'center',
  },
  contactGrid: {
    gap: 16,
    alignItems: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    maxWidth: 600,
    justifyContent: 'center',
  },
  quickButton: {
    backgroundColor: 'rgba(230, 230, 250, 0.05)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(230, 230, 250, 0.1)',
    flex: Platform.OS === 'web' ? 1 : undefined,
    minWidth: Platform.OS === 'web' ? 180 : undefined,
    maxWidth: Platform.OS === 'web' ? 250 : undefined,
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        ':hover': {
          transform: 'translateY(-4px)',
          backgroundColor: 'rgba(230, 230, 250, 0.1)',
          borderColor: 'rgba(123, 104, 238, 0.4)',
          boxShadow: '0 8px 20px rgba(123, 104, 238, 0.15)',
        },
      },
    }),
  },
  quickButtonIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickButtonEmoji: {
    fontSize: 32,
  },
  quickButtonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 4,
  },
  quickButtonSubtitle: {
    fontSize: 13,
    color: '#B8B8E6',
    textAlign: 'center',
  },

  // Info Cards
  infoCardsSection: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: 20,
    width: '100%',
    maxWidth: 800,
  },
  infoCard: {
    flex: 1,
    backgroundColor: 'rgba(123, 104, 238, 0.06)',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.15)',
  },
  infoCardIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoCardText: {
    fontSize: 14,
    color: '#B8B8E6',
    textAlign: 'center',
    marginBottom: 4,
  },
});
