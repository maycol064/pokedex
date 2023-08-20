import { GetStaticProps, NextPage } from 'next';
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { Layout } from '@/components/layouts';
import { pokeApi } from '@/api';
import { PokeResponse, SmallPokemon } from '@/interfaces';
import { PokemonCard } from '@/components/pokemon';
import Image from 'next/image';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Pokedex with Next.js">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => {
          return (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          );
        })}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokeResponse>('/pokemon?limit=151');

  const pokemons = data.results.map((pokemon, index) => {
    return {
      ...pokemon,
      id: index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        index + 1
      }.svg`,
    };
  });

  return {
    // Estás props son las que recibe el HomePage
    props: { pokemons },
  };
};

export default HomePage;
