import Pokedex from '@/components/modules/Pokedex/Pokedex';
import { Pokemon, PokemonSelected } from '@/types/generalProps';

const Home = ({
  paginatedPokemonList,
  allPokemon,
}: {
  paginatedPokemonList: Pokemon[];
  allPokemon: Pokemon[];
}) => {
  return (
    <div>
      <h1>Home</h1>
      <Pokedex
        limit={20}
        paginatedPokemonList={paginatedPokemonList}
        allPokemon={allPokemon}
      />
    </div>
  );
};

export default Home;
