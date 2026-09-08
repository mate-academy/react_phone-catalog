import React, { useEffect, useState } from 'react';
import { Tablet } from '../../types/Tablet';
import { Link, useParams } from 'react-router-dom';
import { fetchProducts } from '../../utils/fetchProducts';
import { getTablets } from '../../utils/getData';
import { getRecommendedTablets } from '../../utils/getRecommended';
import classNames from 'classnames';
import { Loader } from '../../components/Loader';
import { ProductDescription } from '../../components/ProductDescription';
import { ProductsList } from '../../components/ProductsMain';
import { ProductsCategory } from '../../types/ProductsCategory';
import { Product } from '../../types/Product';

export const TabletsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendedTablet, setRecommendedTablet] = useState<Product[]>([]);
  const [selectedTablet, setSelectedTablet] = useState<Tablet | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(false);
  const { tabletId } = useParams<{ tabletId: string }>();

  useEffect(() => {
    const loadProducts = async () => {
      const sortedProducts = await fetchProducts();

      setProducts(sortedProducts);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getTablets()
      .then(loadedTablets => {
        const neededTablet = loadedTablets.find(
          tablet => tablet.id === tabletId,
        );

        setSelectedTablet(neededTablet);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [tabletId]);

  useEffect(() => {
    const recommended = getRecommendedTablets(products);

    setRecommendedTablet(recommended);
  }, [products]);

  return (
    <>
      <div className="breadcrumbs">
        <Link to={'/'} className="breadcrumbs__home"></Link>
        <div className="breadcrumbs__arrow"></div>
        <Link
          to={'/tablets'}
          className={classNames('breadcrumbs__route', {
            'breadcrumbs__route--main': tabletId,
          })}
        >
          Tablets
        </Link>
        {tabletId && (
          <>
            <div className="breadcrumbs__arrow"></div>
            <p className="breadcrumbs__route breadcrumbs__route--last">
              {selectedTablet?.name}
            </p>
          </>
        )}
      </div>
      {tabletId ? (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <ProductDescription
              selectedProduct={selectedTablet}
              recommendedItems={recommendedTablet}
              productId={tabletId}
            />
          )}
        </>
      ) : (
        <ProductsList productsCategory={ProductsCategory.TABLETS} />
      )}
    </>
  );
};
