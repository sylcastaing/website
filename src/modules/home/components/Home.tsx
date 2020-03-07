import React, { FC } from 'react';
import HomeHeader from './header/HomeHeader';
import { getSeoElements, PrismicDocument } from '../../../core/prismic';
import { PrismicHomeContent } from '../model';
import PageSeo from '../../../layout/seo/PageSeo';

interface HomeProps {
  document: PrismicDocument<PrismicHomeContent>;
}

const Home: FC<HomeProps> = ({ document }) => {
  const seo = getSeoElements(document);

  const content = document.data;

  return (
    <>
      <PageSeo canonical="home" {...seo} />
      <HomeHeader content={content} />
    </>
  );
};

export default Home;
