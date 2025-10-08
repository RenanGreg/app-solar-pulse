import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePage } from './src/pages/home';
import { ContactPage } from './src/pages/contact';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0A0A1F' },
        }}
      >
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen 
          name="Contact" 
          component={ContactPage}
          options={{
            headerShown: true,
            headerTitle: 'Solicitar Orçamento',
            headerStyle: {
              backgroundColor: '#0A0A1F',
            },
            headerTintColor: '#E6E6FA',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
