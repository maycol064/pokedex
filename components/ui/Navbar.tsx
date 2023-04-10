import Image from 'next/image';
import Link from 'next/link';
import { Container, Grid, Spacer, Text, useTheme } from '@nextui-org/react';
import React from 'react';

export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0px 20px',
        backgroundColor: theme?.colors.accents0.value,
      }}
    >
      <Link href="/" passHref>
        <Container
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
            alt="Pokemon icon"
            width={70}
            height={70}
          />
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            okedex
          </Text>
        </Container>
      </Link>
      <Spacer css={{ flex: 1 }} />
      <Link href="/favorites" passHref>
        <Text color="white">Favorites</Text>
      </Link>
    </div>
  );
};
