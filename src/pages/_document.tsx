import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="icon" type="image/x-icon" href="/images/favicon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
