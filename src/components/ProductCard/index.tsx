import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../types/navigation';

type ProductCardProps = {
  title: string;
  price: number;
  image: ImageSourcePropType;
  category: string;
};

export function ProductCard({ title, price, image, category }: ProductCardProps) {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={image}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price)}
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ProductDetails', {
            id: 1,
            title,
            price,
            image,
            category
          })}
        >
          <Text style={styles.buttonText}>Ler Sobre →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(123, 104, 238, 0.05)',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.2)',
    width: '100%',
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
        ':hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(123, 104, 238, 0.1)',
        },
      },
    }),
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: Platform.OS === 'web' ? 250 : 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryTag: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(10, 10, 31, 0.8)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.4)',
  },
  categoryText: {
    color: '#E6E6FA',
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 20 : 18,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 8,
  },
  price: {
    fontSize: Platform.OS === 'web' ? 24 : 20,
    fontWeight: 'bold',
    color: '#7B68EE',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    paddingVertical: Platform.OS === 'web' ? 14 : 12,
    paddingHorizontal: Platform.OS === 'web' ? 24 : 20,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
        ':hover': {
          backgroundColor: 'rgba(123, 104, 238, 0.2)',
          borderColor: 'rgba(123, 104, 238, 0.4)',
        },
      },
    }),
  },
  buttonText: {
    color: '#7B68EE',
    fontSize: Platform.OS === 'web' ? 16 : 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});