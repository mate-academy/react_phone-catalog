import React, { useState } from 'react';
import './page.scss';
import { Product } from '../types/Product';

import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { ProductsContent } from '../components/ProductsContent/ProductsContent';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';

type Props = {
  tablets: Product[];
  isError: boolean;
};

export const TabletsPage: React.FC<Props> = ({ tablets, isError }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="page">
      <Header search="tablets" setQuery={setQuery} />

      <div className="page__content">
        {isError
          ? (
            <ErrorMessage />
          ) : (
            <ProductsContent
              products={tablets}
              query={query}
              title="Tablets"
              categoryName="Tablets"
            />
          )}
      </div>

      <Footer />
    </div>
  );
};
