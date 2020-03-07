import React, { FC } from 'react';

interface ErrorContentProps {
  statusCode: number;
}

const ErrorContent: FC<ErrorContentProps> = () => {
  return <div>Erreur</div>;
};

export default ErrorContent;
