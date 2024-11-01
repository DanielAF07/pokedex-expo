import {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageStyle,
  StyleProp,
  View,
} from 'react-native';
import useAnimation from '../../hooks/useAntimation';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({uri, style}: Props) => {
  const {value, fadeIn} = useAnimation(0);
  const [isLoading, setIsLoading] = useState(true);

  const isDisposed = useRef(false)

  useEffect(() => {

    return () => {
      isDisposed.current = true
    }
  }, [])

  const handleLoadEnd = () => {
    if (isDisposed.current) return

    fadeIn();
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && (
        <ActivityIndicator
        style={style}
        color="grey"
        size={30}
        />
      )}
      <Animated.Image
        source={{uri}}
        onLoadEnd={handleLoadEnd}
        style={[style, {opacity: value}]}
        resizeMode='contain'
      />
    </>

  );
};