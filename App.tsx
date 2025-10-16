import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { defaultScreenOptions } from './src/utils/navigation';
import { HomePage } from './src/pages/home';
import { ContactPage } from './src/pages/contact';
import { ChatPage } from './src/pages/chat';
import { ProductsPage } from './src/pages/products';
import { ProductDetailsPage } from './src/pages/products/details';
import { ServicesPage } from './src/pages/services';
import { BudgetPage } from './src/pages/budget';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
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
    </SafeAreaProvider>
  );
}
