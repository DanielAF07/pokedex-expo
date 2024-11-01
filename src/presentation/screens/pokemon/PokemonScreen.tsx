import { getPokemonById } from '@/src/actions/pokemon/get-pokemon-by-id'
import { useQuery } from '@tanstack/react-query'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { View, ScrollView, StyleSheet, FlatList, Image } from 'react-native'
import FullScreenLoader from '../../components/ui/FullScreenLoader'
import { Chip, FAB, Text } from 'react-native-paper'
import { FadeInImage } from '../../components/ui/FadeInImage'
import { getTypeColor } from '@/src/config/helpers/getTypeColor'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import PokemonTypeChip from '../../components/pokemon/PokemonTypeChip'
import { maxPokedexId } from '@/src/config/pokedex'

const maxPokemon = 1025

const PokemonScreen = () => {
  const router = useRouter()
  const { isDark } = useContext(ThemeContext)
  const {top} = useSafeAreaInsets()
  const { pokemonId, reverse } = useLocalSearchParams()

  const { isLoading, data: pokemon } = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemonById(Number(pokemonId)),
    staleTime: 1000 * 60 * 60
  })

  useQuery({
    queryKey: ['pokemon', Number(pokemonId) + 1],
    queryFn: () => getPokemonById(Number(pokemonId) + 1),
    staleTime: 1000 * 60 * 60
  })

  useQuery({
    queryKey: ['pokemon', Number(pokemonId) - 1],
    queryFn: () => getPokemonById(Number(pokemonId) - 1),
    staleTime: 1000 * 60 * 60
  })

  const pokeballImg = isDark
    ? require('@/src/assets/pokeball-dark.png')
    : require('@/src/assets/pokeball-light.png')

  if(!pokemon || isLoading) {
    return <FullScreenLoader />
  }

  const pokemonColor = getTypeColor(pokemon.types)

  return (
    <>
    <Stack.Screen
      options={{
        animation: reverse ? 'slide_from_left' : 'slide_from_right'
      }}
    />
    <ScrollView
      style={ { flex: 1, backgroundColor: pokemonColor[0] } }
      bounces={ false }
      showsVerticalScrollIndicator={ false }>
      {/* Header Container */ }
      <View style={ styles.headerContainer }>
        {/* Nombre del Pokemon */ }
        <Text
          style={ {
            ...styles.pokemonName,
            top: top + 5,
            textTransform: 'capitalize'
          } }>
          {pokemon.name} #{pokemon.id}
        </Text>
    
        {/* Pokeball */ }
        <Image
          source={ pokeballImg }
          style={ styles.pokeball }
        />
    
        <FadeInImage uri={ pokemon.avatar } style={ styles.pokemonImage } />
      </View>
    
      {/* Types */ }
      <View style={ { flexDirection: 'row', marginHorizontal: 20, marginTop: 10, gap: 8 } }>
        { pokemon.types.map( type => <PokemonTypeChip key={type} type={type} size='large' /> ) }
      </View>
    
      {/* Sprites */ }
      <FlatList
        data={ pokemon.sprites }
        horizontal
        keyExtractor={ (item, index) => `${item}-${index}` }
        showsHorizontalScrollIndicator={ false }
        centerContent
        style={ {
          marginTop: 20,
          height: 100,
        } }
        renderItem={ ( { item } ) => (
          <FadeInImage
            uri={ item }
            style={ { width: 100, height: 100, marginHorizontal: 5 } }
          />
        ) }
      />

      <Text style={styles.subTitle}>Abilities</Text>
      <FlatList
        data={pokemon.abilities}
        horizontal
        keyExtractor={key => key}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Chip selectedColor="white">
            <Text style={{fontSize: 16, textTransform: 'capitalize'}}>
              {item}
            </Text>
          </Chip>
        )}
      />

      <Text style={styles.subTitle}>Stats</Text>
      <FlatList
        data={pokemon.stats}
        horizontal
        keyExtractor={key => key.name}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.statsContainer}>
            <Text style={{flex: 1, color: 'white', textTransform: 'capitalize'}}>{item.name}</Text> 
            <Text style={{color: 'white'}}>{item.value}</Text>
          </View>
        )}
      />

      <Text style={styles.subTitle}>Moves</Text>
      <FlatList
        data={pokemon.moves}
        horizontal
        keyExtractor={key => key.name}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.statsContainer}>
            <Text style={{flex: 1, color: 'white', textTransform: 'capitalize'}}>{item.name}</Text> 
            <Text style={{color: 'white'}}>Lv.{item.level}</Text>
          </View>
        )}
      />

      <Text style={styles.subTitle}>Games</Text>
      <FlatList
        data={pokemon.games}
        horizontal
        keyExtractor={key => key}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Chip selectedColor='white'><Text style={{ borderWidth: 1, borderColor: 'white', borderRadius: 10, paddingHorizontal: 8, textTransform: 'capitalize'}}>{item}</Text></Chip>
        )}
      />
      <View style={ { height: 100 } } />
    </ScrollView>
    {Number(pokemonId) > 1 && (
      <FAB
        icon='chevron-left'
        style={styles.leftFab}
        onPress={() => router.replace({
          pathname: '/pokemon',
          params: { pokemonId: pokemon.id - 1, reverse: 'true'}
        })}
      />
    )}
    {Number(pokemonId) < maxPokedexId && (
      <FAB
        icon='chevron-right'
        style={styles.rightFab}
        onPress={() => router.replace({
          pathname: '/pokemon',
          params: { pokemonId: pokemon.id + 1},

        })}
      />
    )}
    </>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  rightFab: {
    backgroundColor: 'white',
    position: 'absolute',
    right: 16,
    bottom: 32,
  },
  leftFab: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 16,
    bottom: 32,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  
});

export default PokemonScreen