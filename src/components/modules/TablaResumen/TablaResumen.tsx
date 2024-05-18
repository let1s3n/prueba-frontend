import { Table } from 'react-bootstrap';
import { Pokemon } from '@/types/generalProps';
import Image from 'next/image';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import styles from './TablaResumen.module.scss';
const TablaResumen = ({ allPokemon }: { allPokemon: Pokemon[] }) => {
  const { width, height } = useWindowDimensions();
  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  return (
    <div className="position-relative">
      <Table className={styles.tablaResumen} hover size="sm">
        <thead>
          <tr>
            <th>Letra</th>
            <th>Cantidad de pokemones cuyo nombre inicia con esta letra</th>
          </tr>
        </thead>
        <tbody>
          {alphabet.map((letter, idx) => {
            let filteredPokemon = allPokemon.filter((pokemon) =>
              pokemon.name.startsWith(letter)
            );
            return (
              <tr key={idx}>
                <td>{letter}</td>
                <td>{filteredPokemon.length}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Image
        className={
          styles.imagenPokemon + ' ' + styles['imagenPokemon--bulbasaur']
        }
        src="/images/pokemons/bulbasaurBG.png"
        alt="Bulbasaur image"
        width={300}
        height={0}
        style={{ height: 'auto' }}
        sizes="(max-width: 768px) 75px, 300px"
      />
      <Image
        className={
          styles.imagenPokemon + ' ' + styles['imagenPokemon--squirtle']
        }
        src="/images/pokemons/squirtleBG.png"
        alt="Squirtle image"
        width={300}
        height={0}
        style={{ height: 'auto' }}
        sizes="(max-width: 768px) 75px, 300px"
      />
      <Image
        className={
          styles.imagenPokemon + ' ' + styles['imagenPokemon--charmander']
        }
        src="/images/pokemons/charmanderBG.png"
        alt="Charmander image"
        width={300}
        height={0}
        style={{ height: 'auto' }}
        sizes="(max-width: 768px) 75px, 300px"
      />
    </div>
  );
};

export default TablaResumen;
