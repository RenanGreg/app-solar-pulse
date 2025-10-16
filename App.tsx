import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Platform } from 'react-native';
import { defaultScreenOptions } from './src/utils/navigation';
import { HomePage } from './src/pages/home';
import { ContactPage } from './src/pages/contact';
import { ChatPage } from './src/pages/chat';
import { ProductsPage } from './src/pages/products';
import { ProductDetailsPage } from './src/pages/products/details';
import { ServicesPage } from './src/pages/services';
import { BudgetPage } from './src/pages/budget';

const Stack = createNativeStackNavigator();

const navigationTheme = {
  dark: true,
  colors: {
    primary: '#7B68EE',
    background: '#0A0A1F',
    card: '#0A0A1F',
    text: '#E6E6FA',
    border: '#0A0A1F',
    notification: '#7B68EE',
  },
};

// Previne o flash branco durante navegação
if (Platform.OS === 'android') {
  require('react-native').UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: '#0A0A1F' }}>
      <View style={{ flex: 1, backgroundColor: '#0A0A1F' }}>
        <NavigationContainer 
          theme={navigationTheme}
          documentTitle={{
            formatter: (options, route) => `Pulse Robot - ${route?.name || 'Home'}`
          }}
        >
          <StatusBar style="light" backgroundColor="#0A0A1F" translucent={false} />
          <Stack.Navigator 
            screenOptions={defaultScreenOptions}
          >
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Products" component={ProductsPage} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsPage} />
          <Stack.Screen name="Services" component={ServicesPage} />
          <Stack.Screen name="Contact" component={ContactPage} />
          <Stack.Screen name="Chat" component={ChatPage} />
          <Stack.Screen name="Budget" component={BudgetPage} />
        </Stack.Navigator>
      </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
