import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { ServiceCard } from './ServiceCard';

const services = [
  {
    id: '1',
    title: 'Residencial',
    description: 'Sistema fotovoltaico completo para sua casa',
    price: 'A partir de R$ 12.000',
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
    features: [
      'Baterias de alta capacidade',
      'Sistema autônomo',
      'Backup automático',
      'Monitoramento 24/7',
    ],
  },
];

export function SolarServices() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Nossos Serviços</Text>
          <Text style={styles.subtitle}>
            Escolha o plano ideal para suas necessidades e comece a economizar com energia solar
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
            />
          ))}
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
    padding: 20,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: Platform.OS === 'web' ? 36 : 28,
    fontWeight: 'bold',
    color: '#E6E6FA',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    color: '#B8B8E6',
    textAlign: 'center',
    maxWidth: 600,
  },
  servicesGrid: {
    display: 'flex',
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
});