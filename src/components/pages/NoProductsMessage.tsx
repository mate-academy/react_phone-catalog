import React from 'react';
import GoBackLink from '../Blocks/GoBackLink';

interface Props {
  title: string;
}

const NoProductsMessage: React.FC<Props> = ({ title }) => {
  return (
    <main className="not-found">
      <h1 className="no-products-title">{`${title} are not available yet.`}</h1>

      <GoBackLink />
    </main>
  );
};

export default NoProductsMessage;
