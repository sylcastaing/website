import React, { FC } from 'react';
import PageSeo from '../../../layout/seo/PageSeo';
import ErrorContent from '../content/ErrorContent';
import Head from 'next/head';

interface FullErrorProps {
  statusCode: number;
}

const FullError: FC<FullErrorProps> = ({ statusCode }) => {
  const title = statusCode === 404 ? 'Page non trouvée' : 'Erreur technique';

  return (
    <>
      <PageSeo title={title} />
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <ErrorContent statusCode={statusCode} />
    </>
  );
};

export default FullError;
