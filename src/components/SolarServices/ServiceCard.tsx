import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Animated, Image } from 'react-native';
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
  image?: string;
};

export function ServiceCard({ 
  title, 
  description, 
  price, 
  features, 
  icon = 'solar-panel', 
  accentColor = '#7B68EE',
  image
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
      {image && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: image }} 
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
        </View>
      )}
      <View style={styles.titleRow}>
        <View style={[styles.iconContainer, { backgroundColor: `${accentColor}20` }]}>
          <Animated.View style={{ transform: [{ scale: iconScaleAnim }] }}>
            <MaterialCommunityIcons name={icon as any} size={28} color={accentColor} />
          </Animated.View>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
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
        onPress={() => navigation.navigate('Budget')}
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
    paddingTop: 220,
    paddingHorizontal: Platform.OS === 'web' ? 36 : 28,
    paddingBottom: Platform.OS === 'web' ? 36 : 28,
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
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    overflow: 'hidden',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1a1a2e',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 10, 31, 0.15)',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 28 : 24,
    fontWeight: 'bold',
    color: '#E6E6FA',
    flex: 1,
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
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});