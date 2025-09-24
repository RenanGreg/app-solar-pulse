import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, withDelay } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export function Banner() {
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(50);
  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(30);
  const buttonScale = useSharedValue(0.8);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    titleOpacity.value = withDelay(300, withTiming(1, { duration: 1000 }));
    titleTranslateY.value = withDelay(300, withSpring(0));
    subtitleOpacity.value = withDelay(600, withTiming(1, { duration: 1000 }));
    subtitleTranslateY.value = withDelay(600, withSpring(0));
    buttonScale.value = withDelay(900, withSpring(1));
    buttonOpacity.value = withDelay(900, withTiming(1, { duration: 800 }));
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.tag}>Purpose</Text>
        
        <Animated.Text style={[styles.title, titleStyle]}>
          Atlas: Where Code{"\n"}Meets Motion
        </Animated.Text>

        <Animated.Text style={[styles.subtitle, subtitleStyle]}>
          The humanoid companion that learns and adapts alongside you.
        </Animated.Text>
        
        <Animated.View style={buttonStyle}>
          <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Request Access →</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#FFF5F1',
    padding: 40,
    minHeight: 400,
  },
  content: {
    maxWidth: 600,
    gap: 20,
  },
  tag: {
    backgroundColor: '#FFE4D6',
    color: '#FF4500',
    padding: 8,
    borderRadius: 20,
    fontSize: 14,
    width: 'auto',
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#FF4500',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignSelf: 'flex-start',
    shadowColor: '#FF4500',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});