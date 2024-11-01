import { pokeApi } from "@/src/config/api/pokeApi"
import { Pokemon } from "@/src/domain/entities/pokemon"
import { PokeAPIPokemon } from "@/src/infrastructure/interfaces/pokeApi.interface"
import { PokemonMapper } from "@/src/infrastructure/mappers/pokemon.mapper"

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  try {
    const { data } = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${id}`)
    const pokemon = await PokemonMapper.fromPokeApiToEntity(data)
    return pokemon
  } catch (error) {
    throw new Error('Error getting a Pokemon')
  }
}