import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

interface ScreenWrapperProps {
  children: ReactNode;
}

export function ScreenWrapper({ children }: ScreenWrapperProps) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
});
