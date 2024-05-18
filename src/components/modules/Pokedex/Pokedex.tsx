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
  const [newDataSet, setNewDataSet] = useState<Pokemon[]>(allPokemon);

  useEffect(() => {
    console.log('newDataSetDayana: ', newDataSet);
  }, [newDataSet]);

  useEffect(() => {
    if (searchTerm === '') {
      const newDataChunk: Pokemon[] = allPokemon.slice(
        currentPage * limit,
        currentPage * limit + limit
      );
      setCurrentPageData(newDataChunk);
    } else {
      dividirDataPorPagina(newDataSet);
    }
  }, [currentPage, searchTerm, newDataSet]);

  useEffect(() => {
    setCurrentPage(0);
    if (searchTerm !== '') {
      const newDataSet = allPokemon.filter((pokemon) =>
        pokemon.name.includes(searchTerm)
      );
      if (newDataSet) {
        setNewDataSet(newDataSet);
        dividirDataPorPagina(newDataSet);
      }
    } else {
      setNewDataSet([]);
    }
  }, [searchTerm]);

  const dividirDataPorPagina = (newDataSet: any) => {
    if (newDataSet.length > 20) {
      let newDataChunk: Pokemon[] = newDataSet.slice(
        currentPage * limit,
        currentPage * limit + limit
      );
      setCurrentPageData(newDataChunk);
    } else {
      setCurrentPageData(newDataSet);
    }
  };
  const handlePokemonSelection = async (pokemonName: string) => {
    let res = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    ).json();
    setPokemonSelected(res);
  };

  return (
    <Container className={styles.pokedexContainer + ' pt-5 position-relative'}>
      <Row className="justify-content-center">
        <Col xs={12} md={3}>
          <SearchBar newDataSet={newDataSet} setSearchTerm={setSearchTerm} />
        </Col>
      </Row>
      <Row className={styles.customRow}>
        <Col xs={12} md={5} className="pt-5 position-relative">
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
                    className={styles.mainTableItem}
                  >
                    <td>{pokemon.url.slice(34, -1)}</td>
                    <td>{pokemon.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Image
            className={
              styles.imagenPokemon + ' ' + styles['imagenPokemon--pikachu']
            }
            src="/images/pokemons/pikachuBG2.png"
            alt="Pikachu image"
            width={300}
            height={0}
            style={{ height: 'auto' }}
          />
        </Col>
        {pokemonSelected ? (
          <Col xs={12} md={6} className={'mt-5 ' + styles.columnaDetalle}>
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
              <span>Ubicación:</span>

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
          <Col xs={12} md={6} className={'mt-5 ' + styles.columnaDetalle}>
            <p>Selecciona un pokemon y aquí se mostrarán los detalles.</p>
          </Col>
        )}
      </Row>
      <Row className="mt-5">
        {newDataSet.length > 0 ? (
          newDataSet.length > 20 ? (
            <CustomPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={Math.ceil(newDataSet.length / limit) - 1}
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
      <Row className="mt-5 justify-content-center">
        <Col xs="auto" md={6}>
          <TablaResumen allPokemon={allPokemon} />
        </Col>
      </Row>
    </Container>
  );
};

export default Pokedex;
