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
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    width: 280,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 20,
    gap: 8,
  },
  category: {
    color: '#FF4500',
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    backgroundColor: '#FF4500',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});