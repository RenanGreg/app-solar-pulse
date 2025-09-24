import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ProductCard } from '../ProductCard';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

type FeaturedCarouselProps = {
  products: Product[];
};

export function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
        decelerationRate="fast"
        snapToInterval={300}
        snapToAlignment="center"
      >
        {products.map((product) => (
          <View key={product.id} style={styles.cardContainer}>
            <ProductCard {...product} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  content: {
    paddingHorizontal: 20,
    gap: 20,
  },
  cardContainer: {
    marginRight: 20,
  },
});