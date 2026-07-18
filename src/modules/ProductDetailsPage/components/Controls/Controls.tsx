import React, { memo } from 'react';
import { ProductSpecs } from '../../../../components/ProductSpecs/ProductSpecs';
import { generatePath, Link } from 'react-router-dom';
import controlsStyles from './Controls.module.scss';
import classNames from 'classnames';
import { ProductDetailed } from '../../../../types/ProductDetailed';
import { getHexColor } from '../../../../helpers/colorHelper';
import { Spec } from '../../../../types/Spec';
// eslint-disable-next-line max-len
import { AddToFavoritesButton } from '../../../../components/AddToFavoritesButton';
import { AddToCartButton } from '../../../../components/AddToCartButton';
import { Divider } from '../../../../components/Divider/Divider';

type Props = {
  className?: string;
  modelVariants: ProductDetailed[];
  selectedProduct: ProductDetailed;
  category: string;
  numericId: number | null;
};

export const Controls: React.FC<Props> = memo(
  ({
    className,
    modelVariants,
    selectedProduct,
    category,
    numericId: productId,
  }) => {
    const {
      id,
      screen,
      resolution,
      processor,
      ram,
      colorsAvailable,
      capacityAvailable,
      priceDiscount,
      priceRegular,
    } = selectedProduct;
    const shortSpecs: Spec[] = [
      { label: 'Screen', value: screen },
      { label: 'Resolution', value: resolution },
      { label: 'Processor', value: processor },
      { label: 'RAM', value: ram },
    ];

    return (
      <section className={classNames(className, controlsStyles.controls)}>
        <p className={controlsStyles.controls__productId}>ID: {productId}</p>
        <fieldset className={controlsStyles.controls__colors}>
          <legend className={controlsStyles.controls__colorsTitle}>
            Available colors
          </legend>
          <ul className={controlsStyles.controls__colorList}>
            {colorsAvailable.map(color => {
              const newProduct = modelVariants.find(
                v =>
                  v.color === color && v.capacity === selectedProduct.capacity,
              );

              return newProduct ? (
                <li key={color}>
                  <Link
                    to={generatePath('/:category/:itemId', {
                      category,
                      itemId: newProduct.id,
                    })}
                    className={classNames(controlsStyles.controls__color, {
                      [controlsStyles['controls__color--active']]:
                        selectedProduct.color === color,
                    })}
                  >
                    <span
                      style={{ backgroundColor: getHexColor(color) }}
                      className={controlsStyles.controls__colorIndicator}
                    />
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </fieldset>
        <Divider />
        <fieldset className={controlsStyles.controls__capacity}>
          <legend className={controlsStyles.controls__capacityTitle}>
            Select capacity
          </legend>
          <ul className={controlsStyles.controls__capacityList}>
            {capacityAvailable.map(capacity => {
              const newProduct = modelVariants.find(
                v =>
                  v.capacity === capacity && v.color === selectedProduct.color,
              );

              return newProduct ? (
                <li key={capacity}>
                  <Link
                    to={generatePath('/:category/:itemId', {
                      category,
                      itemId: newProduct.id,
                    })}
                    className={classNames(
                      controlsStyles.controls__capacityItem,
                      {
                        [controlsStyles['controls__capacityItem--active']]:
                          selectedProduct.capacity === capacity,
                      },
                    )}
                  >
                    {capacity}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </fieldset>
        <Divider />
        <div className={controlsStyles.controls__priceAndActions}>
          <div className={controlsStyles.controls__price}>
            <p className={controlsStyles.controls__priceDiscount}>
              ${priceDiscount}
            </p>
            <p className={controlsStyles.controls__priceRegular}>
              ${priceRegular}
            </p>
          </div>
          <div className={controlsStyles.controls__actions}>
            <AddToCartButton itemId={id} />
            <AddToFavoritesButton itemId={id} />
          </div>
        </div>
        <ProductSpecs specs={shortSpecs} short />
      </section>
    );
  },
);

Controls.displayName = 'Controls';
