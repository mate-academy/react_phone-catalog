import React, { useState } from 'react';
import './page.scss';
import { Product } from '../types/Product';

import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { ProductsContent } from '../components/ProductsContent/ProductsContent';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';

type Props = {
  accessories: Product[];
  isError: boolean;
};

export const AccessoriesPage: React.FC<Props> = ({ accessories, isError }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="page">
      <Header search="accessories" setQuery={setQuery} />

      <div className="page__content">
        {isError
          ? (
            <ErrorMessage />
          ) : (
            <ProductsContent
              products={accessories}
              query={query}
              title="Accessories"
              categoryName="Accessories"
            />
          )}
      </div>

      <Footer />
    </div>
  );
};
