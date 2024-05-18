import { Container, Table, Row, Col } from 'react-bootstrap';
import { Pokemon } from '@/types/generalProps';
const TablaResumen = ({ allPokemon }: { allPokemon: Pokemon[] }) => {
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
    <Table hover size="sm">
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
  );
};

export default TablaResumen;
