import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../types/navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ServiceCardProps = {
  title: string;
  description: string;
  price: string;
  features: string[];
  icon?: string;
  accentColor?: string;
};

export function ServiceCard({ 
  title, 
  description, 
  price, 
  features, 
  icon = 'solar-panel', 
  accentColor = '#7B68EE' 
}: ServiceCardProps) {
  const navigation = useNavigation<NavigationProps>();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const iconScaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(iconScaleAnim, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(iconScaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]);

    Animated.loop(pulseAnimation).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      <View style={[styles.iconContainer, { backgroundColor: `${accentColor}20` }]}>
        <Animated.View style={{ transform: [{ scale: iconScaleAnim }] }}>
          <MaterialCommunityIcons name={icon as any} size={32} color={accentColor} />
        </Animated.View>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={[styles.price, { color: accentColor }]}>{price}</Text>
      <View style={styles.featuresList}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <MaterialCommunityIcons 
              name="check-circle" 
              size={20} 
              color={accentColor} 
              style={styles.featureIcon} 
            />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity 
        style={[styles.button, { borderColor: `${accentColor}40` }]}
        onPress={() => navigation.navigate('Contact')}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={[styles.buttonText, { color: accentColor }]}>
          Solicitar Orçamento
          <MaterialCommunityIcons name="arrow-right" size={16} />
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 24,
    padding: Platform.OS === 'web' ? 36 : 28,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    width: Platform.OS === 'web' ? '30%' : '100%',
    minWidth: Platform.OS === 'web' ? 320 : undefined,
    position: 'relative',
    overflow: 'hidden',
    ...(Platform.OS === 'web' ? {
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      ':hover': {
        transform: 'translateY(-8px)',
        backgroundColor: 'rgba(123, 104, 238, 0.12)',
        boxShadow: '0 20px 40px rgba(123, 104, 238, 0.15)',
        borderColor: 'rgba(123, 104, 238, 0.5)',
      },
    } : {}),
  },
  title: {
    fontSize: Platform.OS === 'web' ? 28 : 24,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 14,
  },
  description: {
    fontSize: Platform.OS === 'web' ? 17 : 15,
    color: '#B8B8E6',
    marginBottom: 20,
    lineHeight: Platform.OS === 'web' ? 26 : 22,
  },
  price: {
    fontSize: Platform.OS === 'web' ? 32 : 28,
    fontWeight: '800',
    color: '#7B68EE',
    marginBottom: 28,
  },
  featuresList: {
    marginBottom: 36,
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'rgba(123, 104, 238, 0.06)',
    padding: 12,
    borderRadius: 12,
    ...(Platform.OS === 'web' ? {
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: 'rgba(123, 104, 238, 0.1)',
        transform: 'translateX(5px)',
      },
    } : {}),
  },
  featureIcon: {
    color: '#7B68EE',
    fontSize: Platform.OS === 'web' ? 20 : 18,
    fontWeight: 'bold',
  },
  featureText: {
    color: '#B8B8E6',
    fontSize: Platform.OS === 'web' ? 16 : 15,
    fontWeight: '500',
  },
  button: {
    backgroundColor: 'rgba(123, 104, 238, 0.15)',
    paddingVertical: Platform.OS === 'web' ? 18 : 16,
    paddingHorizontal: Platform.OS === 'web' ? 36 : 28,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.4)',
    ...(Platform.OS === 'web' ? {
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      ':hover': {
        backgroundColor: 'rgba(123, 104, 238, 0.25)',
        borderColor: 'rgba(123, 104, 238, 0.6)',
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(123,104,238,0.2)',
      },
    } : {}),
  },
  buttonText: {
    color: '#7B68EE',
    fontSize: Platform.OS === 'web' ? 17 : 15,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});