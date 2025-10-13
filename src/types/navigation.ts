import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Contact: undefined;
  Chat: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;