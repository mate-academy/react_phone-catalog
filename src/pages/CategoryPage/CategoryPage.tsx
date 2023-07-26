import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';
import { SecondNavBar } from '../../components/SecondNavBar/SecondNavBar';
import { NotFound } from '../../components/NotFound/NotFound';
import { ModelsCounter } from '../../components/ModelsCounter/ModelsCounter';
import { ProductList } from '../../components/ProductList/ProductList';
import { Loader } from '../../components/Loader';
import { getProductByCategory } from '../../api/fetchData';
import './categoryPage.scss';

export const CategoryPage:React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productCount, setProductCount] = useState(products?.length);
  const { pathname } = useLocation();
  const categoryName = pathname.slice(1);

  async function loadProducts() {
    setIsLoading(true);

    try {
      const productsFromServer = await getProductByCategory(categoryName);

      setProducts(productsFromServer);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const handleVisibleProductsNumber = (number: number) => {
    setProductCount(number);
  };

  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && (
        <div className={`page__${categoryName}`}>
          <SecondNavBar />
          <h1 className="main-title">{categoryName}</h1>
          <ModelsCounter number={productCount} />

          {!products.length ? (
            <NotFound
              title={
                `Sorry, we are temporarily not selling ${categoryName}. 
                Please come back in a month.`
              }
            />
          ) : (
            <ProductList
              products={products}
              handleVisibleProductsNumber={handleVisibleProductsNumber}
              isSortDropdownShown
              isPaginationShown
            />
          )}
        </div>
      )}
    </>
  );
};
