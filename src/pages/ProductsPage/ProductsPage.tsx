import React, { useEffect, useState } from 'react';
import './ProductsPage.scss';

import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import { Link, useSearchParams } from 'react-router-dom';
import { getPrepearedProducts } from '../../utils/getPrepearedProducts';
import { FilterForms } from '../../components/FilterForms';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { capitalize } from '../../utils';
import { ProductType } from '../../types/ProductType';

type Props = {
  type: ProductType;
};

export const ProductsPage: React.FC<Props> = ({ type }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visiblePhones, setVisiblePhones] = useState<Product[]>([]);

  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get('page') || 1;
  const onPageParam = searchParams.get('onPage') || 8;

  useEffect(() => {
    getProducts().then(result => {
      setProducts(result.filter(product => product.category === type));
    });
  }, [setProducts, type]);

  useEffect(() => {
    const allPhones = getPrepearedProducts(products, searchParams);

    if (!Number.isNaN(+onPageParam)) {
      const visibleOnPagePhones = allPhones.slice(
        (+pageParam - 1) * +onPageParam,
        +pageParam * +onPageParam,
      );

      setVisiblePhones(visibleOnPagePhones);
    } else {
      setVisiblePhones(allPhones);
    }
  }, [products, searchParams, onPageParam, pageParam]);

  return (
    <>
      <div className="history-path">
        <Link to="/">
          <div className="history-path__icon history-path__icon--home" />
        </Link>
        <div className="history-path__icon history-path__icon--arrow" />
        <Link to={`/${type}`} className="history-path__page-name">
          {capitalize(type)}
        </Link>
      </div>

      <h1 className="products-title">{capitalize(type)}</h1>

      <div className="products-amount">{`${products.length} models`}</div>

      <FilterForms />

      <div className="products-cards">
        {visiblePhones.map(product => (
          <ProductCard key={product.id} isDiscount product={product} />
        ))}
      </div>

      <Pagination products={products} />
    </>
  );
};
