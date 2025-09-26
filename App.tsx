import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Header } from './src/components/Header';
import { Banner } from './src/components/Banner';
import { FeaturedCarousel } from './src/components/FeaturedCarousel';
import { ParallaxScrollView } from './src/components/ParallaxScrollView';
import { ProductSkeleton } from './src/components/ProductSkeleton';

const placeholderImage = { uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEXMzMyWlpacnJyqqqrFxcWxsbGjo6O3t7e+vr6He3KoAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQ4jWNgQAX8//+/AYhLSIqKGBYWFhYwgFEQuUAxYwYGhkVAQWGhQWGhQWGhQWGhQWGRwgAA5eRKp9REX4QAAAAASUVORK5CYII=' };

const products = [
  {
    id: 1,
    title: 'Atlas Humanoid Robot',
    price: 299999.99,
    image: placeholderImage,
    category: 'Robots',
  },
  {
    id: 2,
    title: 'Solar Power Station',
    price: 149999.99,
    image: placeholderImage,
    category: 'Energy',
  },
  {
    id: 3,
    title: 'Electric Hypercar',
    price: 899999.99,
    image: placeholderImage,
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

  // Wrap with GestureHandlerRootView on mobile, use View on web
  const Container = Platform.OS === 'web' ? View : GestureHandlerRootView;
  const SkeletonContainer = Platform.OS === 'web' ? View : GestureHandlerRootView;

  return (
    <Container style={styles.container}>
      <StatusBar style="light" />
      <Header />
      
      <ParallaxScrollView style={styles.content}>
        <Banner />
        {isLoading ? (
          <SkeletonContainer style={styles.skeletonContainer}>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </SkeletonContainer>
        ) : (
          <FeaturedCarousel products={products} />
        )}
      </ParallaxScrollView>
    </Container>
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
