import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function useScreenTransition() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Animação de entrada (da direita para esquerda)
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      // Animação de saída (da esquerda para direita ao voltar)
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -30,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    };
  }, [fadeAnim, slideAnim]);

  return {
    animatedStyle: {
      opacity: fadeAnim,
      transform: [{ translateX: slideAnim }],
    },
  };
}