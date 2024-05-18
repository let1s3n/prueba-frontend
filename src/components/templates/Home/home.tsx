import Pokedex from '@/components/modules/Pokedex/Pokedex';
import { Pokemon } from '@/types/generalProps';
const Home = ({ allPokemon }: { allPokemon: Pokemon[] }) => {
  return <Pokedex limit={20} allPokemon={allPokemon} />;
};

export default Home;
