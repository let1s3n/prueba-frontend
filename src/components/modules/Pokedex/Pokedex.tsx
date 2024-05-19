import { useState, useEffect } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { Pokemon, PokemonSelected } from '@/types/generalProps';
import CustomPagination from '@/components/modules/CustomPagination/CustomPagination';
import Image from 'next/image';
import TablaResumen from '@/components/modules/TablaResumen/TablaResumen';
import SearchBar from '@/components/elements/SearchBar/SearchBar';
import { imageData } from '@/lib/placeholder';
import styles from './Pokedex.module.scss';
const Pokedex = ({
  limit,
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
    if (searchTerm === '') {
      const newDataChunk: Pokemon[] = newDataSet.slice(
        currentPage * limit,
        currentPage * limit + limit
      );
      setCurrentPageData(newDataChunk);
    } else {
      dividirDataPorPagina(newDataSet);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    setCurrentPage(0);
    let data = allPokemon.filter((pokemon) =>
      pokemon.name.includes(searchTerm)
    );
    if (searchTerm !== '') {
      setNewDataSet(data);
      dividirDataPorPagina(data);
    } else {
      setNewDataSet(allPokemon);
    }
  }, [searchTerm]);

  const dividirDataPorPagina = (newDataSet: any) => {
    if (newDataSet.length > limit) {
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
    try {
      let res = await (
        await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      ).json();
      setPokemonSelected(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      fluid
      className={styles.pokedexContainer + ' pt-2 pt-md-5 position-relative'}
    >
      <Row className="justify-content-center">
        <Col xs={12} xl={3}>
          <SearchBar
            allPokemon={allPokemon}
            setSearchTerm={setSearchTerm}
            pokemonSelected={pokemonSelected}
          />
        </Col>
      </Row>
      <Row className={styles.customRow}>
        <div className={styles.divider}></div>

        <div className={styles.blackCross}>
          <p>+</p>
          <div className={styles.whiteDot}></div>
        </div>
        <div className={styles.greenBox}></div>
        <div className={styles.blackButton}></div>
        <div className={styles.redEllipse + ' rounded-pill'}></div>
        <div className={styles.blackEllipse + ' rounded-pill'}></div>

        <Image
          className={
            styles.imagenPokemon + ' ' + styles['imagenPokemon--pikachu']
          }
          src="/images/pokemons/pikachuBG2.png"
          alt="Pikachu image"
          width={300}
          height={0}
          style={{ width: '300px', height: 'auto' }}
          priority
        />
        <div className={styles.blueLed}></div>
        <div className={styles.semaforo + ' position-absolute'}>
          <div className={styles.redLed}></div>
          <div className={styles.yellowLed}></div>
          <div className={styles.greenLed}></div>
        </div>
        <Col xs={12} xl={5} className={styles.columnaGeneral + ' g-0'}>
          <div className={styles.fondoTabla}>
            <Table variant="dark" className={styles.mainTable} hover size="sm">
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
          </div>
        </Col>
        {pokemonSelected ? (
          <Col xs={12} xl={5} className={styles.columnaDetalle + ' g-0'}>
            <div className={styles.pokemonSelectedImageContainer}>
              {pokemonSelected.sprites.other['official-artwork']
                .front_default ? (
                <Image
                  src={
                    pokemonSelected.sprites.other['official-artwork']
                      .front_default
                  }
                  className={styles.pokemonSelectedImage}
                  alt="pokemon sprite"
                  width={250}
                  height={250}
                  /* style={{ height: 'auto' }} */
                  placeholder="blur"
                  blurDataURL={imageData}
                />
              ) : pokemonSelected.sprites.front_default ? (
                <Image
                  src={pokemonSelected.sprites.front_default}
                  alt="pokemon sprite"
                  width={250}
                  height={250}
                  /* style={{ height: 'auto' }} */
                  placeholder="blur"
                  blurDataURL={imageData}
                />
              ) : null}
            </div>
            <div className="p-3">
              <h4 className="py-4 fw-bold">Datos Generales</h4>
              <div className={styles.datosGeneralesContainer}>
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
                  <span>Experiencia Base:</span>{' '}
                  {pokemonSelected?.base_experience}
                </p>
                <p className={styles.tableParagraph}>
                  <span>Altura:</span> {pokemonSelected?.height}
                </p>
                <p className={styles.tableParagraph}>
                  <span>Peso:</span> {pokemonSelected?.weight}
                </p>
              </div>
              <h5 className="py-4 fw-bold">Otros</h5>
              <div className={styles.datosOtrosContainer}>
                <p className={styles.tableParagraph}>
                  <span>Ubicación:</span>
                  <br />
                  <a
                    href={pokemonSelected?.location_area_encounters}
                    target="_blank"
                  >
                    Link de ubicación
                  </a>
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
                  <br />
                  <a href={`${pokemonSelected?.cries.latest}`} target="_blank">
                    {' '}
                    latest
                  </a>
                  <br />
                  <a href={`${pokemonSelected?.cries.legacy}`} target="_blank">
                    legacy
                  </a>
                </p>
                <p className={styles.tableParagraph}>
                  <span className="fw-bold">Formas:</span>
                  <div className="d-flex">
                    {pokemonSelected?.forms.map(
                      (form: { name: string; url: string }, idx) => (
                        <p key={idx}>
                          {idx + 1}: Name: {form.name},{' '}
                          <a href={form.url} target="_blank">
                            link
                          </a>
                        </p>
                      )
                    )}
                  </div>
                </p>

                <div className={styles.tableParagraph}>
                  <span className="fw-bold">Movimientos:</span>
                  <div className={styles.movimientosContainer}>
                    {pokemonSelected?.moves.map(
                      (
                        moveElem: {
                          move: { name: string; url: string };
                          version_group_details: [];
                        },
                        idx
                      ) => (
                        <p key={idx}>
                          {idx + 1}: {moveElem.move.name}
                        </p>
                      )
                    )}
                  </div>
                </div>

                <p className={styles.tableParagraph}>
                  <span className="fw-bold">Estadísticas:</span>
                  <div className="d-flex">
                    {pokemonSelected?.stats.map(
                      (
                        statElem: {
                          base_stat: number;
                          effort: number;
                          stat: { name: string; url: string };
                        },
                        idx
                      ) => (
                        <p key={idx}>
                          #{idx + 1}: {statElem.stat.name}
                        </p>
                      )
                    )}
                  </div>
                </p>
                <p className={styles.tableParagraph}>
                  <span className="fw-bold">Tipos:</span>
                  <div className="d-flex">
                    {pokemonSelected?.types.map(
                      (
                        typeElem: {
                          slot: number;
                          type: { name: string; url: string };
                        },
                        idx
                      ) => (
                        <p key={idx}>
                          #{idx + 1}: {typeElem.type.name}
                        </p>
                      )
                    )}
                  </div>
                </p>
              </div>
            </div>
          </Col>
        ) : (
          <Col xs={12} xl={5} className={styles.columnaDetalle + ' g-0 p-5'}>
            <h2>Selecciona un pokemon...</h2>
          </Col>
        )}
      </Row>
      <Row className="mt-5">
        {newDataSet.length > limit ? (
          <CustomPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={Math.ceil(newDataSet.length / limit) - 1}
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
