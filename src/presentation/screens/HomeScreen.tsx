import { getPokemons } from '@/src/actions/pokemon'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { FlatList, StyleSheet, View } from 'react-native'
import { FAB, Text } from 'react-native-paper'
import PokeballBg from '../components/ui/PokeballBg'
import { theme } from '@/src/config/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PokemonCard from '../components/pokemon/PokemonCard'
import { ThemeContext } from '../context/ThemeContext'
import { useContext } from 'react'
import { useRouter } from 'expo-router'

const HomeScreen = () => {
  const router = useRouter()
  const themeContext = useContext(ThemeContext)
  const queryClient = useQueryClient()

  const {top} = useSafeAreaInsets()

  const {isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
    queryFn: async (params) => {
      const pokemons = await getPokemons(params.pageParam)
      pokemons.forEach((pokemon) => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon)
      })
      return getPokemons(params.pageParam)
    },
    getNextPageParam: (lastPage, pages) => pages.length,

  })
  // const {isLoading, data: pokemons = []} = useQuery({
  //   queryKey: ['pokemons'],
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 60
  // })


  return (
    <View style={[theme.globalMargin, {flex: 1}]}>
      <PokeballBg style={styles.imgPosition} />
      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon,index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{paddingTop: top}}
        ListHeaderComponent={() => (<Text style={{ color: themeContext.theme.colors.text }} variant="headlineLarge">Pokédex</Text>)}
        renderItem={({item}) => <PokemonCard pokemon={item}/>}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.6}
      />
      <FAB
        icon="magnify"
        style={[theme.rightFab, { backgroundColor: themeContext.theme.colors.primary }]}
        mode="elevated"
        color={themeContext.isDark ? 'black' : 'white'}
        onPress={() => router.push('/search')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100
  }
})
export default HomeScreen