import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
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
    padding: 40,
    backgroundColor: '#0A0A1F',
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: '#7B68EE',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  sectionSubtitle: {
    fontSize: 18,
    color: '#B8B8E6',
    marginBottom: 40,
    textAlign: 'center',
    maxWidth: 600,
    alignSelf: 'center',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
  },
  card: {
    backgroundColor: 'rgba(123, 104, 238, 0.05)',
    borderRadius: 20,
    padding: 32,
    width: Math.min(350, width - 80),
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    shadowColor: '#7B68EE',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 12,
    textShadowColor: '#7B68EE',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  cardDescription: {
    fontSize: 16,
    color: '#B8B8E6',
    marginBottom: 16,
  },
  cardPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7B68EE',
    marginBottom: 24,
  },
  featuresList: {
    gap: 12,
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    color: '#7B68EE',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featureText: {
    color: '#B8B8E6',
    fontSize: 16,
  },
  cardButton: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
  },
  cardButtonText: {
    color: '#7B68EE',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});