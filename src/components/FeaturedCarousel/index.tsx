import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ProductCard } from '../ProductCard';

const { width: screenWidth } = Dimensions.get('window');

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
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.carouselItem}>
      <ProductCard
        title={item.title}
        price={item.price}
        image={item.image}
        category={item.category}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={products}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.8}
        layout="default"
        loop
        autoplay
        autoplayInterval={3000}
        enableMomentum={false}
        lockScrollWhileSnapping
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  carouselItem: {
    padding: 10,
  },
});