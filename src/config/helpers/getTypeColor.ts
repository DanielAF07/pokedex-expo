import { Pokemon, PokemonType } from "@/src/domain/entities/pokemon";

const types: Record<PokemonType, string> = {
  normal: '#A8A878',
  fire: '#dd8241',
  water: '#6486d3',
  electric: '#c4a320',
  grass: '#7bc954',
  ice: '#68d3d3',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#c7a64d',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#b3bf45',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

export const getTypeColor = (pokemonType: PokemonType | PokemonType[]): string | string[] => {
  if(Array.isArray(pokemonType)){
    const typesColors = pokemonType.map(pt => types[pt] ?? 'grey')
    return typesColors
  } else {
    // Not an array
    const type = pokemonType as PokemonType
    return types[type] ?? 'grey';
  }
};