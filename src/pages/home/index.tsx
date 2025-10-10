import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Header } from '../../components/Header';
import { Banner } from '../../components/Banner';
import { FeaturedCarousel } from '../../components/FeaturedCarousel';
import { ParallaxScrollView } from '../../components/ParallaxScrollView';
import { SolarServices } from '../../components/SolarServices';
import { useNavigate } from 'react-router-dom';
import { NavigationProps } from '../../types/navigation';

const products = [
  {
    id: 1,
    title: 'Kit Solar Residencial',
    price: 12999.99,
    image: { 
      uri: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=60' 
    },
    category: 'Energia Solar',
  },
  {
    id: 2,
    title: 'Sistema Solar Industrial',
    price: 29999.99,
    image: { 
      uri: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&auto=format&fit=crop&q=60' 
    },
    category: 'Energia Solar',
  },
  {
    id: 3,
    title: 'Kit Manutenção Solar',
    price: 299.99,
    image: { 
      uri: 'https://www.portalsolar.com.br/_next/image?url=https%3A%2F%2Fportalsolar-images.s3.us-east-2.amazonaws.com%2Finstitucional-and-info-production%2Fimages%2F72446a59-d88c-4f29-98b2-b0a9733269a3%2Flimpeza-de-placas-solares.jpg&w=3840&q=100' 
    },
    category: 'Manutenção',
  },
];

export function HomePage() {
  const navigation = useNavigate();

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.mainContainer}>
        <ParallaxScrollView>
          <Header />
          <Banner onRequestQuote={() => navigation('/contact')} />
          <FeaturedCarousel products={products} />
          <SolarServices />
        </ParallaxScrollView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
});