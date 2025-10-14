import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../types/navigation';

const { width } = Dimensions.get('window');

export function Header() {
  const navigation = useNavigation<NavigationProps>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.logoContainer}>
          <Text style={styles.logo}>☀️ Solar Pulse</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={toggleMenu}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>
      
      <View style={[
        styles.nav,
        isMenuOpen ? styles.navOpen : styles.navClosed,
        Platform.OS === 'web' && width > 768 ? styles.navWeb : null
      ]}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => {
            navigation.navigate('Home');
            setIsMenuOpen(false);
          }}
        >
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setIsMenuOpen(false)}
        >
          <Text style={styles.navText}>Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setIsMenuOpen(false)}
        >
          <Text style={styles.navText}>Serviços</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => {
            navigation.navigate('Contact');
            setIsMenuOpen(false);
          }}
        >
          <Text style={styles.navText}>Contato</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, styles.chatButton]} 
          onPress={() => {
            navigation.navigate('Chat');
            setIsMenuOpen(false);
          }}
        >
          <Text style={styles.chatButtonText}>💬 Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(10, 10, 31, 0.95)',
    paddingTop: Platform.OS === 'web' ? 16 : 40,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(123, 104, 238, 0.2)',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E6E6FA',
  },
  menuButton: {
    display: Platform.OS === 'web' && width > 768 ? 'none' : 'flex',
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: '#E6E6FA',
  },
  nav: {
    ...Platform.select({
      web: {
        flexDirection: width > 768 ? 'row' : 'column',
      },
      default: {
        flexDirection: 'column',
      },
    }),
    gap: 8,
    paddingHorizontal: 20,
  },
  navWeb: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  navOpen: {
    display: 'flex',
    paddingBottom: 16,
  },
  navClosed: {
    ...Platform.select({
      web: {
        display: width > 768 ? 'flex' : 'none',
      },
      default: {
        display: 'none',
      },
    }),
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
      },
    }),
  },
  navText: {
    color: '#E6E6FA',
    fontSize: 16,
    textAlign: Platform.OS === 'web' && width <= 768 ? 'center' : 'left',
  },
  chatButton: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
  },
  chatButtonText: {
    color: '#7B68EE',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});