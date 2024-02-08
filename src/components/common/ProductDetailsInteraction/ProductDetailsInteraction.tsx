import React from 'react';

import './ProductDetailsInteraction.scss';
import OptionsToggler from '../../UI/OptionsToggler';
import { AddToCartHandler } from '../../../enhancers/hocs/AddToCartHandler';
import GraySelectButton from '../../UI/buttons/GraySelectButton';
import { AddToFavoritesHandler } from '../../../enhancers/hocs/AddToFavoritesHandler';
import SquareSelectLikeButton from '../../UI/buttons/SquareSelectButton/descendants/SquareSelectLikeButton';
import { SpecsTable } from '../../UI/SpecsTable/SpecsTable';
import { ProductDetails } from '../../../definitions/types/ProductDetails';
import ColorItem from '../../UI/OptionTogglerItems/ColorItem';
import { RectangleTextItem } from '../../UI/OptionTogglerItems/RectangleTextItem/RectangleTextItem';
import { getSpecArrayFromProduct } from '../../../utils/servicesHelper';

interface Props {
  product: ProductDetails,
  changeProductByParams: ((param: string) => void)[],
  className?: string,
}

export const ProductDetailsInteraction: React.FC<Props> = ({
  product,
  changeProductByParams,
  className,
}) => {
  const BASE_CLASS = 'product-details-interaction';

  const specs = getSpecArrayFromProduct(product);

  const minSpecs = {
    screen: specs.screen,
    resolution: specs.resolution,
    processor: specs.processor,
    ram: specs.ram
  };

  return (
    <section className={`${BASE_CLASS} ${className || ''}`}>
      <section className={`${BASE_CLASS}__option-togglers`}>
        {product.colorsAvailable.length > 1 && (<>
          <OptionsToggler
            name='Available colors'
            options={product.colorsAvailable}
            Item={ColorItem}
            selectedOption={product.color}
            onOptionChange={changeProductByParams[0]}
          />

          <hr />
        </>)}

        {product.capacityAvailable.length > 1 && (<>
          <OptionsToggler
            name='Select capacity'
            options={product.capacityAvailable}
            Item={RectangleTextItem}
            selectedOption={product.capacity}
            onOptionChange={changeProductByParams[1]}
          />

          <hr />
        </>)}
      </section>

      <div className={`${BASE_CLASS}__interaction-bottom`}>
        <div className={`${BASE_CLASS}__price-container`}>

          {product && (<>
            <ins className={`${BASE_CLASS}__new-price`}>
              ${product.priceDiscount || product.priceRegular}
            </ins>

            {product.priceDiscount && (
              <del className={`${BASE_CLASS}__old-price`}>
                ${product.priceRegular}
              </del>
            )}
          </>)}
        </div>

        <div className={`${BASE_CLASS}__buttons`}>
          <AddToCartHandler
            productId={product.id}
            render={(props) => (
              <GraySelectButton
                extraClasses={`${BASE_CLASS}__add-to-cart`}
                {...props}
              />
            )}
          />

          <AddToFavoritesHandler
            productId={product.id}
            render={(props) => (
              <SquareSelectLikeButton
                extraClasses={`${BASE_CLASS}__add-to-favorites`}
                {...props}
              />
            )}
          />
        </div>

        {minSpecs && (
          <SpecsTable
            className={`${BASE_CLASS}__min-specs-table`}
            specs={minSpecs}
          />)}
      </div>
    </section>
  );
};
