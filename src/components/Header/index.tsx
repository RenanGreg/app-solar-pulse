import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, RootStackParamList } from '../../types/navigation';
import type { RouteProp } from '@react-navigation/native';
import { wp, hp, responsiveFontSize, spacing } from '../../utils/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export function Header() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList>>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const insets = useSafeAreaInsets();
  
  const isHomeScreen = route.name === 'Home';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={[
      styles.container,
      {
        paddingTop: insets.top,
        paddingBottom: spacing(8),
        marginBottom: spacing(8)
      }
    ]}>
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
        {!isHomeScreen && (
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => {
              navigation.goBack();
              setIsMenuOpen(false);
            }}
          >
            <Text style={styles.navText}>← Voltar</Text>
          </TouchableOpacity>
        )}
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
          onPress={() => {
            navigation.navigate('Products');
            setIsMenuOpen(false);
          }}
        >
          <Text style={styles.navText}>Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => {
            navigation.navigate('Services');
            setIsMenuOpen(false);
          }}
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
        <TouchableOpacity 
          style={[styles.navItem, styles.budgetButton]} 
          onPress={() => {
            navigation.navigate('Budget');
            setIsMenuOpen(false);
          }}
        >
          <Text style={styles.budgetButtonText}>📝 Orçamento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(10, 10, 31, 0.95)',
    paddingTop: Platform.OS === 'web' ? spacing(16) : 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(123, 104, 238, 0.2)',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing(20),
    paddingBottom: spacing(16),
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold',
    color: '#E6E6FA',
  },
  menuButton: {
    display: Platform.OS === 'web' && width > 768 ? 'none' : 'flex',
    padding: spacing(8),
  },
  menuIcon: {
    fontSize: responsiveFontSize(24),
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
    gap: spacing(8),
    paddingHorizontal: spacing(20),
    paddingBottom: Platform.OS === 'web' ? 0 : spacing(16),
  },
  navWeb: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: spacing(16),
  },
  navOpen: {
    display: 'flex',
    paddingBottom: spacing(16),
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
    paddingVertical: spacing(8),
    paddingHorizontal: spacing(16),
    borderRadius: wp(20),
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
      },
    }),
  },
  navText: {
    color: '#E6E6FA',
    fontSize: responsiveFontSize(16),
    textAlign: Platform.OS === 'web' && width <= 768 ? 'center' : 'left',
  },
  chatButton: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
  },
  chatButtonText: {
    color: '#7B68EE',
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    textAlign: 'center',
  },
  budgetButton: {
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(46, 204, 113, 0.3)',
  },
  budgetButtonText: {
    color: '#2ecc71',
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    textAlign: 'center',
  },
});