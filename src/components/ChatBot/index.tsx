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
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  options?: Option[];
  isPrice?: boolean;
  endChat?: boolean;
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

const priceRanges = {
  'orçamento residencial': {
    text: 'Para instalações residenciais, o investimento médio é:\n\n' +
          '• Sistema 3kWp: R$ 15.000 a R$ 18.000\n' +
          '• Sistema 5kWp: R$ 22.000 a R$ 25.000\n' +
          '• Sistema 8kWp: R$ 35.000 a R$ 40.000\n\n' +
          'Estes valores incluem equipamentos e instalação completa.',
    isPrice: true,
  },
  'orçamento comercial': {
    text: 'Para instalações comerciais, o investimento médio é:\n\n' +
          '• Sistema 10kWp: R$ 45.000 a R$ 50.000\n' +
          '• Sistema 20kWp: R$ 85.000 a R$ 95.000\n' +
          '• Sistema 30kWp: R$ 125.000 a R$ 140.000\n\n' +
          'Estes valores incluem projeto completo e homologação.',
    isPrice: true,
  },
  'orçamento industrial': {
    text: 'Para instalações industriais, o investimento médio é:\n\n' +
          '• Sistema 50kWp: R$ 200.000 a R$ 230.000\n' +
          '• Sistema 100kWp: R$ 380.000 a R$ 420.000\n' +
          '• Sistema 200kWp: R$ 700.000 a R$ 800.000\n\n' +
          'Estes valores incluem projeto executivo e suporte técnico.',
    isPrice: true,
  },
};

const botResponses = {
  default: 'Como posso ajudar você? Escolha uma das opções abaixo:',
  keywords: {
    'orçamento': 'Selecione o tipo de instalação para ver os valores aproximados:',
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
  const [chatEnded, setChatEnded] = useState(false);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const navigation = useNavigation<NavigationProps>();
  const windowHeight = Dimensions.get('window').height;

  const endChat = () => {
    const endMessage: Message = {
      id: Date.now().toString(),
      text: 'Obrigado por seu interesse! Para mais informações ou para agendar uma visita técnica, entre em contato através do formulário ou pelo telefone. Tenha um ótimo dia! 😊',
      sender: 'bot',
      endChat: true,
    };
    setMessages((prev) => [...prev, endMessage]);
    setChatEnded(true);
  };

  const getBotResponse = (userMessage: string): Message => {
    const lowercaseMessage = userMessage.toLowerCase();

    // Verificar se é uma solicitação de orçamento específico
    if (priceRanges[lowercaseMessage as keyof typeof priceRanges]) {
      const priceInfo = priceRanges[lowercaseMessage as keyof typeof priceRanges];
      setTimeout(endChat, 5000); // Encerra o chat 5 segundos após mostrar os preços
      return {
        id: Date.now().toString(),
        text: priceInfo.text,
        sender: 'bot',
        isPrice: true,
      };
    }

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
    if (chatEnded) return;

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
    if (!inputText.trim() || chatEnded) return;

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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { minHeight: windowHeight }]}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Chat Assistente</Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={[
            styles.messagesContent,
            { paddingBottom: Platform.OS === 'web' ? 20 : 100 }
          ]}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message) => (
            <View key={message.id} style={styles.messageOuterContainer}>
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
                    message.isPrice && styles.priceMessage,
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

              {message.options && !chatEnded && (
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

              {message.endChat && (
                <View style={styles.endChatContainer}>
                  <TouchableOpacity
                    style={styles.endChatButton}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.endChatButtonText}>Voltar para a Página Inicial</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        <View style={[
          styles.inputContainer,
          Platform.OS !== 'web' && {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#0A0A1F',
            paddingBottom: 20,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: 'rgba(123, 104, 238, 0.2)',
          }
        ]}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#B8B8E6"
            onSubmitEditing={handleSend}
            editable={!chatEnded}
          />
          <TouchableOpacity 
            style={[styles.sendButton, chatEnded && styles.sendButtonDisabled]} 
            onPress={handleSend}
            disabled={chatEnded}
          >
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#7B68EE',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    minHeight: 60,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  messageOuterContainer: {
    width: '100%',
    marginBottom: 16,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 32,
  },
  messageWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 4,
    paddingHorizontal: 8,
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  botMessageWrapper: {
    justifyContent: 'flex-start',
  },
  message: {
    maxWidth: '85%',
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
  priceMessage: {
    backgroundColor: 'rgba(123, 104, 238, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.4)',
  },
  messageText: {
    fontSize: Platform.OS === 'web' ? 16 : 14,
    color: '#E6E6FA',
    lineHeight: Platform.OS === 'web' ? 24 : 20,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  botMessageText: {
    color: '#E6E6FA',
  },
  optionsContainer: {
    marginTop: 8,
    paddingHorizontal: 8,
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
      },
    }),
  },
  optionText: {
    color: '#E6E6FA',
    fontSize: Platform.OS === 'web' ? 14 : 13,
    textAlign: 'center',
  },
  endChatContainer: {
    marginTop: 16,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  endChatButton: {
    backgroundColor: '#7B68EE',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    width: '100%',
    maxWidth: 300,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      },
    }),
  },
  endChatButtonText: {
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? 16 : 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(123, 104, 238, 0.2)',
    backgroundColor: 'rgba(10, 10, 31, 0.95)',
    minHeight: 80,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    borderRadius: 20,
    padding: 12,
    color: '#E6E6FA',
    fontSize: Platform.OS === 'web' ? 16 : 14,
    minHeight: 48,
  },
  sendButton: {
    backgroundColor: '#7B68EE',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
    minHeight: 48,
  },
  sendButtonDisabled: { 
    backgroundColor: 'rgba(123, 104, 238, 0.5)',
    ...Platform.select({
      web: {
        cursor: 'not-allowed',
      },
    }),
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? 16 : 14,
    fontWeight: '500',
  },
});