import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export function useScreenTransition() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.98)).current;

  useEffect(() => {
    // Animação de entrada ultra suave com múltiplas camadas
    Animated.parallel([
      // Fade in suave
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Easing bezier suave
        useNativeDriver: true,
      }),
      // Slide da direita para esquerda
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true,
      }),
      // Leve zoom in para dar sensação de profundidade
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
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