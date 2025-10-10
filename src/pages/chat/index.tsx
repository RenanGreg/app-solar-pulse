import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ChatBot } from '../../components/ChatBot';

export function ChatPage() {
  return (
    <View style={styles.container}>
      <ChatBot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
});