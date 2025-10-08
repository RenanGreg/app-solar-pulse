import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ProductCard } from '../ProductCard';

type Product = {
  id: number;
  title: string;
  price: number;
  image: any;
  category: string;
};

type FeaturedCarouselProps = {
  products: Product[];
};

type CarouselInstance = {
  scrollTo: (options: { x: number; animated?: boolean }) => void;
};

export const FeaturedCarousel = forwardRef<CarouselInstance, FeaturedCarouselProps>(
  ({ products }, ref) => {
    const { width } = Dimensions.get('window');
    const ITEM_WIDTH = width * 0.8;
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useImperativeHandle(ref, () => ({
      scrollTo: (options) => scrollViewRef.current?.scrollTo(options),
    }));

    const handleScroll = (event: any) => {
      const contentOffset = event.nativeEvent.contentOffset.x;
      const index = Math.round(contentOffset / (ITEM_WIDTH + 20));
      setCurrentIndex(index);
    };

    return (
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          snapToInterval={ITEM_WIDTH + 20}
          decelerationRate="fast"
          snapToAlignment="center"
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {products.map((product) => (
            <View key={product.id} style={[styles.cardContainer, { width: ITEM_WIDTH }]}>
              <ProductCard {...product} />
            </View>
          ))}
        </ScrollView>
        
        <View style={styles.pagination}>
          {products.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentIndex === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
        
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
            onPress={() => {
              if (currentIndex > 0) {
                scrollViewRef.current?.scrollTo({
                  x: (ITEM_WIDTH + 20) * (currentIndex - 1),
                  animated: true,
                });
              }
            }}
            disabled={currentIndex === 0}
          >
            <Text style={styles.navButtonText}>←</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.navButton,
              currentIndex === products.length - 1 && styles.navButtonDisabled,
            ]}
            onPress={() => {
              if (currentIndex < products.length - 1) {
                scrollViewRef.current?.scrollTo({
                  x: (ITEM_WIDTH + 20) * (currentIndex + 1),
                  animated: true,
                });
              }
            }}
            disabled={currentIndex === products.length - 1}
          >
            <Text style={styles.navButtonText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    backgroundColor: '#0A0A1F',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  cardContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(123, 104, 238, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
  },
  paginationDotActive: {
    backgroundColor: '#7B68EE',
    width: 24,
    shadowColor: '#7B68EE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    gap: 24,
  },
  navButton: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    shadowColor: '#7B68EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  navButtonDisabled: {
    backgroundColor: 'rgba(123, 104, 238, 0.05)',
    borderColor: 'rgba(123, 104, 238, 0.1)',
  },
  navButtonText: {
    color: '#7B68EE',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: '#7B68EE',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});