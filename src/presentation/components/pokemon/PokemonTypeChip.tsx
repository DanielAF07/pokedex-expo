import { getTypeColor } from '@/src/config/helpers/getTypeColor'
import { PokemonType } from '@/src/domain/entities/pokemon'
import { View, Text, StyleSheet } from 'react-native'

interface Props {
  type: PokemonType
  size?: 'base' | 'large'
}

const PokemonTypeChip = ({type, size = 'base'}: Props) => {
  const typeColor = getTypeColor(type) as string

  return (
    <View key={type} style={[
        styles.typeContainer,
        {backgroundColor: typeColor},
        size === 'large'
          ? {width: 75, paddingVertical: 4} 
          : {}
      ]}>
      <Text
        numberOfLines={1}
        style={[
          styles.typeName,
          size === 'large'
          ? {fontSize: 14} 
          : {}
        ]}
      >
        {type}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  typeContainer: {
    borderRadius: 8,
    alignItems: 'center',
    width: 63,
    borderColor: 'black',
    borderWidth: 1
  },
  typeName: {
    color: 'white',
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
})
export default PokemonTypeChip