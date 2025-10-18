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
  { id: '1', text: 'Quanto custa?', action: 'preco' },
  { id: '2', text: 'Como funciona a energia solar?', action: 'funcionamento' },
  { id: '3', text: 'Quanto vou economizar?', action: 'economia' },
  { id: '4', text: 'Quanto tempo demora a instalação?', action: 'tempo' },
  { id: '5', text: 'Solicitar orçamento', action: 'orcamento' },
];

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Olá! 👋 Estou aqui para tirar suas dúvidas sobre energia solar. Escolha uma opção abaixo:',
    sender: 'bot',
    options: initialOptions,
  },
];

const simpleResponses: { [key: string]: string } = {
  'preco': '💰 Os valores variam conforme o tamanho do sistema:\n\n' +
           '• Residencial (pequeno): a partir de R$ 12.000\n' +
           '• Residencial (médio): a partir de R$ 18.000\n' +
           '• Comercial: a partir de R$ 25.000\n\n' +
           'Inclui equipamentos, instalação e garantia de 25 anos!',
  
  'funcionamento': '☀️ É simples! Os painéis solares captam a luz do sol e transformam em energia elétrica através do efeito fotovoltaico.\n\n' +
                   'A energia gerada é distribuída para sua casa ou empresa, reduzindo drasticamente sua conta de luz.',
  
  'economia': '📊 Você pode economizar até 95% na sua conta de energia!\n\n' +
              'Uma instalação residencial se paga em média em 4 a 6 anos, e os painéis duram mais de 25 anos.\n\n' +
              'Isso significa décadas de economia! 💚',
  
  'tempo': '⏱️ A instalação é rápida:\n\n' +
           '• Residencial: 2 a 3 dias\n' +
           '• Comercial: 3 a 7 dias\n\n' +
           'Após a instalação, em até 30 dias sua energia solar já estará funcionando!',
  
  'orcamento': '📝 Ótimo! Para solicitar um orçamento personalizado, você pode:\n\n' +
               '• Acessar a aba "Orçamento" no menu\n' +
               '• Ligar para (11) 9999-9999\n' +
               '• Enviar e-mail para contato@solarpulse.com\n\n' +
               'Nossa equipe responde em até 24h!',
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

  const getBotResponse = (action: string): Message => {
    const lowercaseAction = action.toLowerCase();

    // Verificar se é uma resposta simples
    if (simpleResponses[lowercaseAction]) {
      return {
        id: Date.now().toString(),
        text: simpleResponses[lowercaseAction],
        sender: 'bot',
        options: [
          { id: 'more1', text: 'Fazer outra pergunta', action: 'voltar' },
          { id: 'more2', text: 'Encerrar chat', action: 'encerrar' },
        ],
      };
    }

    // Voltar ao menu inicial
    if (lowercaseAction === 'voltar') {
      return {
        id: Date.now().toString(),
        text: 'Como posso ajudar você? 😊',
        sender: 'bot',
        options: initialOptions,
      };
    }

    // Encerrar chat
    if (lowercaseAction === 'encerrar') {
      setTimeout(endChat, 500);
      return {
        id: Date.now().toString(),
        text: 'Obrigado pelo contato! Estamos à disposição sempre que precisar. Até logo! 👋',
        sender: 'bot',
      };
    }

    // Resposta padrão para mensagens não reconhecidas
    return {
      id: Date.now().toString(),
      text: 'Desculpe, não entendi. Por favor, escolha uma das opções abaixo:',
      sender: 'bot',
      options: initialOptions,
    };
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
    const messageText = inputText;
    setInputText('');

    setTimeout(() => {
      // Tenta encontrar uma palavra-chave na mensagem do usuário
      const lowercaseInput = messageText.toLowerCase();
      let action = 'default';
      
      if (lowercaseInput.includes('preço') || lowercaseInput.includes('custo') || lowercaseInput.includes('valor')) {
        action = 'preco';
      } else if (lowercaseInput.includes('funciona') || lowercaseInput.includes('como')) {
        action = 'funcionamento';
      } else if (lowercaseInput.includes('econom') || lowercaseInput.includes('economiz')) {
        action = 'economia';
      } else if (lowercaseInput.includes('tempo') || lowercaseInput.includes('demora') || lowercaseInput.includes('rápido')) {
        action = 'tempo';
      } else if (lowercaseInput.includes('orçamento') || lowercaseInput.includes('solicitar')) {
        action = 'orcamento';
      }

      const botMessage = getBotResponse(action);
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container]}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        enabled
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
                    onPress={() => navigation.navigate('Home')}
                  >
                    <Text style={styles.endChatButtonText}>Voltar para a Página Inicial</Text>
                  </TouchableOpacity>
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
            placeholder="Digite sua dúvida ou escolha uma opção..."
            placeholderTextColor="#B8B8E6"
            onSubmitEditing={handleSend}
            editable={!chatEnded}
            multiline={false}
            returnKeyType="send"
          />
          <TouchableOpacity 
            style={[styles.sendButton, chatEnded && styles.sendButtonDisabled]} 
            onPress={handleSend}
            disabled={chatEnded}
          >
            <Text style={styles.sendButtonText}>📤</Text>
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
    justifyContent: 'space-between',
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
    paddingBottom: 100,
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
    backgroundColor: 'rgba(123, 104, 238, 0.2)',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(123, 104, 238, 0.4)',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ':hover': {
          backgroundColor: 'rgba(123, 104, 238, 0.35)',
          borderColor: '#7B68EE',
        },
      },
    }),
  },
  optionText: {
    color: '#E6E6FA',
    fontSize: Platform.OS === 'web' ? 15 : 14,
    textAlign: 'center',
    fontWeight: '500',
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
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(123, 104, 238, 0.2)',
    backgroundColor: '#0A0A1F',
    width: '100%',
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
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? 16 : 14,
    fontWeight: '500',
  },
});