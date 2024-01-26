import React, { useCallback } from 'react';

import './ProductDetailsComponent.scss';
import { ProductDetails } from '../../../definitions/types/ProductDetails';
import Placeholder from '../../UI/Placeholder';
import ImageGalleryWithChoice from '../../UI/ImageGalleryWithChoice';
import AboutBlock from '../AboutBlock';
import OptionsToggler from '../../UI/OptionsToggler';
import ColorItem from '../../UI/OptionTogglerItems/ColorItem';
import { RectangleTextItem } from '../../UI/OptionTogglerItems/RectangleTextItem/RectangleTextItem';
import { AddToCartHandler } from '../../../enhancers/hocs/AddToCartHandler';
import GraySelectButton from '../../UI/GraySelectButton';

interface ProductProps {
  product: ProductDetails;
  loading?: never;
  changeProduct: (color: string, capacity: string) => void,
}

interface LoadingProps {
  loading: true;
  product?: never;
  changeProduct?: never,
}

type Props = ProductProps | LoadingProps;

export const ProductDetailsComponent: React.FC<Props> = ({
  product,
  loading,
  changeProduct,
}) => {
  const BASE_CLASS = 'product-details';
  const maybeProduct = !loading ? product : {
    camera: <Placeholder />,
    capacity: <Placeholder />,
    cell: <Placeholder />,
    id: <Placeholder />,
    name: <Placeholder />,
    namespaceId: <Placeholder />,
    priceDiscount: <Placeholder />,
    priceRegular: <Placeholder />,
    processor: <Placeholder />,
    ram: <Placeholder />,
    resolution: <Placeholder />,
    screen: <Placeholder />,
    zoom: <Placeholder />,
  };

  const changeProductByColor = useCallback((color: string) => {
    if (product) {
      changeProduct(color, product.capacity);
    }
  }, [product]);

  const changeProductByCapacity = useCallback((capacity: string) => {
    if (product) {
      changeProduct(product.color, capacity);
    }
  }, [product]);

  return (
    <section className={BASE_CLASS}>
      <h1 className={`${BASE_CLASS}__title`}>
        {maybeProduct.name}
      </h1>

      <div className={`${BASE_CLASS}__content`}>
        <div className={`${BASE_CLASS}__left`}>
          {product
            ? <ImageGalleryWithChoice images={product.images} />
            : <Placeholder />
          }

          {product
            ? <AboutBlock descriptions={product.description} />
            : <Placeholder />
          }
        </div>

        <div className={`${BASE_CLASS}__right`}>
          <section className={`${BASE_CLASS}__interaction`}>
            <section className={`${BASE_CLASS}__option-togglers`}>
              {loading && <Placeholder />}
              {product && product.colorsAvailable.length > 1 && (
                <OptionsToggler
                  name='Available colors'
                  options={product.colorsAvailable}
                  Item={ColorItem}
                  selectedOption={product.color}
                  onOptionChange={changeProductByColor}
                />
              )}

              {product && product.capacityAvailable.length > 1 && (
                <OptionsToggler
                  name='Select capacity'
                  options={product.capacityAvailable}
                  Item={RectangleTextItem}
                  selectedOption={product.capacity}
                  onOptionChange={changeProductByCapacity}
                />
              )}
            </section>

            <div className={`${BASE_CLASS}__interaction-bottom`}>
              <div className={`${BASE_CLASS}__price-container`}>

              </div>

              <AddToCartHandler
                productId={product?.id || null}
                render={(props) => <GraySelectButton {...props} />}
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};
