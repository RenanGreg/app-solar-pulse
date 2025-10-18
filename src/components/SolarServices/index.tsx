import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { ServiceCard } from './ServiceCard';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';

const services = [
  {
    id: '1',
    title: 'Instalação Residencial', 
    description: 'Sistema fotovoltaico completo para sua casa',
    price: 'A partir de R$ 12.000',
    icon: 'home-lightning-bolt',
    accentColor: '#7B68EE',
    image: 'https://media.gazetadopovo.com.br/2023/12/08143348/Quase-70porcento-dos-brasileiros-ja-pensaram-em-ter-energia-solar-residencial-960x540.jpg',
    features: [
      'Projeto personalizado',
      'Instalação completa',
      'Monitoramento via app',
      'Garantia de 25 anos',
    ],
  },
  {
    id: '2',
    title: 'Instalção Comercial',
    description: 'Soluções para empresas e indústrias',
    price: 'A partir de R$ 25.000',
    icon: 'office-building',
    accentColor: '#4CAF50',
    image: 'https://sunwattssolar.com.br/wp-content/uploads/2022/03/instalacao-de-placas-solares.jpg',
    features: [
      'Análise de demanda',
      'Projeto otimizado',
      'Instalação profissional',
      'Suporte prioritário',
    ],
  },
  {
    id: '3',
    title: 'Manutenção',
    description: 'Serviços de manutenção e otimização',
    price: 'A partir de R$ 350',
    icon: 'tools',
    accentColor: '#FF9800',
    image: 'https://images.tcdn.com.br/img/img_prod/1089437/noticia_50018099566425dcfc354c.jpg',
    features: [
      'Limpeza especializada',
      'Inspeção técnica',
      'Relatório detalhado',
      'Ajustes de eficiência',
    ],
  },
  {
    id: '4',
    title: 'Instalação Rural',
    description: 'Energia solar para propriedades rurais',
    price: 'A partir de R$ 18.000',
    icon: 'barn',
    accentColor: '#8BC34A',
    image: 'https://static.wixstatic.com/media/9fcda7_b5e7ddca117347f99ba6b36a6c2a0e91~mv2.jpg/v1/fill/w_670,h_374,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9fcda7_b5e7ddca117347f99ba6b36a6c2a0e91~mv2.jpg',
    features: [
      'Projeto adaptado ao campo',
      'Sistema robusto',
      'Bombeamento solar',
      'Suporte técnico rural',
    ],
  },
  {
    id: '5',
    title: 'Instalação em Apartamentos',
    description: 'Soluções especiais para condomínios',
    price: 'A partir de R$ 15.000',
    icon: 'city-variant',
    accentColor: '#03A9F4',
    image: 'https://artigonal.com.br/wp-content/uploads/2025/04/instalacao-de-placa-solar-em-apartamento-sr-power.webp',
    features: [
      'Aprovação condominial',
      'Instalação discreta',
      'Projeto otimizado',
      'Documentação completa',
    ],
  },
  {
    id: '6',
    title: 'Sistema Off-Grid',
    description: 'Independência energética total',
    price: 'A partir de R$ 35.000',
    icon: 'power-plug-off',
    accentColor: '#9C27B0',
    image: 'https://sunergia.com.br/blog/wp-content/uploads/2024/12/instalacao-manutencao-e-suporte-em-energia-solar-fotovoltaica-1-1024x576-png.webp',
    features: [
      'Baterias de alta capacidade',
      'Sistema autônomo',
      'Backup automático',
      'Monitoramento 24/7',
    ],
  },
  {
    id: '7',
    title: 'Monitoramento e Análise',
    description: 'Acompanhamento da performance do seu sistema',
    price: 'A partir de R$ 199/mês',
    icon: 'chart-line',
    accentColor: '#00BCD4',
    image: 'https://holu.com.br/wp-content/uploads/2024/02/26-1024x512.png',
    features: [
      'Dashboard em tempo real',
      'Relatórios mensais',
      'Alertas de anomalias',
      'Otimização contínua',
    ],
  },
  {
    id: '8',
    title: 'Expansão de Sistema',
    description: 'Amplie seu sistema solar existente',
    price: 'A partir de R$ 8.000',
    icon: 'plus-circle',
    accentColor: '#FFC107',
    image: 'https://ecoa.org.br/wp-content/uploads/2020/01/energia-solar-fotovoltaica-geracao-distribuida-via-unsplash-e1578942670112.jpg',
    features: [
      'Análise de compatibilidade',
      'Instalação de novas placas',
      'Reconfiguração do sistema',
      'Testes de integração',
    ],
  },
  {
    id: '9',
    title: 'Consultoria Energética',
    description: 'Análise completa de viabilidade e economia',
    price: 'A partir de R$ 500',
    icon: 'account-tie',
    accentColor: '#E91E63',
    image: 'https://solucoes.edp.com.br/media/0rvgn1cf/edp-imagem-pauta590.webp',
    features: [
      'Estudo de viabilidade',
      'Análise de economia',
      'Projeto personalizado',
      'Orientação técnica',
    ],
  },
  {
    id: '10',
    title: 'Aquecimento Solar',
    description: 'Sistema de aquecimento de água por energia solar',
    price: 'A partir de R$ 6.500',
    icon: 'water-boiler',
    accentColor: '#FF5722',
    image: 'https://www.soletrol.com.br/layout/imagens/home/principais-aplicacoes/aquecedor-solar-residencia-1.jpg',
    features: [
      'Coletores solares térmicos',
      'Reservatório térmico',
      'Instalação completa',
      'Economia na conta de gás',
    ],
  },
  {
    id: '11',
    title: 'Retrofitting Solar',
    description: 'Modernização de sistemas antigos',
    price: 'A partir de R$ 5.000',
    icon: 'refresh',
    accentColor: '#009688',
    image: 'https://www.shutterstock.com/shutterstock/photos/2450053205/display_1500/stock-photo-professional-electric-engineers-survey-and-inspect-solar-panels-installation-on-the-factory-metal-2450053205.jpg',
    features: [
      'Atualização de inversores',
      'Substituição de equipamentos',
      'Melhoria de eficiência',
      'Garantia estendida',
    ],
  },
  {
    id: '12',
    title: 'Carregador Solar EV',
    description: 'Carregue seu veículo elétrico com energia solar',
    price: 'A partir de R$ 22.000',
    icon: 'ev-station',
    accentColor: '#3F51B5',
    image: 'https://ekkogreen.com.br/wp-content/uploads/2023/09/modular-solar-EV-charger-1.webp',
    features: [
      'Estação de carregamento',
      'Integração com sistema solar',
      'Carregamento inteligente',
      'App de controle',
    ],
  },
];

type SolarServicesProps = {
  limitToMain?: boolean;
};

export function SolarServices({ limitToMain = false }: SolarServicesProps) {
  const navigation = useNavigation<NavigationProps>();

  // Se limitToMain for true, mostra apenas Residencial, Comercial e Rural (ids 1, 2, 4)
  const displayedServices = limitToMain 
    ? services.filter(service => ['1', '2', '4'].includes(service.id))
    : services;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.overline}>SOLUÇÕES EM ENERGIA SOLAR</Text>
            <Text style={styles.title}>Nossos Serviços</Text>
            <View style={styles.titleDecoration} />
          </View>
          <Text style={styles.subtitle}>
            Escolha o plano ideal para suas necessidades e comece a economizar com energia solar.
            Temos soluções personalizadas para residências, empresas e propriedades rurais.
          </Text>
        </View>

        <View style={styles.servicesGrid}>
          {displayedServices.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              price={service.price}
              features={service.features}
              icon={service.icon}
              accentColor={service.accentColor}
              image={service.image}
            />
          ))}
        </View>
        
        {limitToMain && (
          <View style={styles.viewAllContainer}>
            <TouchableOpacity 
              style={styles.viewAllButton}
              onPress={() => navigation.navigate('Services')}
            >
              <Text style={styles.viewAllButtonText}>Ver Todos os Serviços →</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.bottomCta}>
          <Text style={styles.ctaText}>
            Não encontrou o que procura? Entre em contato conosco para uma solução personalizada
          </Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Contact')}
          >
            <Text style={styles.ctaButtonText}>Fale com um Especialista →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
  content: {
    padding: Platform.OS === 'web' ? 40 : 20,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    marginBottom: 60,
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  overline: {
    fontSize: Platform.OS === 'web' ? 14 : 12,
    color: '#7B68EE',
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 16,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 42 : 32,
    fontWeight: 'bold',
    color: '#E6E6FA',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  titleDecoration: {
    width: 60,
    height: 4,
    backgroundColor: '#7B68EE',
    borderRadius: 2,
    marginTop: 8,
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    color: '#B8B8E6',
    textAlign: 'center',
    maxWidth: 800,
    lineHeight: Platform.OS === 'web' ? 32 : 28,
  },
  servicesGrid: {
    display: 'flex',
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: 32,
    justifyContent: 'center',
    marginBottom: 80,
  },
  viewAllContainer: {
    alignItems: 'center',
    marginBottom: 60,
    marginTop: -40,
  },
  viewAllButton: {
    backgroundColor: 'rgba(123, 104, 238, 0.15)',
    paddingVertical: Platform.OS === 'web' ? 16 : 14,
    paddingHorizontal: Platform.OS === 'web' ? 32 : 28,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#7B68EE',
    alignItems: 'center',
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: '#7B68EE',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 20px rgba(123,104,238,0.4)',
        },
      },
    }),
  },
  viewAllButtonText: {
    color: '#E6E6FA',
    fontSize: Platform.OS === 'web' ? 16 : 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  bottomCta: {
    backgroundColor: 'rgba(123, 104, 238, 0.08)',
    padding: Platform.OS === 'web' ? 48 : 32,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.2)',
  },
  ctaText: {
    fontSize: Platform.OS === 'web' ? 20 : 18,
    color: '#E6E6FA',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 600,
    lineHeight: Platform.OS === 'web' ? 32 : 28,
  },
  ctaButton: {
    backgroundColor: '#7B68EE',
    paddingVertical: Platform.OS === 'web' ? 18 : 16,
    paddingHorizontal: Platform.OS === 'web' ? 36 : 32,
    borderRadius: 30,
    alignItems: 'center',
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
        ':hover': {
          backgroundColor: '#8A7BEE',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 20px rgba(123,104,238,0.3)',
        },
      },
    }),
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? 17 : 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});