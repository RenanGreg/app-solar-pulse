import React from 'react';
import { View, StyleSheet } from 'react-native';

export function ProductSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.image} />
      <View style={styles.content}>
        <View style={styles.title} />
        <View style={styles.price} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    overflow: 'hidden',
    width: 280,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
  },
  content: {
    padding: 16,
    gap: 8,
  },
  title: {
    width: '80%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  price: {
    width: '40%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});