import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Pagination } from '../Pagination/Pagination';
import { Product } from '../../types/product';
import { NoResults } from '../NoResults/NoResults';
import { Loader } from '../Loader/Loader';
import { SortSelect } from './SortSelect';
import { PerPageSelect } from './PerPageSelect';
import { getSelectedTypeProducts } from '../../helpers/requests';
import './ProductPage.scss';
import { Navbar } from '../Navbar/Navbar';
import { SearchBar } from '../SearchBar/SearchBar';

type ProductPageProps = {
  type: 'phone' | 'tablet' | 'accessory';
  title: string;
};

export const ProductPage = ({ type, title }: ProductPageProps) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

        {isLoading && <Loader />}

        <div className="products-page__products-list">
          <Pagination products={products} total={productsNum} />
        </div>
      </section>
    </>
  );
};
