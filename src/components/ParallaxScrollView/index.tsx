import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

type ParallaxScrollViewProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function ParallaxScrollView({ children, style }: ParallaxScrollViewProps) {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 200],
      [0, -100],
      'clamp'
    );

    const scale = interpolate(
      scrollY.value,
      [0, 200],
      [1, 0.9],
      'clamp'
    );

    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0.8],
      'clamp'
    );

    return {
      transform: [
        { translateY },
        { scale },
      ],
      opacity,
    };
  });

  return (
    <Animated.ScrollView
      style={[styles.scrollView, style]}
      onScroll={scrollHandler}
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