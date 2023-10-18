import './productsList.scss';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';

import { Product } from '../../type/product';
import { PerPage, Sort } from '../../type/types';

type Props = {
  products: Product[],
};

export const ProductsList: React.FC<Props> = ({
  products,
}) => {
  const [pages, setPages] = useState<number[]>([]);
  const [sortedPhones, setSortedPhones] = useState<Product[]>([]);
  const [productsForPage, setProductsForPage] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const getPerPage = useCallback(() => {
    const perPage = searchParams.get('perPage');

    switch (perPage) {
      case PerPage.All:
        return products.length;

      case null:
        return +PerPage.Sixteen;

      default:
        return +perPage;
    }
  }, [searchParams]);

  const getSortedProducts = useCallback((
    productsList: Product[],
  ) => {
    const sortedProducts: Product[] = [...productsList];

    sortedProducts.sort((a, b) => {
      switch (searchParams.get('sort')) {
        case Sort.Alphabetically:
          return a.name.localeCompare(b.name);

        case Sort.Cheapest:
          return (a.price * ((100 - a.discount) / 100)
            - b.price * ((100 - b.discount) / 100));

        default:
          return a.age - b.age;
      }
    });

    setSortedPhones(sortedProducts);
  }, [searchParams]);

  const getNeededProductsForPage = useCallback((
    productsList: Product[],
  ) => {
    const page = +(searchParams.get('page') || 1);
    const productsNumber: number = getPerPage();
    const idStart = (page - 1) * productsNumber;
    let productsPerPage: Product[] = [];

    if (productsNumber === products.length) {
      setProductsForPage([...productsList]);

      return;
    }

    if (!productsList.length) {
      setProductsForPage([]);

      return;
    }

    for (let i = idStart; i < page * productsNumber; i += 1) {
      if (productsList[i]) {
        productsPerPage = [...productsPerPage, productsList[i]];
      }
    }

    setProductsForPage(productsPerPage);
  }, [
    sortedPhones,
    searchParams.get('perPage'),
    searchParams.get('page'),
  ]);

  const isShowPagination = useCallback(() => {
    return getPerPage() < products.length;
  }, [products, getPerPage()]);

  const getPagesArray = useCallback(() => {
    if (getPerPage() === products.length) {
      return [];
    }

    const pagesNumber = Math.ceil(products.length / (getPerPage()));

    return Array.from(Array(pagesNumber).keys());
  }, [getPerPage(), searchParams]);

  useEffect(() => {
    setPages(getPagesArray);
  }, [searchParams]);

  useEffect(() => {
    getSortedProducts(products);
  }, [searchParams.get('sort'), products]);

  useEffect(() => {
    getNeededProductsForPage(sortedPhones);
  }, [sortedPhones, searchParams.get('perPage'), searchParams.get('page')]);

  return (
    <section className="products-list">
      <div className="products-list__products">
        {productsForPage.map((product) => (
          <div key={product.name} className="products-list__product-item">
            <ProductCard
              key={product.id}
              product={product}
            />
          </div>
        ))}
      </div>

      {isShowPagination() && (
        <Pagination pages={pages} />
      )}
    </section>
  );
};
