import { useContext } from 'react'
import { View, Text, StyleProp, ViewStyle, ImageStyle, Image } from 'react-native'
import { ThemeContext } from '../../context/ThemeContext'
interface Props {
  style?: StyleProp<ImageStyle>
}

const PokeballBg = ({style}: Props) => {
  const { isDark } = useContext(ThemeContext)
  const pokeballImg = isDark
    ? require('@/src/assets/pokeball-light.png')
    : require('@/src/assets/pokeball-dark.png')
  return (
    <Image
      source={pokeballImg}
      style={[
        {
          width: 300,
          height: 300,
          opacity: 0.3
        },
        style
      ]}
    />
  )
}
export default PokeballBg