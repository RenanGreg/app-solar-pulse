import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { Header } from '../../components/Header';
import { ParallaxScrollView } from '../../components/ParallaxScrollView';
import { useScreenTransition } from '../../hooks/useScreenTransition';
import { sendBudgetRequest } from '../../services/api';

export function BudgetPage() {
  const { animatedStyle } = useScreenTransition();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    powerBill: '',
    roofType: '',
    comments: '',
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Erro', 'Por favor, preencha os campos obrigatórios.');
      return;
    }

    setLoading(true);

    try {
      await sendBudgetRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        powerBill: formData.powerBill,
        roofType: formData.roofType,
        comments: formData.comments,
      });

      Alert.alert(
        'Orçamento Solicitado! 🌞',
        'Recebemos sua solicitação de orçamento. Em breve nossa equipe entrará em contato!',
        [{ 
          text: 'OK', 
          onPress: () => setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            powerBill: '',
            roofType: '',
            comments: '',
          }) 
        }]
      );
    } catch (error: any) {
      Alert.alert(
        'Erro ❌',
        error?.message || 'Não foi possível enviar a solicitação. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.header}>
        <Header />
      </View>
      <ParallaxScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Solicite um Orçamento</Text>
          <Text style={styles.subtitle}>
            Preencha o formulário abaixo e nossa equipe entrará em contato para fazer um orçamento personalizado.
          </Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome Completo *</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Seu nome completo"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-mail *</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder="seu@email.com"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Telefone *</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#666"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Endereço</Text>
              <TextInput
                style={styles.input}
                value={formData.address}
                onChangeText={(text) => setFormData({ ...formData, address: text })}
                placeholder="Rua, número, bairro, cidade"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Valor médio da conta de energia</Text>
              <TextInput
                style={styles.input}
                value={formData.powerBill}
                onChangeText={(text) => setFormData({ ...formData, powerBill: text })}
                placeholder="R$ 0,00"
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tipo de telhado</Text>
              <TextInput
                style={styles.input}
                value={formData.roofType}
                onChangeText={(text) => setFormData({ ...formData, roofType: text })}
                placeholder="Ex: Cerâmica, Metal, Fibrocimento"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Observações adicionais</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.comments}
                onChangeText={(text) => setFormData({ ...formData, comments: text })}
                placeholder="Informações adicionais que possam ser relevantes"
                placeholderTextColor="#666"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity 
              style={[styles.submitButton, loading && styles.submitButtonDisabled]} 
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#2ecc71" />
              ) : (
                <Text style={styles.submitButtonText}>Solicitar Orçamento</Text>
              )}
            </TouchableOpacity>
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
  header: {
    position: 'relative',
    zIndex: 1000,
    elevation: 5,
  },
  content: {
    padding: 20,
    paddingBottom: Platform.OS === 'web' ? 20 : 40,
  },
  bottomSpacer: {
    height: Platform.OS === 'web' ? 40 : 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#B8B8D1',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: {
    gap: 20,
    maxWidth: Platform.OS === 'web' ? 600 : undefined,
    alignSelf: 'center',
    width: '100%',
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: '#E6E6FA',
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'rgba(230, 230, 250, 0.1)',
    borderRadius: 8,
    padding: 12,
    color: '#E6E6FA',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: Platform.OS === 'web' ? 0 : 20,
    borderWidth: 1,
    borderColor: 'rgba(46, 204, 113, 0.3)',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#2ecc71',
    fontSize: 18,
    fontWeight: '600',
  },
});