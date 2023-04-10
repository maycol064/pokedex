import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { Navbar } from "../ui";

interface PropsLayout extends PropsWithChildren {
  title: string;
}

export const Layout: FC<PropsLayout> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon APP'}</title>
        <meta name="author" content="Myke Flores" />
        <meta name="description" content="Información del Pokemon ???" />
        <meta name="keywords" content="??? pokemon pokedex" />
      </Head>
      <Navbar />
      <main style={{ padding: '10px 20px' }}>
        {children}
      </main>
    </>
  );
};
