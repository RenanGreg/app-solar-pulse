import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigate('/')}>
          <Text style={styles.logo}>☀️ Solar Pulse</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.nav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigate('/')}>
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Serviços</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigate('/contact')}>
          <Text style={styles.navText}>Contato</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, styles.chatButton]} 
          onPress={() => navigate('/chat')}
        >
          <Text style={styles.chatButtonText}>💬 Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0A0A1F',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#2E2E5F',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7B68EE',
    textShadowColor: '#7B68EE',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  nav: {
    flexDirection: 'row',
    gap: 20,
  },
  navItem: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
  },
  navText: {
    color: '#E6E6FA',
    fontSize: 16,
    fontWeight: '500',
  },
  chatButton: {
    backgroundColor: '#7B68EE',
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  chatButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});