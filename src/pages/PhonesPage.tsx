import React, { useState } from 'react';
import './page.scss';
import { Product } from '../types/Product';

import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { ProductsContent } from '../components/ProductsContent/ProductsContent';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';

type Props = {
  phones: Product[];
  isError: boolean;
};

export const PhonesPage: React.FC<Props> = ({ phones, isError }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="page">
      <Header search="phones" setQuery={setQuery} />

      <div className="page__content">
        {isError
          ? (
            <ErrorMessage />
          ) : (
            <ProductsContent
              products={phones}
              query={query}
              title="Mobile phones"
              categoryName="Phones"
            />
          )}
      </div>

      <Footer />
    </div>
  );
};
