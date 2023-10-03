import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getProducts } from '../../api/fetchClient';
import {
  ErrorNotification,
} from '../../components/ErrorNotification/ErrorNotification';
import { Loader } from '../../components/Loader/Loader';
import {
  ProductsPageContent,
} from '../../components/ProductsPageContent/ProductsPageContent';
import { pageData } from '../../data/pageData';
import { Product } from '../../types/Product';

export const Phones: React.FC = () => {
  const { pathname } = useLocation();

  const [phones, setPhones] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentPage = pageData.find(page => page.link === pathname.slice(1));

  useEffect(() => {
    getProducts()
      .then(productsFromServer => {
        const newProducts = productsFromServer
          .filter(product => product.category === pathname.slice(1));

        setPhones(newProducts);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isShow = {
    errorMessage: !isLoading && isError,
    pageContent: !isLoading && !isError,
  };

  return (
    <>
      {isShow.errorMessage && <ErrorNotification />}

      {isLoading && <Loader />}

      {isShow.pageContent && currentPage
        && <ProductsPageContent data={currentPage} products={phones} />}
    </>
  );
};
