import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Pagination } from '../Pagination/Pagination';
import { Product } from '../../types/product';
import { NoResults } from '../NoResults/NoResults';
import { Loader } from '../Loader/Loader';
import { SortSelect } from './SortSelect';
import { PerPageSelect } from './PerPageSelect';
import { getSelectedTypeProducts } from '../../helpers/requests';
import { Navbar } from '../Navbar/Navbar';
import { SearchBar } from '../SearchBar/SearchBar';
import { filterProducts } from '../../helpers/filters';
import './ProductPage.scss';

type ProductPageProps = {
  type: 'phones' | 'tablets' | 'accessories';
  title: string;
};

export const ProductPage = ({ type, title }: ProductPageProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const perPage = searchParams.get('perPage') || 'all';
  const activeSorter = searchParams.get('sort') || 'age';
  const productsNum = products.length;

  useEffect(() => {
    navigate('?sort=age&perPage=all');

    setIsLoading(true);
    getSelectedTypeProducts(type)
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  if (!isLoading && productsNum === 0) {
    return <NoResults categoryName={title} />;
  }

  return (
    <>
      <Navbar>
        <SearchBar />
      </Navbar>

      <section className="products-page">
        <div className="products-page__crumbs">
          <Breadcrumbs />
        </div>

        <h1 className="products-page__title">{title}</h1>
        <p className="products-page__count">{`${productsNum} models`}</p>

        <div className="products-page__selectors">
          <SortSelect />

          <PerPageSelect />
        </div>

        {isLoading ? (
          <div className="products-page__loader-wrapper">
            <Loader width={300} />
          </div>
        ) : (
          <div className="products-page__products-list">
            <Pagination
              products={filterProducts(products, activeSorter)}
              perPage={perPage}
            />
          </div>
        )}
      </section>
    </>
  );
};
