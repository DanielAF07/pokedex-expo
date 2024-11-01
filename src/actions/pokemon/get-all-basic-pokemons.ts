import { pokeApi } from "@/src/config/api/pokeApi"
import { maxPokedexId } from "@/src/config/pokedex"
import { PokeAPIPaginatedResponse } from "@/src/infrastructure/interfaces/pokeApi.interface"

export const getAllBasicPokemons = async () => {
  const url = `/pokemon?limit=${maxPokedexId}`
  const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url)

  return data.results.map(info => ({
    name: info.name,
    id: Number(info.url.split('/')[6])
  }))
}