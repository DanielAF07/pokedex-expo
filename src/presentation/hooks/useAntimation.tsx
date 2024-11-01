import {useRef} from 'react';
import {Animated, Easing} from 'react-native';

const useAnimation = (initValue: number) => {
  const value = useRef(new Animated.Value(initValue)).current;

  const animate = (toValue: number, duration: number) => {
    Animated.timing(value, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const animateWithBounce = (toValue: number, duration: number) => {
    Animated.timing(value, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };

  const fadeIn = (duration: number = 300) => {
    Animated.timing(value, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (duration: number = 300) => {
    Animated.timing(value, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  return {
    value,
    animate,
    animateWithBounce,
    fadeIn,
    fadeOut,
  };
};
export default useAnimation;