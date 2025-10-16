import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useScreenTransition } from '../../hooks/useScreenTransition';
import { Header } from '../../components/Header';
import { Banner } from '../../components/Banner';
import { FeaturedCarousel } from '../../components/FeaturedCarousel';
import { ParallaxScrollView } from '../../components/ParallaxScrollView';
import { SolarServices } from '../../components/SolarServices';
import { InstallationProcess } from '../../components/InstallationProcess';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';

const products = [{
  id: 1,
  title: 'Kit Solar Residencial',
  price: 12999.99,
  image: { uri: 'https://thonilitsz.arq.br/wp-content/uploads/2017/05/20141217100744488.jpg' },
  category: 'Energia Solar'
}, {
  id: 2,
  title: 'Sistema Solar Industrial',
  price: 29999.99,
  image: { uri: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&auto=format&fit=crop&q=60' },
  category: 'Energia Solar'
}, {
  id: 3,
  title: 'Kit Manutenção Solar',
  price: 299.99,
  image: { uri: 'https://www.aldo.com.br/blog/wp-content/uploads/2019/05/244100-manutencao-de-sistema-de-energia-solar-como-otimizar-esse-servico.jpg' },
  category: 'Manutenção'
}, {
  id: 4,
  title: 'Kit Solar Rural',
  price: 18999.99,
  image: { uri: 'https://fortifol.siterapido.rs/wp-content/uploads/sites/59/2022/10/conheca-a-usina-que-gera-energia-solar-em-meio-a-producao-rural-meio-rural-atinge-bons-resultados-na-utilizacao-de-energia-solar.jpg' },
  category: 'Energia Solar Rural'
}, {
  id: 5,
  title: 'Kit Solar Apartamento',
  price: 15999.99,
  image: { uri: 'https://energiawise.com.br/wp-content/uploads/2018/02/energia-solar-apartamento-energia-wise.jpg' },
  category: 'Energia Solar Residencial'
}, 



];

export function HomePage() {
  const navigation = useNavigation<NavigationProps>();
  const { animatedStyle } = useScreenTransition();

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.View style={[styles.mainContainer, animatedStyle]}>
        <ParallaxScrollView>
          <Header />
          <Banner onRequestQuote={() => navigation.navigate('Contact')} />
          <FeaturedCarousel products={products} />
          <SolarServices />
          <InstallationProcess />
        </ParallaxScrollView>
      </Animated.View>
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