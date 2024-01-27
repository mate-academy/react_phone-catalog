import React, { memo, useMemo } from 'react';

import './ProductDetailsComponent.scss';
import { ProductDetails } from '../../../definitions/types/ProductDetails';
import Placeholder from '../../UI/Placeholder';
import ImageGalleryWithChoice from '../../UI/ImageGalleryWithChoice';
import AboutBlock from '../AboutBlock';
import { SpecsTable } from '../../UI/SpecsTable/SpecsTable';
import { getSpecArrayFromProduct } from '../../../utils/servicesHelper';
import ProductDetailsInteraction from '../ProductDetailsInteraction';

const BASE_CLASS = 'product-details';

interface Props {
  product: ProductDetails | null;
  changeProduct: (color: string, capacity: string) => void,
}

export const ProductDetailsComponent: React.FC<Props> = memo(({
  product,
  changeProduct,
}) => {
  if (!product) {
    return <ProductDetailsComponentPlaceholder />;
  }

  const specs = getSpecArrayFromProduct(product);

  const changeProductCallbacks = useMemo(() => {
    const changeByColor = (color: string) => {
      changeProduct(color, product.capacity);
    };

    const changeByCapacity = (capacity: string) => {
      changeProduct(product.color, capacity);
    };

    return [
      changeByColor,
      changeByCapacity,
    ]
  }, [product.color, product.capacity]);

  return (
    <section className={BASE_CLASS}>
      <h1 className={`${BASE_CLASS}__title`}>
        {product.name}
      </h1>

      <div className={`${BASE_CLASS}__content`}>
        <ImageGalleryWithChoice
          className={`${BASE_CLASS}__gallery`}
          images={product.images}
        />

        <ProductDetailsInteraction
          className={`${BASE_CLASS}__interaction`}
          product={product}
          changeProductByParams={changeProductCallbacks}
        />

        <AboutBlock
          className={`${BASE_CLASS}__about-block`}
          descriptions={product.description}
        />

        <SpecsTable
          className={`${BASE_CLASS}__specs-table`}
          name='Tech specs'
          specs={specs}
        />
      </div>
    </section>
  );
});


const ProductDetailsComponentPlaceholder: React.FC = memo(() => (
  <section className={BASE_CLASS}>
    <h1 className={`${BASE_CLASS}__title`}>
      <Placeholder />
    </h1>

    <div className={`${BASE_CLASS}__content`}>
      <Placeholder
        className={`${BASE_CLASS}__gallery`}
        height='480px'
      />
      <Placeholder
        className={`${BASE_CLASS}__interaction`}
        height='400px'
      />
      <Placeholder
        className={`${BASE_CLASS}__about-block`}
        height='400px'
      />
      <Placeholder
        className={`${BASE_CLASS}__specs-table`}
        height='400px'
      />
    </div>
  </section>
));