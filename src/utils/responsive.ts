import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Largura base de design (pode ser ajustada conforme seu design base)
const baseWidth = 375; // iPhone 8 como base
const baseHeight = 667;

// Fator de escala baseado na densidade de pixels
const pixelRatio = PixelRatio.get();

// Calculando a escala para largura e altura
const widthScale = SCREEN_WIDTH / baseWidth;
const heightScale = SCREEN_HEIGHT / baseHeight;

export const metrics = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  pixelRatio: pixelRatio,
};

/**
 * Converte um valor de design para pixels responsivos horizontalmente
 * @param size - Tamanho no design
 */
export function wp(size: number): number {
  const newSize = size * widthScale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

/**
 * Converte um valor de design para pixels responsivos verticalmente
 * @param size - Tamanho no design
 */
export function hp(size: number): number {
  const newSize = size * heightScale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

/**
 * Ajusta o tamanho da fonte baseado na densidade de pixels
 * @param size - Tamanho da fonte no design
 */
export function responsiveFontSize(size: number): number {
  const scale = Math.min(widthScale, heightScale);
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

/**
 * Ajusta padding/margin baseado na densidade de pixels
 * @param size - Tamanho do espaçamento no design
 */
export function spacing(size: number): number {
  const scale = Math.min(widthScale, heightScale);
  return Math.round(size * scale);
}

// Listener para mudanças de orientação
Dimensions.addEventListener('change', () => {
  const { width, height } = Dimensions.get('window');
  metrics.screenWidth = width;
  metrics.screenHeight = height;
});