import Pokedex from '@/components/modules/Pokedex/Pokedex';
import { PokemonProps } from '@/types/generalProps';

const Home = ({ paginatedPokemonList, allPokemon }: PokemonProps) => {
  return (
    <div>
      <h1>Home</h1>
      <Pokedex
        paginatedPokemonList={paginatedPokemonList}
        allPokemon={allPokemon}
      />
    </div>
  );
};

export default Home;
