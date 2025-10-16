import { Platform } from 'react-native';
import { Easing } from 'react-native';

// Configurações para prevenir flash branco durante navegação
export const navigationConfig = {
  // Tempo de transição mais suave
  transitionDuration: 400,
  
  // Cor de fundo padrão
  backgroundColor: '#0A0A1F',
  
  // Tipo de animação baseado na plataforma
  animationType: Platform.select({
    ios: 'slide_from_right',
    android: 'slide_from_right',
    default: 'slide_from_right',
  }),
  
  // Prevenir flash branco
  preventFlash: true,
  
  // Configurações de gestos
  gestureConfig: {
    enabled: true,
    direction: 'horizontal' as const,
    fullScreenEnabled: true,
  },
  
  // Easing customizado para transições ultra suaves
  easingConfig: {
    enter: Easing.bezier(0.25, 0.1, 0.25, 1),
    exit: Easing.bezier(0.25, 0.1, 0.25, 1),
  },
};

// Estilos globais para navegação
export const globalNavigationStyles = {
  flex: 1,
  backgroundColor: '#0A0A1F',
};

// Configurações de animação suave
export const smoothTransitionConfig = {
  animation: 'spring',
  config: {
    stiffness: 100,
    damping: 20,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
