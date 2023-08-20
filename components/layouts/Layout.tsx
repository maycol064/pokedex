import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { Navbar } from "../ui";
import Image from "next/image";

interface PropsLayout extends PropsWithChildren {
  title: string;
}

const origin = (typeof window === "undefined") ? '' : window.location.origin;

export const Layout: FC<PropsLayout> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon APP'}</title>
        <meta name="author" content="Myke Flores" />
        <meta name="description" content="Información del Pokemon ???" />
        <meta name="keywords" content="??? pokemon pokedex" />
        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta property="og:description" content={`Página sobre sobre ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner-pokemon.jpg`} />
      </Head>
      <Navbar />
      <main style={{ padding: '10px 20px' }}>
        {children}
      </main>
    </>
  );
};
