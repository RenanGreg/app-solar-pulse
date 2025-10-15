import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');

const steps = [
  {
    id: '01',
    title: 'Análise e Projeto',
    description: 'Avaliamos seu consumo energético e projetamos o sistema ideal para suas necessidades.',
    icon: '🔍',
  },
  {
    id: '02',
    title: 'Aprovação e Documentação',
    description: 'Cuidamos de toda a documentação e aprovação junto à concessionária de energia.',
    icon: '📋',
  },
  {
    id: '03',
    title: 'Instalação Profissional',
    description: 'Nossa equipe técnica realiza a instalação completa com os mais altos padrões de qualidade.',
    icon: '🛠️',
  },
  {
    id: '04',
    title: 'Ativação e Monitoramento',
    description: 'Sistema ativado e conectado à rede com monitoramento em tempo real via aplicativo.',
    icon: '📱',
  },
  {
    id: '05',
    title: 'Suporte Contínuo',
    description: 'Oferecemos suporte técnico especializado e manutenção preventiva para garantir o máximo desempenho.',
    icon: '🔧',
  },
];

export function InstallationProcess() {
  const isWeb = Platform.OS === 'web';
  const contentWidth = isWeb ? Math.min(1200, width * 0.9) : width * 0.9;

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.content, { maxWidth: contentWidth, alignSelf: 'center' }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Como funciona o processo</Text>
          <Text style={styles.subtitle}>
            Do projeto à ativação, cuidamos de tudo para você começar a economizar o quanto antes.
          </Text>
        </View>

        <View style={styles.stepsContainer}>
          {steps.map((step) => (
            <View key={step.id} style={styles.stepItem}>
              <View style={styles.stepHeader}>
                <Text style={styles.stepNumber}>{step.id}</Text>
                <Text style={styles.stepIcon}>{step.icon}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.experienceTag}>
          <Text style={styles.experienceText}>15+ Anos</Text>
          <Text style={styles.experienceSubtext}>de experiência</Text>
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
  stepsContainer: {
    display: 'flex',
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
  stepItem: {
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    width: Platform.OS === 'web' ? '30%' : '100%',
    minWidth: Platform.OS === 'web' ? 300 : undefined,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  stepNumber: {
    fontSize: Platform.OS === 'web' ? 24 : 20,
    fontWeight: 'bold',
    color: '#7B68EE',
  },
  stepIcon: {
    fontSize: Platform.OS === 'web' ? 24 : 20,
  },
  stepContent: {
    gap: 8,
  },
  stepTitle: {
    fontSize: Platform.OS === 'web' ? 20 : 18,
    fontWeight: 'bold',
    color: '#E6E6FA',
  },
  stepDescription: {
    fontSize: Platform.OS === 'web' ? 16 : 14,
    color: '#B8B8E6',
    lineHeight: Platform.OS === 'web' ? 24 : 20,
  },
  experienceTag: {
    alignSelf: 'center',
    marginTop: 40,
    backgroundColor: 'rgba(10, 10, 31, 0.9)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#7B68EE',
  },
  experienceText: {
    fontSize: Platform.OS === 'web' ? 24 : 20,
    fontWeight: 'bold',
    color: '#7B68EE',
    textAlign: 'center',
  },
  experienceSubtext: {
    fontSize: Platform.OS === 'web' ? 16 : 14,
    color: '#E6E6FA',
    textAlign: 'center',
  },
});