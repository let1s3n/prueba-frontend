import { useState, useEffect } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { Pokemon, PokemonSelected } from '@/types/generalProps';
import CustomPagination from '@/components/modules/CustomPagination/CustomPagination';
import Image from 'next/image';
import TablaResumen from '@/components/modules/TablaResumen/TablaResumen';
import styles from './Pokedex.module.scss';
const Pokedex = ({
  limit = 20,
  paginatedPokemonList,
  allPokemon,
}: {
  limit: number;
  paginatedPokemonList: Pokemon[];
  allPokemon: Pokemon[];
}) => {
  const [pokemonSelected, setPokemonSelected] = useState<PokemonSelected>();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageData, setCurrentPageData] = useState(paginatedPokemonList);

  useEffect(() => {
    const newData: Pokemon[] = allPokemon.slice(
      currentPage * limit,
      currentPage * limit + limit
    );
    setCurrentPageData(newData);
  }, [currentPage]);

  const handlePokemonSelection = async (pokemonName: string) => {
    let res = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    ).json();
    setPokemonSelected(res);
  };

  return (
    <Container className="pt-5">
      <Row className="column-gap-5">
        <Col className="pt-5">
          <Table hover size="sm">
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
          <Col className={styles.columnaDetalle}>
            {pokemonSelected?.sprites.front_default ? (
              <Image
                src={pokemonSelected.sprites.front_default}
                alt="pokemon sprite"
                width={150}
                height={0}
                style={{ height: 'auto' }}
              />
            ) : null}

            <p>ID: {pokemonSelected?.id}</p>
            <p>Orden: {pokemonSelected?.order}</p>
            <p>Nombre: {pokemonSelected?.name}</p>
            <p>Experiencia Base: {pokemonSelected?.base_experience}</p>
            <p>Altura: {pokemonSelected?.height}</p>
            <p>Peso: {pokemonSelected?.weight}</p>
            <p>
              Ubicación de áreas de encuentro:{' '}
              {pokemonSelected?.location_area_encounters}
            </p>
            <p>
              Habilidades:{' '}
              {pokemonSelected?.abilities.map(
                (ability: { ability: { name: string } }) =>
                  ability.ability.name + ' '
              )}
            </p>
            <p>
              {`Sonidos: 
            - latest: ${pokemonSelected?.cries.latest}
            -legacy: ${pokemonSelected?.cries.legacy}
            `}
            </p>
            <p>
              Formas:{' '}
              {pokemonSelected?.forms.map(
                (form: { name: string; url: string }, idx) =>
                  `#${idx + 1}: 
              Name: ${form.name},
              URL: ${form.url}
              `
              )}
            </p>
            {/* <p>
            Índices de Juego:{' '}
            {pokemonSelected?.game_indices.map(
              (
                gameIndex: {
                  game_index: number;
                  version: { name: string; url: string };
                },
                idx
              ) =>
                `#${idx + 1}: 
            #: ${gameIndex.game_index},
              Version: 
              - Nombre: ${gameIndex.version.name}
              - URL: ${gameIndex.version.url}
              `
            )}
          </p>
          <p>
            Artículos Retenidos:{' '}
            {pokemonSelected?.held_items.map(
              (
                heldItem: {
                  item: { name: string; url: string };
                  version_details: [];
                },
                idx
              ) =>
                `#${idx + 1}: 
                Nombre: ${heldItem.item.name}
              `
            )}
          </p> */}
            <p>
              Movimientos:
              {pokemonSelected?.moves.map(
                (
                  moveElem: {
                    move: { name: string; url: string };
                    version_group_details: [];
                  },
                  idx
                ) =>
                  `#${idx + 1}: 
              Nombre: ${moveElem.move.name}
              `
              )}
            </p>

            <p>
              Estadísticas:{' '}
              {pokemonSelected?.stats.map(
                (
                  statElem: {
                    base_stat: number;
                    effort: number;
                    stat: { name: string; url: string };
                  },
                  idx
                ) =>
                  `#${idx + 1}: 
                Nombre: ${statElem.stat.name}
              `
              )}
            </p>
            <p>
              Tipos:
              {pokemonSelected?.types.map(
                (
                  typeElem: {
                    slot: number;
                    type: { name: string; url: string };
                  },
                  idx
                ) =>
                  `#${idx + 1}: 
                Nombre: ${typeElem.type.name}
              `
              )}{' '}
            </p>
          </Col>
        ) : (
          <Col className={styles.columnaDetalle}>
            <p>Selecciona un pokemon y aquí se mostrarán los detalles.</p>
          </Col>
        )}
      </Row>
      <Row className="mt-5">
        <CustomPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={Math.ceil(allPokemon.length / limit) - 1}
        />
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
