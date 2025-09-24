import React, { ReactNode, useRef } from 'react';
import { StyleSheet, ViewStyle, Animated } from 'react-native';

type ParallaxScrollViewProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function ParallaxScrollView({ children, style }: ParallaxScrollViewProps) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const animatedStyle = {
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [0, 200],
          outputRange: [0, -100],
          extrapolate: 'clamp',
        }),
      },
      {
        scale: scrollY.interpolate({
          inputRange: [0, 200],
          outputRange: [1, 0.9],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0.8],
      extrapolate: 'clamp',
    }),
  };

  return (
    <Animated.ScrollView
      style={[styles.scrollView, style]}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <Animated.View style={[styles.content, animatedStyle]}>
        {children}
      </Animated.View>
    </Animated.ScrollView>
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