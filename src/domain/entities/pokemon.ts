export type PokemonType = 
  | 'normal' 
  | 'fire' 
  | 'water' 
  | 'electric' 
  | 'grass' 
  | 'ice' 
  | 'fighting' 
  | 'poison' 
  | 'ground' 
  | 'flying' 
  | 'psychic' 
  | 'bug' 
  | 'rock' 
  | 'ghost' 
  | 'dragon' 
  | 'dark' 
  | 'steel' 
  | 'fairy';

export interface Pokemon {
  id: number
  name: string
  types: PokemonType[]
  avatar: string
  sprites: string[]

  games: string[]
  stats: Stat[]
  abilities: string[]
  moves: Move[]
}

export interface Stat {
  name: string
  value: number
}

export interface Move {
  name: string
  level: number
}