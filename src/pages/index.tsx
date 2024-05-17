import React from 'react';
import Home from '@/components/templates/Home/home';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { PokemonProps } from '@/types/generalProps';

const index = ({ paginatedPokemonList, allPokemon }: PokemonProps) => {
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

export const getServerSideProps: GetServerSideProps = async () => {
  const paginatedPokemonList = await fetch('https://pokeapi.co/api/v2/pokemon');
  const resPaginatedPokemonList = await paginatedPokemonList.json();
  const allPokemon = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=1302'
  );
  const resAllPokemon = await allPokemon.json();

  return {
    props: {
      paginatedPokemonList: {
        next: resPaginatedPokemonList.next,
        previous: resPaginatedPokemonList.previous,
        results: resPaginatedPokemonList.results,
      },
      allPokemon: resAllPokemon.results,
    },
  };
};

export default index;
