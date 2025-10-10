import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  options?: Option[];
}

interface Option {
  id: string;
  text: string;
  action: string;
}

const initialOptions: Option[] = [
  { id: '1', text: 'Quero fazer um orçamento', action: 'orçamento' },
  { id: '2', text: 'Informações sobre energia solar', action: 'energia solar' },
  { id: '3', text: 'Custos e economia', action: 'economia' },
  { id: '4', text: 'Processo de instalação', action: 'instalação' },
  { id: '5', text: 'Falar com um atendente', action: 'atendente' },
];

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Olá! Sou o assistente virtual da Pulse Robot. Como posso ajudar você hoje?',
    sender: 'bot',
    options: initialOptions,
  },
];

const botResponses = {
  default: 'Como posso ajudar você? Escolha uma das opções abaixo:',
  keywords: {
    'orçamento': 'Para solicitar um orçamento, você pode acessar nossa página de contato ou me dizer os detalhes do seu projeto. Gostaria de saber mais sobre:',
    'energia solar': 'Oferecemos soluções completas em energia solar, incluindo instalação e manutenção de painéis solares. Você gostaria de saber mais sobre:',
    'economia': 'Com energia solar, você pode economizar até 95% na sua conta de energia elétrica! Quer saber mais detalhes sobre:',
    'instalação': 'Nossa equipe especializada realiza a instalação completa do sistema, seguindo todas as normas técnicas. Gostaria de saber mais sobre:',
    'atendente': 'Claro! Vou conectar você com um de nossos especialistas. Por favor, aguarde um momento enquanto faço a transferência.',
  },
  subOptions: {
    'orçamento': [
      { id: 'orc1', text: 'Residencial', action: 'orçamento residencial' },
      { id: 'orc2', text: 'Comercial', action: 'orçamento comercial' },
      { id: 'orc3', text: 'Industrial', action: 'orçamento industrial' },
    ],
    'energia solar': [
      { id: 'sol1', text: 'Como funciona', action: 'funcionamento' },
      { id: 'sol2', text: 'Tipos de painéis', action: 'tipos painéis' },
      { id: 'sol3', text: 'Manutenção', action: 'manutenção' },
    ],
    'economia': [
      { id: 'eco1', text: 'Tempo de retorno', action: 'payback' },
      { id: 'eco2', text: 'Economia mensal', action: 'economia mensal' },
      { id: 'eco3', text: 'Financiamento', action: 'financiamento' },
    ],
    'instalação': [
      { id: 'ins1', text: 'Etapas do processo', action: 'etapas' },
      { id: 'ins2', text: 'Tempo de instalação', action: 'tempo' },
      { id: 'ins3', text: 'Requisitos técnicos', action: 'requisitos' },
    ],
  },
};

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = React.useRef<ScrollView>(null);

  const getBotResponse = (userMessage: string): Message => {
    const lowercaseMessage = userMessage.toLowerCase();
    let response = {
      id: Date.now().toString(),
      text: botResponses.default,
      sender: 'bot' as const,
      options: initialOptions,
    };

    for (const [keyword, text] of Object.entries(botResponses.keywords)) {
      if (lowercaseMessage.includes(keyword)) {
        response.text = text;
        response.options = botResponses.subOptions[keyword as keyof typeof botResponses.subOptions] || initialOptions;
        break;
      }
    }

    return response;
  };

  const handleOptionSelect = (option: Option) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: option.text,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage = getBotResponse(option.action);
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const botMessage = getBotResponse(inputText);
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat Assistente</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <View key={message.id}>
            <View
              style={[
                styles.messageWrapper,
                message.sender === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper,
              ]}
            >
              <View
                style={[
                  styles.message,
                  message.sender === 'user' ? styles.userMessage : styles.botMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.sender === 'user' ? styles.userMessageText : styles.botMessageText,
                  ]}
                >
                  {message.text}
                </Text>
              </View>
            </View>

            {message.options && (
              <View style={styles.optionsContainer}>
                {message.options.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.optionButton}
                    onPress={() => handleOptionSelect(option)}
                  >
                    <Text style={styles.optionText}>{option.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#B8B8E6"
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
  header: {
    padding: 16,
    backgroundColor: '#7B68EE',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messagesContent: {
    gap: 16,
  },
  messageWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 4,
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  botMessageWrapper: {
    justifyContent: 'flex-start',
  },
  message: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
  },
  userMessage: {
    backgroundColor: '#7B68EE',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#E6E6FA',
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  botMessageText: {
    color: '#E6E6FA',
  },
  optionsContainer: {
    marginTop: 8,
    gap: 8,
  },
  optionButton: {
    backgroundColor: 'rgba(123, 104, 238, 0.15)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ':hover': {
          backgroundColor: 'rgba(123, 104, 238, 0.25)',
        },
      },
    }),
  },
  optionText: {
    color: '#E6E6FA',
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(123, 104, 238, 0.2)',
    backgroundColor: 'rgba(10, 10, 31, 0.95)',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    borderRadius: 20,
    padding: 12,
    color: '#E6E6FA',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#7B68EE',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});