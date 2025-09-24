import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Header } from './src/components/Header';
import { Banner } from './src/components/Banner';
import { FeaturedCarousel } from './src/components/FeaturedCarousel';
import { ParallaxScrollView } from './src/components/ParallaxScrollView';
import { ProductSkeleton } from './src/components/ProductSkeleton';

const products = [
  {
    id: 1,
    title: 'Atlas Humanoid Robot',
    price: 299999.99,
    image: 'https://example.com/atlas-robot.jpg',
    category: 'Robots',
  },
  {
    id: 2,
    title: 'Solar Power Station',
    price: 149999.99,
    image: 'https://example.com/solar-station.jpg',
    category: 'Energy',
  },
  {
    id: 3,
    title: 'Electric Hypercar',
    price: 899999.99,
    image: 'https://example.com/electric-car.jpg',
    category: 'Vehicles',
  },
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular tempo de carregamento
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header />
      
      <ParallaxScrollView style={styles.content}>
        <Banner />
        {isLoading ? (
          <View style={styles.skeletonContainer}>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </View>
        ) : (
          <FeaturedCarousel products={products} />
        )}
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  skeletonContainer: {
    paddingVertical: 20,
    gap: 20,
    alignItems: 'center',
  },
});
