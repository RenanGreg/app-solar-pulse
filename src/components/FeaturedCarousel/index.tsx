import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
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
  const { width } = Dimensions.get('window');
  const ITEM_WIDTH = width * 0.8;
  const ITEM_HEIGHT = 350;

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <View style={styles.cardContainer}>
        <ProductCard {...item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={products}
        renderItem={renderItem}
        width={ITEM_WIDTH}
        height={ITEM_HEIGHT}
        style={{ width: '100%' }}
        loop={false}
        pagingEnabled={true}
        snapEnabled={true}
        mode="horizontal-stack"
        modeConfig={{
          snapDirection: 'left',
          stackInterval: 18,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  carousel: {
    flexGrow: 0,
  },
  content: {
    paddingHorizontal: 20,
  },
  cardContainer: {
    paddingHorizontal: 10,
  },
});