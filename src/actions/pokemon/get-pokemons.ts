import type { PokeAPIPaginatedResponse, PokeAPIPokemon } from "@/src/infrastructure/interfaces/pokeApi.interface"
import { pokeApi } from "../../config/api/pokeApi"
import { Pokemon } from "../../domain/entities/pokemon"
import { PokemonMapper } from "@/src/infrastructure/mappers/pokemon.mapper"

export const getPokemons = async (page: number, limit: number = 20): Promise<Pokemon[]> => {
  try {
    const url = '/pokemon'
    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url, {
      params: {
        offset: page * limit,
        limit
      }
    })

    const pokemonPromises = data.results.map((info) => {
      return pokeApi.get<PokeAPIPokemon>(info.url)
    })
    const pokeApiPokemons = await Promise.all(pokemonPromises)
    const pokemons = pokeApiPokemons.map(item => PokemonMapper.fromPokeApiToEntity(item.data))

    return pokemons
  } catch (error) {
    throw new Error('Error getting Pokemons')
  }
}