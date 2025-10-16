import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { ServiceCard } from './ServiceCard';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../types/navigation';

const services = [
  {
    id: '1',
    title: 'Residencial',
    description: 'Sistema fotovoltaico completo para sua casa',
    price: 'A partir de R$ 12.000',
    icon: 'home-lightning-bolt',
    accentColor: '#7B68EE',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=90&auto=format&fit=crop',
    features: [
      'Projeto personalizado',
      'Instalação completa',
      'Monitoramento via app',
      'Garantia de 25 anos',
    ],
  },
  {
    id: '2',
    title: 'Comercial',
    description: 'Soluções para empresas e indústrias',
    price: 'A partir de R$ 25.000',
    icon: 'office-building',
    accentColor: '#4CAF50',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&q=90&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=90&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=1200&q=90&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=90&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&q=90&auto=format&fit=crop',
    features: [
      'Baterias de alta capacidade',
      'Sistema autônomo',
      'Backup automático',
      'Monitoramento 24/7',
    ],
  },
];

export function SolarServices() {
  const navigation = useNavigation<NavigationProps>();

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
          {services.map((service) => (
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