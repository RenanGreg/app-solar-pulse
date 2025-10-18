import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform, Animated } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, NavigationProps } from '../../types/navigation';
import { Header } from '../../components/Header';
import { ParallaxScrollView } from '../../components/ParallaxScrollView';
import { useScreenTransition } from '../../hooks/useScreenTransition';

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
    description: ' Sistema off-grid é um sistema de geração de energia elétrica que opera de forma totalmente autônoma, sem conexão com a rede pública de distribuição de energia elétrica. Ele é ideal para locais remotos sem acesso à rede ou para pessoas que buscam independência total do fornecimento convencional',
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
  'Inversor Solar': {
    description: 'O inversor solar é um item essencial do kit de energia solar, com função de converter a energia elétrica gerada pelos painéis de corrente contínua (CC) para corrente alternada (CA), possibilitando o uso da energia elétrica gerada pela energia solar fotovoltaica.',
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
  },
  'Painel Solar 550W': {
    description: 'Painel solar de alta eficiência com tecnologia monocristalina, ideal para maximizar a geração de energia em espaços reduzidos. Resistente às intempéries e com garantia de 25 anos.',
    benefits: [
      'Alta eficiência de conversão (22%+)',
      'Tecnologia monocristalina premium',
      'Resistente a granizo e ventos',
      'Baixa degradação anual',
      'Garantia de 25 anos'
    ],
    process: [
      'Avaliação da área disponível',
      'Cálculo de inclinação ideal',
      'Instalação com estrutura adequada',
      'Conexão elétrica segura',
      'Testes de geração'
    ]
  },
  'Controlador de Carga MPPT': {
    description: 'Controlador de carga com tecnologia MPPT (Maximum Power Point Tracking) para otimização da energia gerada pelos painéis solares. Essencial para sistemas off-grid e híbridos.',
    benefits: [
      'Eficiência de até 99%',
      'Tecnologia MPPT avançada',
      'Proteção contra sobrecarga',
      'Display LCD informativo',
      'Compatível com diversos tipos de bateria'
    ],
    process: [
      'Dimensionamento da corrente',
      'Instalação entre painéis e baterias',
      'Configuração dos parâmetros',
      'Testes de funcionamento',
      'Calibração final'
    ]
  },
  'String Box para Proteção': {
    description: 'Caixa de proteção com fusíveis e disjuntores para garantir a segurança do seu sistema fotovoltaico. Proteção contra surtos e sobrecorrentes.',
    benefits: [
      'Proteção completa do sistema',
      'Fusíveis dimensionados',
      'Instalação facilitada',
      'Material resistente UV',
      'Normas técnicas brasileiras'
    ],
    process: [
      'Instalação próxima aos painéis',
      'Conexão dos circuitos',
      'Verificação das proteções',
      'Teste de continuidade',
      'Selagem e identificação'
    ]
  },
  'Cabo Solar 6mm': {
    description: 'Cabo solar especial com dupla isolação, resistente a UV e intempéries. Ideal para conexão entre painéis, inversores e demais componentes do sistema fotovoltaico.',
    benefits: [
      'Dupla isolação reforçada',
      'Resistente a UV e ozônio',
      'Temperatura operacional até 120°C',
      'Vida útil de 25+ anos',
      'Certificação internacional'
    ],
    process: [
      'Medição das distâncias',
      'Corte e preparação',
      'Instalação dos conectores',
      'Passagem segura dos cabos',
      'Fixação e proteção'
    ]
  },
  'Conectores MC4': {
    description: 'Conectores padrão MC4 para sistemas fotovoltaicos, garantindo conexões seguras e à prova d\'água entre painéis solares e demais componentes.',
    benefits: [
      'Padrão internacional MC4',
      'À prova d\'água IP67',
      'Fácil instalação e remoção',
      'Contatos em cobre estanhado',
      'Suporta até 30A'
    ],
    process: [
      'Preparação dos cabos',
      'Crimpagem dos terminais',
      'Encaixe dos conectores',
      'Teste de isolamento',
      'Vedação final'
    ]
  },
  'Estrutura de Fixação': {
    description: 'Estrutura metálica em alumínio para fixação segura de painéis solares em telhados. Resistente à corrosão e projetada para suportar ventos de até 150 km/h.',
    benefits: [
      'Alumínio anodizado',
      'Resistente à corrosão',
      'Fácil instalação',
      'Ajuste de inclinação',
      'Garantia de 10 anos'
    ],
    process: [
      'Análise estrutural do telhado',
      'Marcação dos pontos de fixação',
      'Instalação dos trilhos',
      'Fixação dos painéis',
      'Verificação de segurança'
    ]
  },
  'Microinversor Grid-Tie': {
    description: 'Microinversor de última geração para sistemas grid-tie, com eficiência superior e monitoramento individual de cada painel. Ideal para instalações residenciais e comerciais.',
    benefits: [
      'Eficiência de até 96.5%',
      'Monitoramento por painel',
      'Maior produção de energia',
      'Instalação simplificada',
      'Garantia de 10 anos'
    ],
    process: [
      'Instalação atrás de cada painel',
      'Conexão em corrente alternada',
      'Configuração do monitoramento',
      'Conexão à rede elétrica',
      'Ativação e testes'
    ]
  },
  'Kit Monitoramento Wi-Fi': {
    description: 'Sistema de monitoramento inteligente via Wi-Fi para acompanhar a geração de energia em tempo real pelo smartphone. Alertas e relatórios automáticos.',
    benefits: [
      'Monitoramento em tempo real',
      'App iOS e Android',
      'Alertas de falhas',
      'Histórico de geração',
      'Relatórios detalhados'
    ],
    process: [
      'Instalação do módulo Wi-Fi',
      'Conexão com o inversor',
      'Configuração da rede',
      'Download do aplicativo',
      'Cadastro e ativação'
    ]
  },
  'Disjuntor DC Bipolar': {
    description: 'Disjuntor específico para corrente contínua (DC), essencial para segurança e proteção do sistema fotovoltaico. Desliga automaticamente em caso de sobrecarga.',
    benefits: [
      'Proteção contra sobrecarga',
      'Corrente DC até 63A',
      'Curva de atuação tipo C',
      'Montagem em trilho DIN',
      'Certificação IEC'
    ],
    process: [
      'Instalação no quadro DC',
      'Dimensionamento da corrente',
      'Conexão dos circuitos',
      'Teste de atuação',
      'Identificação dos circuitos'
    ]
  },
  'Kit Ferramenta Solar': {
    description: 'Kit completo de ferramentas profissionais para instalação e manutenção de sistemas fotovoltaicos. Inclui alicates, chaves, testadores e mais.',
    benefits: [
      'Ferramentas profissionais',
      'Maleta organizada',
      'Isoladas até 1000V',
      'Testador de tensão incluído',
      'Garantia vitalícia'
    ],
    process: [
      'Verificação das ferramentas',
      'Organização da maleta',
      'Teste dos instrumentos',
      'Manual de uso',
      'Manutenção das ferramentas'
    ]
  },
  'Multímetro Digital Solar': {
    description: 'Multímetro digital especializado para sistemas fotovoltaicos, com funções específicas para medição de tensão DC, corrente e irradiação solar.',
    benefits: [
      'Display LCD grande',
      'Medição precisa DC/AC',
      'Função irradiação solar',
      'Auto-range',
      'Case de proteção incluído'
    ],
    process: [
      'Calibração inicial',
      'Teste de continuidade',
      'Medição de tensões',
      'Medição de correntes',
      'Registro das medidas'
    ]
  },
  'Alicate Crimpador MC4': {
    description: 'Alicate profissional para crimpagem de conectores MC4, garantindo conexões perfeitas e duradouras. Ferramenta essencial para instaladores.',
    benefits: [
      'Crimpagem perfeita',
      'Punho ergonômico',
      'Ajuste micrométrico',
      'Compatível com MC4',
      'Garantia vitalícia'
    ],
    process: [
      'Preparação do cabo',
      'Inserção do terminal',
      'Crimpagem adequada',
      'Teste de tração',
      'Montagem do conector'
    ]
  },
  'Kit Aterramento Solar': {
    description: 'Kit completo para aterramento de sistemas fotovoltaicos, incluindo hastes, conectores e cabos. Essencial para segurança e proteção contra descargas atmosféricas.',
    benefits: [
      'Proteção contra raios',
      'Hastes cobreadas',
      'Conectores de bronze',
      'Cabo de aterramento',
      'Conforme NBR 5410'
    ],
    process: [
      'Cravação das hastes',
      'Medição da resistência',
      'Conexão dos condutores',
      'Ligação ao sistema',
      'Teste final de aterramento'
    ]
  },
  'Nobreak Solar 1500VA': {
    description: 'Nobreak especial para sistemas solares, com entrada DC e saída AC estabilizada. Mantém equipamentos funcionando mesmo sem energia da rede.',
    benefits: [
      'Potência de 1500VA',
      'Entrada DC 12/24V',
      'Saída AC estabilizada',
      'Proteção de equipamentos',
      'Autonomia configurável'
    ],
    process: [
      'Instalação do nobreak',
      'Conexão às baterias',
      'Configuração de tensões',
      'Conexão dos equipamentos',
      'Testes de autonomia'
    ]
  },
  'Protetor de Surto DPS': {
    description: 'Dispositivo de proteção contra surtos (DPS) para sistemas fotovoltaicos. Protege contra descargas atmosféricas e picos de tensão da rede.',
    benefits: [
      'Proteção DC e AC',
      'Classe II de proteção',
      'Indicador visual de status',
      'Resposta < 25ns',
      'Montagem em trilho DIN'
    ],
    process: [
      'Instalação no quadro',
      'Conexão em paralelo',
      'Aterramento adequado',
      'Verificação visual',
      'Teste de funcionamento'
    ]
  },
  'Kit Limpeza Painéis': {
    description: 'Kit profissional para limpeza e manutenção de painéis solares. Inclui escova telescópica, detergente específico e pano microfibra. Aumenta em até 20% a eficiência.',
    benefits: [
      'Escova telescópica 6m',
      'Detergente não-abrasivo',
      'Pano microfibra especial',
      'Aumenta eficiência',
      'Fácil aplicação'
    ],
    process: [
      'Verificação de sujidades',
      'Aplicação do detergente',
      'Escovação suave',
      'Enxágue com água limpa',
      'Secagem natural'
    ]
  }
};

export function ProductDetailsPage() {
  const route = useRoute<ProductDetailsRouteProp>();
  const navigation = useNavigation<NavigationProps>();
  const { animatedStyle } = useScreenTransition();
  const { title, category, price, image } = route.params;
  const details = productDetails[title as keyof typeof productDetails];

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.headerWrapper}>
        <Header />
      </View>
      <ParallaxScrollView>
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
            
            <TouchableOpacity 
              style={[styles.button, styles.earlyButton]}
              onPress={() => navigation.navigate('Budget')}
            >
              <Text style={styles.buttonText}>Solicitar Orçamento →</Text>
            </TouchableOpacity>

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
          </View>
        </ScrollView>
      </ParallaxScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
  headerWrapper: {
    position: 'relative',
    zIndex: 1000,
    elevation: 5,
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
  earlyButton: {
    marginVertical: 24,
  },
  buttonText: {
    color: '#7B68EE',
    fontSize: Platform.OS === 'web' ? 18 : 16,
    fontWeight: 'bold',
  },
});