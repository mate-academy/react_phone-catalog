import React from 'react';
import '../styles/NoProductMessage.scss';

interface Props {
  title: string;
}

const NoProductsMessage: React.FC<Props> = ({ title }) => {
  return (
    <main className="main">
      <h1 className="no-products-title container">{`${title} are not available yet.`}</h1>
    </main>
  );
};

export default NoProductsMessage;
