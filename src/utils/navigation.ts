import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: '#0A0A1F' },
  animation: 'slide_from_right',
  animationDuration: 300,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  presentation: 'card',
  fullScreenGestureEnabled: true,
  animationTypeForReplace: 'push',
};

export const slideAnimation = {
  entering: (targetPosition: number) => ({
    initialValues: {
      opacity: 0,
      transform: [{ translateX: targetPosition }],
    },
    animations: {
      opacity: {
        from: 0,
        to: 1,
        duration: 300,
      },
      transform: [
        {
          translateX: {
            from: targetPosition,
            to: 0,
            duration: 300,
          },
        },
      ],
    },
  }),
  exiting: (targetPosition: number) => ({
    initialValues: {
      opacity: 1,
      transform: [{ translateX: 0 }],
    },
    animations: {
      opacity: {
        from: 1,
        to: 0,
        duration: 300,
      },
      transform: [
        {
          translateX: {
            from: 0,
            to: targetPosition,
            duration: 300,
          },
        },
      ],
    },
  }),
};