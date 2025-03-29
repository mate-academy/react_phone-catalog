import React from 'react';
// eslint-disable-next-line max-len
import s from './Catalog.module.scss';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Products';
import { ItemsQuantity, SortBy } from '../../types/enums/Page.quantity';
import { ProductCards } from '../ProductSlider/components/ProductCards';

type Props = {
  products: Product[];
};

export const Catalog: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const quantityParam = searchParams.get('quantity') || ItemsQuantity.all;
  const itemsQuantity =
    quantityParam !== ItemsQuantity.all ? +quantityParam : products.length;
  const sortBy = searchParams.get('sort') || SortBy.newest;
  const pageNumber = +(searchParams.get('page') || 1);

  function sortedProducts(productsForSort: Product[]) {
    switch (sortBy) {
      case SortBy.newest:
        return productsForSort.sort((a, b) => b.year - a.year);
      case SortBy.cheapest:
        return productsForSort.sort((a, b) => a.price - b.price);
      case SortBy.alphabetically:
        return productsForSort.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return productsForSort;
    }
  }

  function pageSlice(page: Product[], size: number): Product[] {
    return page.splice((pageNumber - 1) * size, size);
  }

  function filteredPage(): Product[] {
    let filteredProducts = [...products];

    if (sortBy) {
      filteredProducts = sortedProducts(filteredProducts);
    }

    if (quantityParam) {
      filteredProducts = pageSlice(filteredProducts, itemsQuantity);
    }

    return filteredProducts;
  }

  return (
    <div className={classNames(s.catalog__wrapper, 'container')}>
      <div className={s.catalog}>
        <ProductCards products={filteredPage()} />
      </div>
    </div>
  );
};
