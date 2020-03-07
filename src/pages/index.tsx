import React from 'react';
import { NextPage } from 'next';
import Home from '../modules/home/components/Home';
import {
  getPrismicDocumentByType,
  getPrismicPageInitialProps,
  PrismicPageInitialProps,
  renderPrismicPage,
} from '../core/prismic';
import { PrismicHomeContent } from '../modules/home/model';
import { pipe } from 'fp-ts/lib/pipeable';

const HomePage: NextPage<PrismicPageInitialProps<PrismicHomeContent>> = ({ document }) =>
  pipe(
    document,
    renderPrismicPage(document => <Home document={document} />),
  );

HomePage.getInitialProps = getPrismicPageInitialProps(ctx => getPrismicDocumentByType<PrismicHomeContent>('home')(ctx));

export default HomePage;
