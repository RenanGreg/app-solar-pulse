/**
 * Configurações de Transição Suave
 * 
 * Este arquivo contém as melhores práticas e configurações para
 * transições suaves e fluidas na navegação entre telas.
 */

import { Easing } from 'react-native';

// ==========================================
// TIMINGS OTIMIZADOS
// ==========================================

export const TRANSITION_TIMINGS = {
  // Entrada de tela (mais suave e lenta)
  ENTER: 400,
  
  // Saída de tela (mais rápida)
  EXIT: 300,
  
  // Gestos (responsivo)
  GESTURE: 350,
};

// ==========================================
// EASING CURVES - ULTRA SUAVE
// ==========================================

export const EASING_CURVES = {
  // Bezier personalizado - transição mais suave possível
  smooth: Easing.bezier(0.25, 0.1, 0.25, 1),
  
  // Ease out - desaceleração suave
  easeOut: Easing.bezier(0.0, 0.0, 0.2, 1),
  
  // Ease in out - aceleração e desaceleração balanceadas
  easeInOut: Easing.bezier(0.4, 0.0, 0.2, 1),
  
  // Material design - padrão do Google
  material: Easing.bezier(0.4, 0.0, 0.6, 1),
};

// ==========================================
// SPRING CONFIGURATIONS
// ==========================================

export const SPRING_CONFIGS = {
  // Spring suave - movimento natural
  smooth: {
    friction: 10,
    tension: 40,
  },
  
  // Spring bouncy - com leve bounce
  bouncy: {
    friction: 8,
    tension: 50,
  },
  
  // Spring rápido - mais responsivo
  fast: {
    friction: 12,
    tension: 60,
  },
};

// ==========================================
// ANIMATION VALUES
// ==========================================

export const ANIMATION_VALUES = {
  // Valores de slide (em pixels)
  slide: {
    enter: 30,    // Começa 30px à direita
    exit: -30,    // Sai 30px à esquerda
  },
  
  // Valores de scale
  scale: {
    enter: 0.98,  // Começa 98% do tamanho
    normal: 1,    // Tamanho normal
  },
  
  // Valores de opacity
  opacity: {
    hidden: 0,    // Invisível
    visible: 1,   // Visível
  },
};

// ==========================================
// RECOMENDAÇÕES
// ==========================================

/**
 * MELHOR CONFIGURAÇÃO PARA TRANSIÇÕES SUAVES:
 * 
 * 1. Use animationDuration: 350-400ms para entrada
 * 2. Use Easing.bezier(0.25, 0.1, 0.25, 1) para curva suave
 * 3. Combine slide + fade + scale para profundidade
 * 4. Mantenha backgroundColor consistente (#0A0A1F)
 * 5. Use spring para movimento mais natural
 * 
 * EVITE:
 * - Durações muito curtas (<250ms) = movimento brusco
 * - Durações muito longas (>500ms) = lentidão
 * - Múltiplas animações conflitantes
 * - Mudanças bruscas de opacidade
 */
