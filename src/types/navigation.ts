import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Products: undefined;
  Services: undefined;
  Contact: undefined;
  Chat: undefined;
  ProductDetails: {
    id: number;
    title: string;
    category: string;
    price: number;
    image: any;
  };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;