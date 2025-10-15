import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, NavigationProps } from '../../types/navigation';
import { Header } from '../../components/Header';
import { ParallaxScrollView } from '../../components/ParallaxScrollView';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

const productDetails = {
  'Kit Solar Residencial': {
    description: 'O Kit Solar Residencial é uma solução completa para transformar sua casa em uma fonte de energia limpa e sustentável. Com painéis solares de alta eficiência e inversor de última geração, você pode reduzir significativamente sua conta de energia.',
    benefits: [
      'Economia de até 95% na conta de energia',
      'Instalação profissional incluída',
      'Garantia de 25 anos nos painéis',
      'Monitoramento via aplicativo',
      'Suporte técnico especializado'
    ],
    process: [
      'Análise de consumo e dimensionamento',
      'Projeto personalizado',
      'Aprovação da distribuidora',
      'Instalação em até 45 dias',
      'Homologação e ativação'
    ]
  },
  'Sistema Solar Industrial': {
    description: 'Sistema projetado para grandes demandas de energia, ideal para indústrias e empresas que buscam redução significativa nos custos operacionais. Oferece alta performance e retorno do investimento acelerado.',
    benefits: [
      'Redução expressiva nos custos de energia',
      'Sistema de alta potência',
      'Monitoramento em tempo real',
      'Manutenção preventiva',
      'Suporte técnico 24/7'
    ],
    process: [
      'Análise técnica detalhada',
      'Projeto de engenharia completo',
      'Aprovação e licenciamentos',
      'Instalação profissional',
      'Comissionamento e testes'
    ]
  },
  'Kit Manutenção Solar': {
    description: 'Kit completo para manutenção de sistemas solares, garantindo máxima eficiência e durabilidade do seu investimento. Inclui limpeza especializada, verificação de componentes e otimização de performance.',
    benefits: [
      'Aumento da eficiência do sistema',
      'Prevenção de problemas',
      'Limpeza profissional',
      'Relatório técnico detalhado',
      'Garantia de serviço'
    ],
    process: [
      'Inspeção visual detalhada',
      'Limpeza especializada dos painéis',
      'Verificação de conexões',
      'Testes de performance',
      'Relatório técnico'
    ]
  },
  'Kit Solar Rural': {
    description: 'Solução específica para propriedades rurais, desenvolvida para atender às necessidades do campo. Sistema robusto e eficiente, ideal para bombeamento de água e eletrificação rural.',
    benefits: [
      'Independência energética',
      'Sistema resistente',
      'Bombeamento solar incluso',
      'Adaptável a diferentes demandas',
      'Suporte técnico rural'
    ],
    process: [
      'Avaliação do terreno',
      'Projeto customizado',
      'Instalação especializada',
      'Testes de campo',
      'Treinamento operacional'
    ]
  },
  'Kit Solar Apartamento': {
    description: 'Kit desenvolvido especialmente para apartamentos, com soluções que respeitam as limitações de espaço e regras condominiais. Sistema compacto e eficiente para geração de energia em áreas urbanas.',
    benefits: [
      'Projeto adaptado para condomínios',
      'Instalação discreta',
      'Aprovação condominial garantida',
      'Sistema compacto',
      'Documentação completa'
    ],
    process: [
      'Avaliação técnica do local',
      'Aprovação do condomínio',
      'Projeto personalizado',
      'Instalação especializada',
      'Documentação e ativação'
    ]
  },
  'Sistema Off-Grid Completo': {
    description: 'Sistema completo para independência energética total, ideal para locais sem acesso à rede elétrica. Inclui painéis solares, baterias de alta capacidade e sistema de backup.',
    benefits: [
      'Independência total da rede',
      'Baterias de longa duração',
      'Sistema de backup automático',
      'Monitoramento 24/7',
      'Instalação completa'
    ],
    process: [
      'Análise de consumo',
      'Dimensionamento do banco de baterias',
      'Instalação do sistema',
      'Configuração do backup',
      'Testes e ativação'
    ]
  },
  'Kit Inversor Premium': {
    description: 'Inversor solar de alta performance para máxima eficiência na conversão de energia. Equipamento premium com tecnologia de ponta e monitoramento avançado.',
    benefits: [
      'Alta eficiência de conversão',
      'Monitoramento em tempo real',
      'Garantia estendida',
      'Suporte técnico premium',
      'Compatibilidade universal'
    ],
    process: [
      'Avaliação de compatibilidade',
      'Configuração personalizada',
      'Instalação profissional',
      'Testes de eficiência',
      'Ativação e monitoramento'
    ]
  },
  'Bateria Solar': {
    description: 'Sistema de armazenamento de energia de alta capacidade, perfeito para garantir energia mesmo sem sol. Tecnologia de ponta com vida útil estendida.',
    benefits: [
      'Alta capacidade de armazenamento',
      'Vida útil prolongada',
      'Sistema inteligente',
      'Backup automático',
      'Monitoramento integrado'
    ],
    process: [
      'Dimensionamento da capacidade',
      'Instalação do banco de baterias',
      'Configuração do sistema',
      'Testes de carga/descarga',
      'Ativação e monitoramento'
    ]
  }
};

export function ProductDetailsPage() {
  const route = useRoute<ProductDetailsRouteProp>();
  const navigation = useNavigation<NavigationProps>();
  const { title, category, price, image } = route.params;
  const details = productDetails[title as keyof typeof productDetails];

  return (
    <View style={styles.container}>
      <ParallaxScrollView>
        <View style={styles.headerWrapper}>
          <Header />
        </View>
        <ScrollView style={styles.content}>
          <Image source={image} style={styles.image} resizeMode="cover" />
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(price)}
            </Text>
            
            <Text style={styles.description}>{details.description}</Text>
            
            <Text style={styles.sectionTitle}>Benefícios</Text>
            <View style={styles.listContainer}>
              {details.benefits.map((benefit, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.listText}>{benefit}</Text>
                </View>
              ))}
            </View>
            
            <Text style={styles.sectionTitle}>Processo de Instalação</Text>
            <View style={styles.listContainer}>
              {details.process.map((step, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bulletPoint}>{index + 1}.</Text>
                  <Text style={styles.listText}>{step}</Text>
                </View>
              ))}
            </View>
            
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Contact')}
            >
              <Text style={styles.buttonText}>Solicitar Orçamento →</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
  headerWrapper: {
    position: 'relative',
    zIndex: 100,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: Platform.OS === 'web' ? 500 : 300,
  },
  categoryTag: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 460 : 260,
    left: 20,
    backgroundColor: 'rgba(123, 104, 238, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 36 : 24,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 12,
  },
  price: {
    fontSize: Platform.OS === 'web' ? 28 : 20,
    color: '#7B68EE',
    marginBottom: 24,
  },
  description: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    color: '#B8B8E6',
    lineHeight: Platform.OS === 'web' ? 28 : 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: Platform.OS === 'web' ? 24 : 20,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 16,
  },
  listContainer: {
    marginBottom: 32,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    color: '#7B68EE',
    fontSize: Platform.OS === 'web' ? 18 : 16,
    marginRight: 8,
    width: 20,
  },
  listText: {
    flex: 1,
    color: '#B8B8E6',
    fontSize: Platform.OS === 'web' ? 16 : 14,
    lineHeight: Platform.OS === 'web' ? 24 : 20,
  },
  button: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    paddingVertical: Platform.OS === 'web' ? 16 : 14,
    paddingHorizontal: Platform.OS === 'web' ? 32 : 24,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    marginTop: 16,
  },
  buttonText: {
    color: '#7B68EE',
    fontSize: Platform.OS === 'web' ? 18 : 16,
    fontWeight: 'bold',
  },
});