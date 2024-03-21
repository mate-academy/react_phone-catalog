import React, { memo, useContext, useMemo } from 'react';

import { SliderBtn } from '../SliderBtn';
import { ProductsSlider } from '../ProductsSlider';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import { WarningMessage } from '../WarningMessage';

import { ProductsContext } from '../../store/ProductsContext';

import { Product } from '../../types/Product';

import './ProductsSection.scss';

type Props = {
  getSectionProducts: (products: Product[]) => Product[];
  sectionName: string;
  title: string;
  currentProductId?: string;
};

export const ProductsSection: React.FC<Props> = memo(
  ({ getSectionProducts, title, sectionName, currentProductId }) => {
    const { products, loading, error } = useContext(ProductsContext);

    const filteredProducts = useMemo(
      () =>
        getSectionProducts(
          currentProductId
            ? products.filter(product => product.itemId !== currentProductId)
            : products,
        ),
      [products, getSectionProducts, currentProductId],
    );

    const isError = useMemo(() => !loading && error, [loading, error]);

    const isProductsNotFound = useMemo(
      () => !loading && !error && !filteredProducts.length,
      [loading, error, filteredProducts.length],
    );

    const isProductsFound = useMemo(
      () => !loading && !error && !!filteredProducts.length,
      [loading, error, filteredProducts.length],
    );

    return (
      <section className={`ProductsSection Main__${sectionName}`}>
        <h1 className="ProductsSection__title">{title}</h1>

        {isProductsFound && (
          <>
            <SliderBtn direction="prev" section={sectionName} />
            <SliderBtn direction="next" section={sectionName} />
          </>
        )}

        <div className="ProductsSection__swiper">
          {loading && <Loader />}

          {isError && (
            <ErrorMessage message={`Failed to get ${title.toLowerCase()}`} />
          )}

          {isProductsNotFound && (
            <WarningMessage message={`No ${title.toLowerCase()} found`} />
          )}

          {isProductsFound && (
            <ProductsSlider products={filteredProducts} section={sectionName} />
          )}
        </div>
      </section>
    );
  },
);
