import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

type ProductCardProps = {
  title: string;
  price: number;
  image: ImageSourcePropType;
  category: string;
};

export function ProductCard({ title, price, image, category }: ProductCardProps) {
  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(price)}
        </Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Learn More →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0A1F',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#7B68EE',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
    width: 280,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#151530',
  },
  content: {
    padding: 20,
    gap: 12,
  },
  category: {
    color: '#7B68EE',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E6E6FA',
    textShadowColor: '#7B68EE',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B8B8E6',
  },
  button: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
  },
  buttonText: {
    color: '#7B68EE',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});