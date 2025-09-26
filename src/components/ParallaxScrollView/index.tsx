import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle, ScrollView, View } from 'react-native';

type ParallaxScrollViewProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function ParallaxScrollView({ children, style }: ParallaxScrollViewProps) {
  return (
    <ScrollView
      style={[styles.scrollView, style]}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={styles.content}>
        {children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});