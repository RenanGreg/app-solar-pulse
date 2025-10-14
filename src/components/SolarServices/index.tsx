import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../types/navigation';

const { width } = Dimensions.get('window');

type ServiceCardProps = {
  title: string;
  description: string;
  price: string;
  features: string[];
  onRequestQuote: () => void;
};

function ServiceCard({ title, description, price, features, onRequestQuote }: ServiceCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      <Text style={styles.cardPrice}>{price}</Text>
      <View style={styles.featuresList}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.cardButton} onPress={onRequestQuote}>
        <Text style={styles.cardButtonText}>Solicitar Orçamento →</Text>
      </TouchableOpacity>
    </View>
  );
}

export function SolarServices() {
  const navigation = useNavigation<NavigationProps>();
  
  const services = [
    {
      title: 'Instalação Residencial',
      description: 'Sistema solar completo para residências',
      price: 'A partir de R$ 12.999',
      features: [
        'Análise de consumo personalizada',
        'Projeto técnico detalhado',
        'Instalação profissional',
        'Monitoramento remoto',
        'Garantia de 25 anos',
      ],
    },
    {
      title: 'Instalação Comercial',
      description: 'Soluções para empresas e indústrias',
      price: 'A partir de R$ 29.999',
      features: [
        'Estudo de viabilidade',
        'Projeto executivo',
        'Instalação especializada',
        'Sistema de monitoramento avançado',
        'Manutenção preventiva',
      ],
    },
    {
      title: 'Manutenção Premium',
      description: 'Serviço completo de manutenção',
      price: 'A partir de R$ 299/mês',
      features: [
        'Limpeza dos painéis',
        'Inspeção técnica mensal',
        'Relatórios de desempenho',
        'Suporte 24/7',
        'Reparo de emergência',
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Nossos Serviços</Text>
      <Text style={styles.sectionSubtitle}>
        Soluções completas em energia solar para sua casa ou empresa
      </Text>
      <View style={styles.servicesGrid}>
        {services.map((service, index) => (
          <ServiceCard 
            key={index} 
            {...service} 
            onRequestQuote={() => navigation.navigate('Contact')}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Platform.OS === 'web' ? 80 : 40,
    paddingHorizontal: 20,
    backgroundColor: '#0A0A1F',
  },
  sectionTitle: {
    fontSize: Platform.OS === 'web' ? 32 : 24,
    fontWeight: 'bold',
    color: '#E6E6FA',
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    color: '#B8B8E6',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 600,
    alignSelf: 'center',
  },
  servicesGrid: {
    flexDirection: Platform.select({
      web: width > 1200 ? 'row' : width > 768 ? 'row' : 'column',
      default: 'column',
    }),
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: 20,
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  card: {
    backgroundColor: 'rgba(123, 104, 238, 0.05)',
    borderRadius: 20,
    padding: Platform.OS === 'web' ? 32 : 24,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.2)',
    width: Platform.select({
      web: width > 1200 ? '30%' : width > 768 ? '45%' : '100%',
      default: '100%',
    }),
    minWidth: Platform.OS === 'web' ? 300 : undefined,
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
      },
    }),
  },
  cardTitle: {
    fontSize: Platform.OS === 'web' ? 24 : 20,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: Platform.OS === 'web' ? 16 : 14,
    color: '#B8B8E6',
    marginBottom: 16,
  },
  cardPrice: {
    fontSize: Platform.OS === 'web' ? 28 : 24,
    fontWeight: 'bold',
    color: '#7B68EE',
    marginBottom: 24,
  },
  featuresList: {
    marginBottom: 32,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    color: '#7B68EE',
    fontSize: Platform.OS === 'web' ? 18 : 16,
    fontWeight: 'bold',
  },
  featureText: {
    color: '#B8B8E6',
    fontSize: Platform.OS === 'web' ? 16 : 14,
  },
  cardButton: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    paddingVertical: Platform.OS === 'web' ? 16 : 14,
    paddingHorizontal: Platform.OS === 'web' ? 32 : 24,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
      },
    }),
  },
  cardButtonText: {
    color: '#7B68EE',
    fontSize: Platform.OS === 'web' ? 16 : 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});