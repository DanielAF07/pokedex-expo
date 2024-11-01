import { Pokemon } from "@/src/domain/entities/pokemon"
import { getPokemonById } from "./get-pokemon-by-id"

export const getPokemonsById = async(ids: number[]): Promise<Pokemon[]> => {
  try {
    const pokemonPromises: Promise<Pokemon>[] = ids.map(getPokemonById)

    return Promise.all(pokemonPromises)
  } catch (error) {
    throw new Error('Error getting - Pokemons By Ids')
  }
}