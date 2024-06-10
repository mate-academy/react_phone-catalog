import React, { useContext, useEffect, useState } from 'react';
import './Shop.scss';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Direction } from '../../components/Direction';
import { CatalogViewSettings } from '../../components/CatalogViewSettings';
import { ProductsList } from '../../components/ProductsList';
import { PageSelector } from '../../components/PageSelector';
import { ProductContext } from '../../helpers/utils/productsContext';
import { filterBy } from '../../helpers/utils/filterBy';
import { Product } from '../../helpers/types/Product';
import { Loader } from '../../components/Loader';
import { NoResults } from '../../components/NoResults';

type Props = {};

export const Shop: React.FC<Props> = () => {
  const { type: filterParam } = useParams();
  const [title, setTitle] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>();
  const navigate = useNavigate();

  const { products } = useContext(ProductContext);

  const [searchParams] = useSearchParams();
  const searchString = searchParams.get('query') || '';

  useEffect(() => {
    switch (filterParam) {
      case 'phone':
        setTitle('Mobile phones');
        break;

      case 'tablet':
        setTitle('Tablets');
        break;

      case 'accessory':
        setTitle('Accessories');
        break;

      default:
        navigate('not-found', { replace: true });

        return;
    }

    if (products) {
      setFilteredProducts(filterBy(products, filterParam, searchString));
    }
  }, [filterParam, navigate, products, searchString]);

  return (
    <main className="shop-page">
      <div className="container">
        <div className="shop-page__content">
          <div className="shop-page__top">
            {filterParam && (
              <Direction
                path={[{ name: filterParam, path: `/shop/${filterParam}` }]}
              />
            )}

            <div className="shop-page__title">
              <h1>{title}</h1>
              {filteredProducts && (
                <span className="shop-page__side-title">{`${filteredProducts.length} models`}</span>
              )}
            </div>

            <CatalogViewSettings />
          </div>

          {filteredProducts ? (
            <>
              {filteredProducts.length === 0 ? (
                <NoResults categoryName={title} />
              ) : (
                <ProductsList filteredProducts={filteredProducts} />
              )}
            </>
          ) : (
            <Loader />
          )}

          {filteredProducts && <PageSelector products={filteredProducts} />}
        </div>
      </div>
    </main>
  );
};
