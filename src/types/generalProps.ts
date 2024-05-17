export type Pokemon = { name: string; url: string };
export type PokemonProps = {
  paginatedPokemonList: Pokemon[];
  allPokemon: Pokemon[];
};

export type PokemonSelected = {
  abilities: [];
  base_experience: number;
  cries: { latest: string; legacy: string };
  forms: [];
  game_indices: [];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: [];
  name: string;
  order: number;
  past_abilities: [];
  past_types: [];
  species: {};
  sprites: { front_default: string };
  stats: [];
  types: [];
  weight: number;
};
