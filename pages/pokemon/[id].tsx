import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Layout } from '@/components/layouts';
import { pokeApi } from '@/api';
import { PokemonInfo } from '@/interfaces';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

interface Props {
  pokemon: PokemonInfo;
}

const wordCap = (word: string): string =>
  word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
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
              <Button color="gradient" ghost>
                Save in favorites
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
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);
  return {
    // paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }],
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<PokemonInfo>(`/pokemon/${id}`);

  return {
    // Estás props son las que recibe el HomePage
    props: { pokemon: data },
  };
};

export default PokemonPage;
