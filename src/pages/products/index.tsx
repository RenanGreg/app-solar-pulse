import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Header } from '../../components/Header';
import { FeaturedCarousel } from '../../components/FeaturedCarousel';
import { ParallaxScrollView } from '../../components/ParallaxScrollView';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';

const products = [
  {
    id: 1,
    title: 'Kit Solar Residencial',
    price: 12999.99,
    image: { 
      uri: 'https://thonilitsz.arq.br/wp-content/uploads/2017/05/20141217100744488.jpg' 
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
      uri: 'https://www.aldo.com.br/blog/wp-content/uploads/2019/05/244100-manutencao-de-sistema-de-energia-solar-como-otimizar-esse-servico.jpg' 
    },
    category: 'Manutenção',
  },
  {
    id: 4,
    title: 'Kit Solar Rural',
    price: 15999.99,
    image: { 
      uri: 'https://fortifol.siterapido.rs/wp-content/uploads/sites/59/2022/10/conheca-a-usina-que-gera-energia-solar-em-meio-a-producao-rural-meio-rural-atinge-bons-resultados-na-utilizacao-de-energia-solar.jpg'  
    },
    category: 'Energia Solar',
  },
  {
    id: 5,
    title: 'Kit Solar Apartamento',
    price: 8999.99,
    image: { 
      uri: 'https://www.northsun.com.br/wp-content/uploads/marquise-solar-400x225.jpg' 
    },
    category: 'Energia Solar',
  },
  {
    id: 6,
    title: 'Sistema Off-Grid Completo',
    price: 24999.99,
    image: { 
      uri:  'https://solardospomares.com.br/wp-content/uploads/2024/12/Qual-Melhor-bateria-de-litio-off-grid-1024x585.jpg' 
    },
    category: 'Energia Solar',
  },
  {
    id: 7,
    title: 'Kit Inversor Premium',
    price: 4999.99,
    image: { 
      uri: 'https://acdn-us.mitiendanube.com/stores/003/582/147/products/3-d9d32397222ba454fd17298869866251-1024-1024.jpg'
    },
    category: 'Equipamentos',
  },
  {
    id: 8,
    title: 'Bateria Solar 5kWh',
    price: 7999.99,
    image: { 
      uri: 'https://www.aforenergy.com/wp-content/uploads/2025/04/4-1.webp' 
    },
    category: 'Equipamentos',
  }
];

export function ProductsPage() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <ParallaxScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Header />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Nossos Produtos</Text>
          <Text style={styles.subtitle}>
            Conheça nossa linha completa de soluções em energia solar
          </Text>
          <FeaturedCarousel products={products} />
        </View>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
  header: {
    position: 'relative',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    //top: Platform.OS === 'ios' ? 60 : 20,
    left: 20,
    zIndex: 2,
    backgroundColor: 'rgba(123, 104, 238, 0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E6E6FA',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#B8B8E6',
    textAlign: 'center',
    marginBottom: 32,
  },
});