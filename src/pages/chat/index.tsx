import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { ChatBot } from '../../components/ChatBot';
import { useScreenTransition } from '../../hooks/useScreenTransition';

export function ChatPage() {
  const { animatedStyle } = useScreenTransition();
  
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <ChatBot />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
});