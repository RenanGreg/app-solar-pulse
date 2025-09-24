import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export function ProductSkeleton() {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.image, animatedStyle]} />
      <View style={styles.content}>
        <Animated.View style={[styles.categoryTag, animatedStyle]} />
        <Animated.View style={[styles.title, animatedStyle]} />
        <Animated.View style={[styles.price, animatedStyle]} />
        <Animated.View style={[styles.button, animatedStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    width: width * 0.8,
    maxWidth: 400,
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 20,
    gap: 12,
  },
  categoryTag: {
    width: 80,
    height: 24,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  title: {
    width: '80%',
    height: 24,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    marginTop: 8,
  },
  price: {
    width: '40%',
    height: 32,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    marginTop: 8,
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    marginTop: 16,
  },
});