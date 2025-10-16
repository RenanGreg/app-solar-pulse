import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Hook de transição com animação spring para movimento mais natural
 */
export function useSpringTransition() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    // Animação com spring para movimento mais orgânico
    Animated.parallel([
      // Fade com spring suave
      Animated.spring(fadeAnim, {
        toValue: 1,
        friction: 10,
        tension: 40,
        useNativeDriver: true,
      }),
      // Slide com spring
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 10,
        tension: 40,
        useNativeDriver: true,
      }),
      // Scale com spring suave
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 10,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim]);

  return {
    animatedStyle: {
      opacity: fadeAnim,
      transform: [
        { translateX: slideAnim },
        { scale: scaleAnim },
      ],
      backgroundColor: '#0A0A1F',
    },
  };
}
