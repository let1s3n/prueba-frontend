import { useState, useEffect } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { Pokemon, PokemonSelected } from '@/types/generalProps';
import CustomPagination from '@/components/modules/CustomPagination/CustomPagination';
import Image from 'next/image';
import TablaResumen from '@/components/modules/TablaResumen/TablaResumen';
import SearchBar from '@/components/elements/SearchBar/SearchBar';
import styles from './Pokedex.module.scss';
const Pokedex = ({
  limit = 20,
  allPokemon,
}: {
  limit: number;
  allPokemon: Pokemon[];
}) => {
  const [pokemonSelected, setPokemonSelected] = useState<PokemonSelected>();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageData, setCurrentPageData] = useState(
    allPokemon.slice(0, limit)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [newDataSet, setNewDataSet] = useState<Pokemon[]>([]);
  const [newDataSetLength, setNewDataSetLength] = useState(0);

  useEffect(() => {
    if (searchTerm === '') {
      const newDataChunk: Pokemon[] = allPokemon.slice(
        currentPage * limit,
        currentPage * limit + limit
      );
      setCurrentPageData(newDataChunk);
    } else {
      if (newDataSetLength > 20) {
        if (newDataSet) {
          let newDataChunk: Pokemon[] = newDataSet?.slice(
            currentPage * limit,
            currentPage * limit + limit
          );
          setCurrentPageData(newDataChunk);
        }
      }
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    setCurrentPage(0);
    if (searchTerm !== '') {
      let newDataChunk: Pokemon[];
      const newDataSet = allPokemon.filter((pokemon) =>
        pokemon.name.includes(searchTerm)
      );

      setNewDataSetLength(newDataSet.length);
      setNewDataSet(newDataSet);
      if (newDataSet.length > 20) {
        newDataChunk = newDataSet.slice(
          currentPage * limit,
          currentPage * limit + limit
        );
        setCurrentPageData(newDataChunk);
      } else {
        setCurrentPageData(newDataSet);
      }
    } else {
      setNewDataSet([]);
      setNewDataSetLength(0);
    }
  }, [searchTerm]);

  const handlePokemonSelection = async (pokemonName: string) => {
    let res = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    ).json();
    setPokemonSelected(res);
  };

  return (
    <Container className="pt-5">
      <Row>
        <Col xs={3}>
          <SearchBar newDataSet={newDataSet} setSearchTerm={setSearchTerm} />
        </Col>
      </Row>
      <Row className={styles.customRow + ' column-gap-5'}>
        <Col className="pt-5">
          <Table className={styles.mainTable} hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData?.map((pokemon: Pokemon, idx) => {
                return (
                  <tr
                    key={pokemon.name}
                    onClick={() => handlePokemonSelection(pokemon.name)}
                  >
                    <td>{pokemon.url.slice(34, -1)}</td>
                    <td>{pokemon.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        {pokemonSelected ? (
          <Col className={'mt-5 ' + styles.columnaDetalle}>
            {pokemonSelected?.sprites.front_default ? (
              <Image
                src={pokemonSelected.sprites.front_default}
                alt="pokemon sprite"
                width={150}
                height={0}
                style={{ height: 'auto' }}
              />
            ) : null}

            <p className={styles.tableParagraph}>
              <span>ID:</span> {pokemonSelected?.id}
            </p>
            <p className={styles.tableParagraph}>
              <span>Orden:</span> {pokemonSelected?.order}
            </p>
            <p className={styles.tableParagraph}>
              <span>Nombre:</span> {pokemonSelected?.name}
            </p>
            <p className={styles.tableParagraph}>
              <span>Experiencia Base:</span> {pokemonSelected?.base_experience}
            </p>
            <p className={styles.tableParagraph}>
              <span>Altura:</span> {pokemonSelected?.height}
            </p>
            <p className={styles.tableParagraph}>
              <span>Peso:</span> {pokemonSelected?.weight}
            </p>
            <p className={styles.tableParagraph}>
              <span>Ubicación de áreas de encuentro:</span>

              {`
              - ${pokemonSelected?.location_area_encounters}
              `}
            </p>
            <p className={styles.tableParagraph}>
              <span className="fw-bold">Habilidades:</span>
              {pokemonSelected?.abilities.map(
                (ability: { ability: { name: string } }) => {
                  return `
                  - ${ability.ability.name} `;
                }
              )}
            </p>
            <p className={styles.tableParagraph}>
              <span className="fw-bold">Sonidos:</span>

              {` 
            - latest: ${pokemonSelected?.cries.latest}
            -legacy: ${pokemonSelected?.cries.legacy}
            `}
            </p>
            <p className={styles.tableParagraph}>
              <span className="fw-bold">Formas:</span>

              {pokemonSelected?.forms.map(
                (form: { name: string; url: string }, idx) =>
                  `
                #${idx + 1}: 
              Name: ${form.name},
              URL: ${form.url} `
              )}
            </p>

            <p className={styles.tableParagraph}>
              <span className="fw-bold">Movimientos:</span>
              {pokemonSelected?.moves.map(
                (
                  moveElem: {
                    move: { name: string; url: string };
                    version_group_details: [];
                  },
                  idx
                ) =>
                  `
                  #${idx + 1}: ${moveElem.move.name}`
              )}
            </p>

            <p className={styles.tableParagraph}>
              <span className="fw-bold">Estadísticas:</span>
              {pokemonSelected?.stats.map(
                (
                  statElem: {
                    base_stat: number;
                    effort: number;
                    stat: { name: string; url: string };
                  },
                  idx
                ) =>
                  `
                  #${idx + 1}: ${statElem.stat.name} `
              )}
            </p>
            <p className={styles.tableParagraph}>
              <span className="fw-bold">Tipos:</span>
              {pokemonSelected?.types.map(
                (
                  typeElem: {
                    slot: number;
                    type: { name: string; url: string };
                  },
                  idx
                ) =>
                  `
                  #${idx + 1}: ${typeElem.type.name} `
              )}
            </p>
          </Col>
        ) : (
          <Col className={'mt-5 ' + styles.columnaDetalle}>
            <p>Selecciona un pokemon y aquí se mostrarán los detalles.</p>
          </Col>
        )}
      </Row>
      <Row className="mt-5">
        {newDataSetLength > 0 ? (
          newDataSetLength > 20 ? (
            <CustomPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={Math.ceil(newDataSetLength / limit) - 1}
            />
          ) : null
        ) : allPokemon.length > 20 ? (
          <CustomPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={Math.ceil(allPokemon.length / limit) - 1}
          />
        ) : null}
      </Row>
      <Row className="mt-5">
        <Col xs="auto">
          <TablaResumen allPokemon={allPokemon} />
        </Col>
      </Row>
    </Container>
  );
};

export default Pokedex;
