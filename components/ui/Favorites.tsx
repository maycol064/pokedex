import { Card, Grid } from '@nextui-org/react';
import { FavoriteCard } from './FavoriteCard';

interface PropsFavorites {
  favoritePokemons: number[];
}

export const Favorites = ({ favoritePokemons }: PropsFavorites) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {favoritePokemons.map((id) => (
        <FavoriteCard id={id} key={id} />
      ))}
    </Grid.Container>
  )
}
