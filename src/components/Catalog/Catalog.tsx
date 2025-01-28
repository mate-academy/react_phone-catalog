import { useState } from 'react';
import { PhoneCard } from '../PhoneCard/PhoneCard';
import { Sorting } from '../Sorting/Sorting';
import { Pagination } from '../Pagination/Pagination';
import style from './Catalog.module.scss';
import { Outlet, useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
  title: string;
};

export const Catalog: React.FC<Props> = ({ products, title }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'newest';
  const itemsFromUrl = Number(searchParams.get('items')) || 16;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsFromUrl);

  const sortProducts = (productList: Product[], sortType: string) => {
    switch (sortType) {
      case 'alphabetically':
        return [...productList].sort((a, b) => a.name.localeCompare(b.name));
      case 'cheapest':
        return [...productList].sort((a, b) => a.price - b.price);
      case 'newest':
        return [...productList].sort((a, b) => b.year - a.year);
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(products, sort);

  const displayedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsFromUrl,
    currentPage * itemsFromUrl,
  );

  return (
    <>
      <div className={style.catalog}>
        <BreadCrumbs />
        <h1 className={style.catalog__title}>{title}</h1>
        <p className={style.catalog__counter}>{products.length} models</p>
        <Sorting />
        <div className={style.catalog__phones}>
          {displayedProducts.map(product => (
            <PhoneCard product={product} key={product.id} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          onCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
      <Outlet />
    </>
  );
};
