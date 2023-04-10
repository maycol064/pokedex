// pages/_app.js

// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react';
import { AppProps } from 'next/app';
import { darkTheme } from '@/themes';

function MyApp({ Component, pageProps }: AppProps) {
  // 2. Use at the root of your app
  return (
    <NextUIProvider theme={darkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
