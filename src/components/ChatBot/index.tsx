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
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Olá! Sou o assistente virtual da Pulse Robot. Como posso ajudar você hoje?',
    sender: 'bot',
  },
];

const botResponses = {
  default: 'Desculpe, não entendi. Pode reformular sua pergunta?',
  keywords: {
    'orçamento': 'Para solicitar um orçamento, você pode acessar nossa página de contato ou me dizer os detalhes do seu projeto.',
    'energia solar': 'Oferecemos soluções completas em energia solar, incluindo instalação e manutenção de painéis solares.',
    'preço': 'O preço varia de acordo com seu consumo e necessidades específicas. Posso te ajudar a fazer uma estimativa.',
    'instalação': 'Nossa equipe especializada realiza a instalação completa do sistema, seguindo todas as normas técnicas.',
    'economia': 'Com energia solar, você pode economizar até 95% na sua conta de energia elétrica!',
  },
};

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = React.useRef<ScrollView>(null);

  const getBotResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(botResponses.keywords)) {
      if (lowercaseMessage.includes(keyword)) {
        return response;
      }
    }
    
    return botResponses.default;
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

    // Simular resposta do bot após 1 segundo
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
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
          <View
            key={message.id}
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