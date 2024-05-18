import React from 'react';
import Home from '@/components/templates/Home/home';
import Head from 'next/head';
import { GetServerSideProps, GetStaticProps } from 'next';
import { Pokemon, PokemonSelected } from '@/types/generalProps';

const index = ({
  allPokemon,
}: {
  allPokemon: Pokemon[];
}) => {
  return (
    <>
      <Head>
        <title>Defontana | Prueba Frontend</title>
      </Head>
      <Home
        allPokemon={allPokemon}
      />
    </>
  );
};

export const getStaticProps = (async (context) => {
  const allPokemon = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=1302'
  );
  const resAllPokemon = await allPokemon.json();

  return {
    props: {
      allPokemon: resAllPokemon.results,
    },
  };
}) satisfies GetStaticProps<{
  allPokemon: Pokemon[];
}>;

export default index;
