import { theme } from '@/src/config/theme/global-theme'
import { View, FlatList } from 'react-native'
import { ActivityIndicator, Text, TextInput, useTheme } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PokemonCard from '../../components/pokemon/PokemonCard'
import { useContext, useMemo, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { useQuery } from '@tanstack/react-query'
import { getAllBasicPokemons, getPokemonsById } from '@/src/actions/pokemon'
import FullScreenLoader from '../../components/ui/FullScreenLoader'
import useDebouncedValue from '../../hooks/useDebouncedValue'
const SearchScreen = () => {
  const { top } = useSafeAreaInsets()
  const themeContext = useContext(ThemeContext)
  const [searchTerm, setSearchTerm] = useState('')
  
  const debouncedSearchTerm = useDebouncedValue(searchTerm)

  const { isLoading, data: pokemonNameList = [] } = useQuery({
    queryKey: ['pokemon', 'all'],
    queryFn: () => getAllBasicPokemons()
  })

  const pokemonNameIdList = useMemo(() => {
    // Is a number
    if(!isNaN(Number(debouncedSearchTerm))){
      const pokemon = pokemonNameList.find(pokemon => pokemon.id === Number(debouncedSearchTerm))
      return pokemon ? [pokemon] : []
    }

    // Is a string
    if(debouncedSearchTerm.length < 3) return []
    
    return pokemonNameList.filter(pokemon => 
      pokemon.name.includes(debouncedSearchTerm.toLocaleLowerCase())
    )
  }, [debouncedSearchTerm])

  const { isLoading: isLoadingSearch, data: pokemons = [] } = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () => getPokemonsById(pokemonNameIdList.map((pokemon) => pokemon.id)),
    staleTime: 1000*60*5
  })

  if(isLoading) {
    return <FullScreenLoader />
  }

  return (
    <View style={[theme.globalMargin, {paddingTop: top}]}>
      <TextInput
        placeholder='Search Pokémon'
        mode='flat'
        autoFocus
        autoCorrect={false}
        onChangeText={setSearchTerm}
        value={searchTerm}
        textColor={themeContext.isDark ? 'white' : 'black'}
        placeholderTextColor={themeContext.isDark ? 'white' : 'black'}
      />
      { isLoadingSearch && <ActivityIndicator style={{paddingTop: 20}} />}
      { !isLoadingSearch && (
        <FlatList
          data={pokemons}
          keyExtractor={(pokemon,index) => `${pokemon.id}-${index}`}
          numColumns={2}
          style={{paddingTop: top}}
          renderItem={({item}) => <PokemonCard pokemon={item}/>}
          ListFooterComponent={<View style={{height: 120}}/>}
        />
      )}
      
    </View>
  )
}
export default SearchScreen