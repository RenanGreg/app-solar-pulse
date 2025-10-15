import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform } from 'react-native';
import { Header } from '../../components/Header';
import { SolarServices } from '../../components/SolarServices';
import { InstallationProcess } from '../../components/InstallationProcess';
import { ParallaxScrollView } from '../../components/ParallaxScrollView';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';

export function ServicesPage() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <ParallaxScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Header />
        </View>
        <SolarServices />
        <InstallationProcess />
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
  header: {
    position: 'relative',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20,
    left: 20,
    zIndex: 2,
    backgroundColor: 'rgba(123, 104, 238, 0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});