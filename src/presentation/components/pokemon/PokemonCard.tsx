import { Pokemon } from '@/src/domain/entities/pokemon'
import { View, StyleSheet, Image, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import { FadeInImage } from '../ui/FadeInImage'
import { getTypeColor } from '@/src/config/helpers/getTypeColor'
import { useRouter } from 'expo-router'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import PokemonTypeChip from './PokemonTypeChip'

interface Props {
  pokemon: Pokemon
}

const PokemonCard = ({pokemon}: Props) => {
  const { isDark } = useContext(ThemeContext)
  const typesColors = getTypeColor(pokemon.types)
  const router = useRouter()

  const pokeballImg = isDark
    ? require('@/src/assets/pokeball-dark.png')
    : require('@/src/assets/pokeball-light.png')

  return (
    <Pressable
      style={{flex: 1}}
      onPress={() => router.navigate({
        pathname: '/pokemon',
        params: { pokemonId: pokemon.id }
      })}
    >
      <View style={[styles.cardContainer, { backgroundColor: typesColors[0] }]}>
        <View>
          <Text style={styles.name} variant="bodyLarge">
            {pokemon.name}
          </Text>
          <Text style={styles.name} variant="bodyLarge">
            #{pokemon.id}
          </Text>
        </View>

        {/* PokeballBG */}
        <View style={styles.pokeballContainer}>
          <Image
            source={pokeballImg}
            style={styles.pokeball}
          />
        </View>

        {/* Pokemon Image */}
        <FadeInImage
          uri={pokemon.avatar}
          style={styles.pokemonImage}
        />

        {/* Types */}
        <View style={{gap: 2, marginTop: 'auto'}}>
          {pokemon.types.map((type) => (
            <PokemonTypeChip key={type} type={type}/>
          ))}
        </View>
      </View>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 6,
    backgroundColor: 'grey',
    height: 120,
    flex: 0.5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    color: 'white',
    textTransform: 'capitalize'
  },
  pokeball: {
    width: 100,
    height: 100,
    right: -25,
    top: -25,
    opacity: 0.4
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    bottom: -16,
    right: -12,
  },
  pokeballContainer: {
    alignItems: 'flex-end',
    width: '100%',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    borderTopRightRadius: 10,
    opacity: 0.5,
  },
});

export default PokemonCard