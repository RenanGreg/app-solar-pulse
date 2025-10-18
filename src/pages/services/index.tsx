import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform, Animated } from 'react-native';
import { useScreenTransition } from '../../hooks/useScreenTransition';
import { Header } from '../../components/Header';
import { SolarServices } from '../../components/SolarServices';
import { InstallationProcess } from '../../components/InstallationProcess';
import { ParallaxScrollView } from '../../components/ParallaxScrollView';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';

export function ServicesPage() {
  const navigation = useNavigation<NavigationProps>();
  const { animatedStyle } = useScreenTransition();

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.header}>
        <Header />
      </View>
      <ParallaxScrollView>
        <SolarServices />
        <InstallationProcess />
      </ParallaxScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
  header: {
    position: 'relative',
    zIndex: 1000,
    elevation: 5,
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