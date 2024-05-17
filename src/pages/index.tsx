import React from 'react';
import Home from '@/components/templates/Home/home';
import Head from 'next/head';
import { GetServerSideProps, GetStaticProps } from 'next';
import { Pokemon, PokemonSelected } from '@/types/generalProps';

const index = ({
  paginatedPokemonList,
  allPokemon,
}: {
  paginatedPokemonList: Pokemon[];
  allPokemon: Pokemon[];
}) => {
  return (
    <>
      <Head>
        <title>Defontana | Prueba Frontend</title>
      </Head>
      <Home
        paginatedPokemonList={paginatedPokemonList}
        allPokemon={allPokemon}
      />
    </>
  );
};

export const getStaticProps = (async (context) => {
  const paginatedPokemonList = await fetch('https://pokeapi.co/api/v2/pokemon');
  const resPaginatedPokemonList = await paginatedPokemonList.json();
  const allPokemon = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=1302'
  );
  const resAllPokemon = await allPokemon.json();

  return {
    props: {
      paginatedPokemonList: resPaginatedPokemonList.results,
      allPokemon: resAllPokemon.results,
    },
  };
}) satisfies GetStaticProps<{
  paginatedPokemonList: Pokemon[];
  allPokemon: Pokemon[];
}>;

export default index;
