import { Card, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";

interface PropsFavoriteCard {
  id: number;
}

export const FavoriteCard = ({ id }: PropsFavoriteCard) => {
  const { push } = useRouter();

  const handleClick = (id: number) => push(`/pokemon/${id}`);

  return (
    <Grid key={id} xs={6} md={2} xl={1}>
      <Card isHoverable isPressable css={{ padding: 10 }} onClick={() => handleClick(id)}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          width={'100%'}
          height={'140px'}
        />
      </Card>
    </Grid>
  )
}
