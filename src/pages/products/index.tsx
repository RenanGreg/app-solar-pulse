import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Animated, Platform } from 'react-native';
import { useScreenTransition } from '../../hooks/useScreenTransition';
import { Header } from '../../components/Header';
import { FeaturedCarousel } from '../../components/FeaturedCarousel';
import { ParallaxScrollView } from '../../components/ParallaxScrollView';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { wp, hp, responsiveFontSize, spacing } from '../../utils/responsive';

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
      uri: 'https://energiawise.com.br/wp-content/uploads/2018/02/energia-solar-apartamento-energia-wise.jpg' 
    },
    category: 'Energia Solar',
  },
  {
    id: 6,
    title: 'Sistema Off-Grid Completo',
    price: 24999.99,
    image: { 
      uri:  'https://solardospomares.com.br/wp-content/uploads/2024/12/sistema-fotovoltaico-off-grid-1024x585.jpg' 
    },
    category: 'Energia Solar',
  },
  {
    id: 7,
    title: 'Inversor Solar',
    price: 4999.99,
    image: { 
      uri: 'https://blog.solarpowerenergy.com.br/wp-content/uploads/2022/03/inversor-solar.png' 
    },
    category: 'Equipamentos',
  },
  {
    id: 8,
    title: 'Bateria Solar',
    price: 7999.99,
    image: { 
      uri: 'https://ixymyhazbhztpjnlxmbd.supabase.co/storage/v1/object/images/generated/baterias-solares-modulares-363.webp' 
    },
    category: 'Equipamentos',
  },
  {
    id: 9,
    title: 'Painel Solar 550W',
    price: 899.99,
    image: { 
      uri: 'https://rentel.com.br/wp-content/uploads/2020/11/banner_PAINELSOLAR-OQUE-VOCEPRECISASABER_post.jpg'
    },
    category: 'Equipamentos',
  },
  {
    id: 10,
    title: 'Controlador de Carga MPPT',
    price: 1299.99,
    image: { 
      uri: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=60' 
    },
    category: 'Equipamentos',
  },
  {
    id: 11,
    title: 'String Box para Proteção',
    price: 699.99,
    image: { 
      uri: 'https://static.wixstatic.com/media/35e5b9_8f9f6795778c4b878349d840f9c10914~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg'
    },
    category: 'Equipamentos',
  },
  {
    id: 12,
    title: 'Cabo Solar 6mm',
    price: 149.99,
    image: { 
      uri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60' 
    },
    category: 'Acessórios',
  },
  {
    id: 13,
    title: 'Conectores MC4',
    price: 89.99,
    image: { 
      uri: 'https://www.cambioenergetico.com/wp-content/uploads/Detalle-conexion-paneles-MC4-Staubli.jpg'
    },
    category: 'Acessórios',
  },
  {
    id: 14,
    title: 'Estrutura de Fixação',
    price: 599.99,
    image: { 
      uri: 'https://hccenergiasolar.com.br/wp-content/uploads/2022/08/tipos-de-painel-solare-1.jpeg'
    },
    category: 'Acessórios',
  },
  {
    id: 15,
    title: 'Microinversor Grid-Tie',
    price: 2499.99,
    image: { 
      uri: 'https://www.neosolar.com.br/media/wysiwyg/microinversor_energia_solar.jpg'
    },
    category: 'Equipamentos',
  },
  {
    id: 16,
    title: 'Kit Monitoramento Wi-Fi',
    price: 499.99,
    image: { 
      uri: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=60' 
    },
    category: 'Acessórios',
  },
  {
    id: 17,
    title: 'Disjuntor DC Bipolar',
    price: 249.99,
    image: { 
      uri: 'https://www.aforenergy.com/wp-content/uploads/2025/02/6-4.webp'
    },
    category: 'Equipamentos',
  },
  {
    id: 18,
    title: 'Kit Ferramenta Solar',
    price: 349.99,
    image: { 
      uri: 'https://www.aldo.com.br/blog/wp-content/uploads/2020/05/ferramentas-para-energia-solar-.jpg'
    },
    category: 'Ferramentas',
  },
  {
    id: 19,
    title: 'Multímetro Digital Solar',
    price: 189.99,
    image: { 
      uri: 'https://www.forcaeluz.eng.br/wp-content/uploads/2024/11/D_NQ_NP_2X_678740-MLB76410879756_052024-F.webp' 
    },
    category: 'Ferramentas',
  },
  {
    id: 20,
    title: 'Alicate Crimpador MC4',
    price: 129.99,
    image: { 
      uri: 'https://i.ytimg.com/vi/JC6IdwpW15Y/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgVChYMA8=&rs=AOn4CLCM3qiVup5VPaJ_Nw3ormkMn_otFA'
    },
    category: 'Ferramentas',
  },
  {
    id: 21,
    title: 'Kit Aterramento Solar',
    price: 279.99,
    image: { 
      uri: 'https://solarvolt.com.br/wp-content/uploads/2021/04/aterramento.jpg'
    },
    category: 'Acessórios',
  },
  {
    id: 22,
    title: 'Nobreak Solar 1500VA',
    price: 3499.99,
    image: { 
      uri: 'https://investsustain.com.br/wp-content/uploads/2024/05/casa-que-nunca-desliga-solucao-economica-e-o-nobreak-com-placa-solar-ac300-bluetti-invest-sustain-energia-solar-capa-web-stories-2.png'
    },
    category: 'Equipamentos',
  },
  {
    id: 23,
    title: 'Protetor de Surto DPS',
    price: 199.99,
    image: { 
      uri: 'https://http2.mlstatic.com/D_NQ_NP_728465-MLB84126538714_052025-O.webp'
    },
    category: 'Equipamentos',
  },
  {
    id: 24,
    title: 'Kit Limpeza Painéis',
    price: 159.99,
    image: { 
      uri: 'https://karchercenteraltex.fbitsstatic.net/img/p/kit-limpeza-de-painel-solar-karcher-is-70-40-122172/308844-1.jpg?w=1000&h=1000&v=no-value'
    },
    category: 'Manutenção',
  }
];

export function ProductsPage() {
  const navigation = useNavigation<NavigationProps>();
  const { animatedStyle } = useScreenTransition();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  // Organizar produtos por categoria
  const categories = ['Todos', 'Energia Solar', 'Equipamentos', 'Acessórios', 'Ferramentas', 'Manutenção'];
  
  const getProductsByCategory = (category: string) => {
    if (category === 'Todos') return products;
    return products.filter(product => product.category === category);
  };

  const filteredProducts = getProductsByCategory(selectedCategory);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.header}>
        <Header />
      </View>
      <ParallaxScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Nossos Produtos</Text>
          <Text style={styles.subtitle}>
            Conheça nossa linha completa de soluções em energia solar
          </Text>
          
          {/* Tabs de Categorias */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryTab,
                  selectedCategory === category && styles.categoryTabActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Contador de produtos */}
          <Text style={styles.productCount}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
          </Text>

          {/* Carrossel de produtos filtrados */}
          {filteredProducts.length > 0 ? (
            <FeaturedCarousel key={selectedCategory} products={filteredProducts} />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>😕</Text>
              <Text style={styles.emptyStateTitle}>Nenhum produto encontrado</Text>
              <Text style={styles.emptyStateSubtitle}>
                Tente selecionar outra categoria
              </Text>
            </View>
          )}
        </View>
      </ParallaxScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
  header: {
    position: 'relative',
    zIndex: 1000,
    elevation: 5,
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
  categoriesContainer: {
    marginBottom: 20,
    flexGrow: 0,
  },
  categoriesContent: {
    paddingHorizontal: 4,
    gap: 12,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    marginRight: 12,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      },
    }),
  },
  categoryTabActive: {
    backgroundColor: '#7B68EE',
    borderColor: '#7B68EE',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(123, 104, 238, 0.4)',
      },
    }),
  },
  categoryText: {
    color: '#B8B8E6',
    fontSize: Platform.OS === 'web' ? 16 : 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  productCount: {
    color: '#B8B8E6',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#B8B8E6',
    textAlign: 'center',
  },
});