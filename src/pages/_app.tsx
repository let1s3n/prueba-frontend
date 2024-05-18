import type { AppProps } from 'next/app';
import Head from 'next/head';
import { lato } from '@/lib/fonts';
import '@/sass/app.scss';
import DefaultLay from '@/components/layout/DefaultLayout/DefaultLay';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=2"
        />
      </Head>
      <main className={lato.className}>
        <DefaultLay>
          <style jsx global>{`
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              font-family: ${lato.style.fontFamily};
            }
          `}</style>
          <Component {...pageProps} />
        </DefaultLay>
      </main>
    </>
  );
}
