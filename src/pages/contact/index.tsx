import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';

export function ContactPage() {
  const navigation = useNavigation<NavigationProps>();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    tipoInstalacao: 'residencial',
    mensagem: '',
  });

  const tiposInstalacao = [
    { label: 'Residencial', value: 'residencial' },
    { label: 'Comercial', value: 'comercial' },
    { label: 'Industrial', value: 'industrial' },
  ];

  const handleSubmit = () => {
    if (!formData.nome || !formData.email || !formData.telefone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Aqui você pode adicionar a lógica para enviar o formulário
    Alert.alert(
      'Sucesso!',
      'Recebemos sua solicitação. Em breve nossa equipe entrará em contato.',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Solicite seu Orçamento</Text>
        <Text style={styles.subtitle}>
          Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas.
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome Completo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="#B8B8E6"
              value={formData.nome}
              onChangeText={(text) => setFormData({ ...formData, nome: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail *</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#B8B8E6"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefone *</Text>
            <TextInput
              style={styles.input}
              placeholder="(00) 00000-0000"
              placeholderTextColor="#B8B8E6"
              keyboardType="phone-pad"
              value={formData.telefone}
              onChangeText={(text) => setFormData({ ...formData, telefone: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Endereço</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu endereço"
              placeholderTextColor="#B8B8E6"
              value={formData.endereco}
              onChangeText={(text) => setFormData({ ...formData, endereco: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de Instalação</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.tipoInstalacao}
                onValueChange={(itemValue) =>
                  setFormData({ ...formData, tipoInstalacao: itemValue })
                }
                style={[styles.picker, Platform.OS === 'web' && styles.pickerWeb]}
                dropdownIconColor="#7B68EE"
                mode="dropdown"
              >
                {tiposInstalacao.map((tipo) => (
                  <Picker.Item
                    key={tipo.value}
                    label={tipo.label}
                    value={tipo.value}
                    style={styles.pickerItem}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mensagem</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Digite sua mensagem ou dúvidas"
              placeholderTextColor="#B8B8E6"
              multiline
              numberOfLines={4}
              value={formData.mensagem}
              onChangeText={(text) => setFormData({ ...formData, mensagem: text })}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enviar Solicitação →</Text>
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
  backButton: {
    marginBottom: 24,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ':hover': {
          backgroundColor: 'rgba(123, 104, 238, 0.2)',
        },
      },
    }),
  },
  backButtonText: {
    color: '#E6E6FA',
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: '#7B68EE',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#B8B8E6',
    marginBottom: 40,
    textAlign: 'center',
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: '#E6E6FA',
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    borderRadius: 8,
    padding: 16,
    color: '#E6E6FA',
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    borderRadius: 8,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 0 10px rgba(123, 104, 238, 0.2)',
        transition: 'all 0.3s ease',
      },
      default: {
        shadowColor: '#7B68EE',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
      },
    }),
  },
  picker: {
    color: '#E6E6FA',
    backgroundColor: 'transparent',
    height: 50,
  },
  pickerWeb: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    outlineStyle: 'none',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    backgroundColor: 'rgba(10, 10, 31, 0.95)',
    color: '#E6E6FA',
    borderRadius: 8,
  },
  pickerItem: {
    fontSize: 16,
    height: 50,
    backgroundColor: '#0A0A1F',
    color: '#E6E6FA',
    ...Platform.select({
      web: {
        padding: 8,
      },
    }),
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#7B68EE',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#7B68EE',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});