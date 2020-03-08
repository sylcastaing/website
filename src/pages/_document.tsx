import React from 'react';
import Document, { DocumentContext, DocumentInitialProps, Head, Main, NextScript } from 'next/document';

import { ServerStyleSheet } from 'styled-components';
import theme from '../styles/theme';

class WebsiteDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [...(initialProps.styles ? [initialProps.styles] : []), ...sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const colorBar = theme.colors.primary;

    return (
      <html lang="fr">
        <Head>
          <meta name="theme-color" content={colorBar} />

          <link href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap" rel="stylesheet" />

          <link rel="preload" as="style" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" />

          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <meta name="msapplication-TileColor" content={colorBar} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default WebsiteDocument;
