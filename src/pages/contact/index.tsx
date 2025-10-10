import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export function ContactPage() {
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
                style={styles.picker}
                dropdownIconColor="#E6E6FA"
              >
                {tiposInstalacao.map((tipo) => (
                  <Picker.Item
                    key={tipo.value}
                    label={tipo.label}
                    value={tipo.value}
                    color="#E6E6FA"
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
  },
  picker: {
    color: '#E6E6FA',
    backgroundColor: 'transparent',
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