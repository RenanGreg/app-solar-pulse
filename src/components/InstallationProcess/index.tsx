import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type StepIcon = 'clipboard-check-outline' | 'file-document-multiple' | 'tools' | 'chart-line-variant' | 'headphones' | 'medal';

interface Step {
  id: string;
  title: string;
  description: string;
  icon: StepIcon;
  gradient: [string, string];
  highlightColor: string;
}

const steps: Step[] = [
  {
    id: '01',
    title: 'Análise e Projeto',
    description: 'Avaliamos seu consumo energético e projetamos o sistema ideal para suas necessidades.',
    icon: 'clipboard-check-outline',
    gradient: ['#FF6B6B', '#EE5D5D'] as [string, string],
    highlightColor: '#FF6B6B',
  },
  {
    id: '02',
    title: 'Aprovação e Documentação',
    description: 'Cuidamos de toda a documentação e aprovação junto à concessionária de energia.',
    icon: 'file-document-multiple',
    gradient: ['#4ECDC4', '#45B7AF'] as [string, string],
    highlightColor: '#4ECDC4',
  },
  {
    id: '03',
    title: 'Instalação Profissional',
    description: 'Nossa equipe técnica realiza a instalação completa com os mais altos padrões de qualidade.',
    icon: 'tools',
    gradient: ['#FFD93D', '#F4C000'] as [string, string],
    highlightColor: '#FFD93D',
  },
  {
    id: '04',
    title: 'Ativação e Monitoramento',
    description: 'Sistema ativado e conectado à rede com monitoramento em tempo real via aplicativo.',
    icon: 'chart-line-variant',
    gradient: ['#6C5CE7', '#5850BD'] as [string, string],
    highlightColor: '#6C5CE7',
  },
  {
    id: '05',
    title: 'Suporte Contínuo',
    description: 'Oferecemos suporte técnico especializado e manutenção preventiva para garantir o máximo desempenho.',
    icon: 'headphones',
    gradient: ['#A8E6CF', '#95D6BE'] as [string, string],
    highlightColor: '#A8E6CF',
  },
];

export function InstallationProcess() {
  const isWeb = Platform.OS === 'web';
  const contentWidth = isWeb ? Math.min(1200, width * 0.9) : width * 0.9;
  const scaleAnims = steps.map(() => React.useRef(new Animated.Value(1)).current);

  React.useEffect(() => {
    const animations = scaleAnims.map((anim, index) => {
      return Animated.sequence([
        Animated.delay(index * 200),
        Animated.spring(anim, {
          toValue: 1.05,
          useNativeDriver: true,
          damping: 5,
        }),
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 5,
        }),
      ]);
    });

    const startAnimations = () => {
      Animated.stagger(200, animations).start(() => {
        setTimeout(startAnimations, 10000);
      });
    };

    startAnimations();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.content, { maxWidth: contentWidth, alignSelf: 'center' }]}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.overline}>PROCESSO DE INSTALAÇÃO</Text>
            <Text style={styles.title}>Como funciona o processo</Text>
            <View style={styles.titleDecoration} />
          </View>
          <Text style={styles.subtitle}>
            Do projeto à ativação, cuidamos de tudo para você começar a economizar o quanto antes.
            Nossa equipe especializada garante uma instalação eficiente e profissional.
          </Text>
        </View>

        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <Animated.View 
              key={step.id} 
              style={[
                styles.stepItem,
                { transform: [{ scale: scaleAnims[index] }] }
              ]}
            >
              <LinearGradient
                colors={step.gradient}
                style={styles.iconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <MaterialCommunityIcons name={step.icon} size={32} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.stepContent}>
                <View style={styles.stepHeader}>
                  <Text style={[styles.stepNumber, { color: step.highlightColor }]}>
                    Etapa {step.id}
                  </Text>
                  <View style={[styles.stepLine, { backgroundColor: step.highlightColor }]} />
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </Animated.View>
          ))}
        </View>

        <View style={styles.experienceContainer}>
          <LinearGradient
            colors={['rgba(123, 104, 238, 0.2)', 'rgba(123, 104, 238, 0.05)'] as [string, string]}
            style={styles.experienceTag}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialCommunityIcons name="medal" size={40} color="#7B68EE" />
            <View>
              <Text style={styles.experienceText}>15+ Anos</Text>
              <Text style={styles.experienceSubtext}>de experiência</Text>
            </View>
          </LinearGradient>
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
  stepsContainer: {
    display: 'flex',
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: 32,
    justifyContent: 'center',
    marginBottom: 60,
  },
  stepItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 24,
    padding: Platform.OS === 'web' ? 32 : 24,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.2)',
    width: Platform.OS === 'web' ? '30%' : '100%',
    minWidth: Platform.OS === 'web' ? 320 : undefined,
    overflow: 'hidden',
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      },
    } : {}),
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    fontSize: Platform.OS === 'web' ? 16 : 14,
    fontWeight: 'bold',
    marginRight: 12,
  },
  stepLine: {
    height: 2,
    flex: 1,
    opacity: 0.3,
  },
  stepContent: {
    gap: 12,
  },
  stepTitle: {
    fontSize: Platform.OS === 'web' ? 24 : 20,
    fontWeight: 'bold',
    color: '#E6E6FA',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: Platform.OS === 'web' ? 16 : 14,
    color: '#B8B8E6',
    lineHeight: Platform.OS === 'web' ? 26 : 22,
  },
  experienceContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  experienceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: Platform.OS === 'web' ? 24 : 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(10px)',
    } : {}),
  },
  experienceText: {
    fontSize: Platform.OS === 'web' ? 28 : 24,
    fontWeight: 'bold',
    color: '#7B68EE',
  },
  experienceSubtext: {
    fontSize: Platform.OS === 'web' ? 16 : 14,
    color: '#E6E6FA',
  },
});