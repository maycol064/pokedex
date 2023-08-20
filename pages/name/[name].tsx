import { useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { Layout } from '@/components/layouts';
import { pokeApi } from '@/api';
import { PokeResponse, PokemonInfo } from '@/interfaces';
import { getPokemonInfo, localFavorites } from '@/utils';
import confetti from 'canvas-confetti';

interface Props {
  pokemon: PokemonInfo;
}

const wordCap = (word: string): string =>
  word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();

const PokemonPageByName: NextPage<Props> = ({ pokemon }) => {
  const [inFavorites, setInFavorites] = useState<boolean>(localFavorites.existsInFavorites(pokemon.id));

  const onToggleFavorite = () => {
    localFavorites.toggleFavorites(pokemon.id);
    setInFavorites((prevInFavorites) => !prevInFavorites); // Usar el valor previo
    if (inFavorites) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 0.5,
        y: 0.5
      }
    });
  };

  return (
    <Layout title={wordCap(pokemon.name)}>
      <Grid.Container css={{ mt: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ p: '30px' }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  'images/no-image.png'
                }
                alt={pokemon.name}
                width="100%"
                height="200px"
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button color={inFavorites ? 'gradient' : 'default'} ghost={!inFavorites} onPress={onToggleFavorite}>
                In favorites
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container display="flex">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await pokeApi.get<PokeResponse>('/pokemon?limit=151');
  const pokemonsNames: string[] = data.results.map(pokemon => pokemon.name);
  return {
    // paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }],
    paths: pokemonsNames.map((name) => ({
      params: { name },
    })),
    fallback: 'blocking', // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  const pokemon = await getPokemonInfo(name.toLowerCase());

  if (pokemon === null) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    // Estás props son las que recibe el HomePage
    props: { pokemon },
    revalidate: 86400,
  };
};

export default PokemonPageByName;
