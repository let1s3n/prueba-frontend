import Pokedex from '@/components/modules/Pokedex/Pokedex';
import { Pokemon, PokemonSelected } from '@/types/generalProps';

const Home = ({
  allPokemon,
}: {
  allPokemon: Pokemon[];
}) => {
  return (
    <div>
      <h1>Home</h1>
      <Pokedex
        limit={20}
        allPokemon={allPokemon}
      />
    </div>
  );
};

export default Home;
