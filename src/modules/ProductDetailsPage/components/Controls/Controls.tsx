import React from 'react';
import { ProductSpecs } from '../../../../components/ProductSpecs/ProductSpecs';
import { IconSvg } from '../../../../components/IconSvg/IconSvg';
import { Link } from 'react-router-dom';
import controlsStyles from './Controls.module.scss';
import classNames from 'classnames';
import { ProductDetailed } from '../../../../types/ProductDetailed';
import { getHexColor } from '../../../../helpers/colorHelper';
import { Spec } from '../../../../types/Spec';
import { ICON_DATA_PATHS } from '../../../../constants/iconDataPaths';

type Props = {
  className?: string;
  modelVariants: ProductDetailed[];
  selectedProduct: ProductDetailed;
};

export const Controls: React.FC<Props> = ({
  className,
  modelVariants,
  selectedProduct,
}) => {
  const shortSpecs: Spec[] = [
    { label: 'Screen', value: selectedProduct?.screen },
    { label: 'Resolution', value: selectedProduct?.resolution },
    { label: 'Processor', value: selectedProduct?.processor },
    { label: 'RAM', value: selectedProduct?.ram },
  ];

  return (
    <section className={classNames(className, controlsStyles.controls)}>
      <fieldset className={controlsStyles.controls__colors}>
        <legend className={controlsStyles.controls__colorsTitle}>
          Available colors
        </legend>
        <ul className={controlsStyles.controls__colorList}>
          {selectedProduct.colorsAvailable.map(color => {
            const newProduct = modelVariants.find(
              v => v.color === color && v.capacity === selectedProduct.capacity,
            );

            return (
              <li key={color}>
                <Link
                  to={`../${newProduct?.id}`}
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
            );
          })}
        </ul>
      </fieldset>
      <hr className="horizontal-line" />
      <fieldset className={controlsStyles.controls__capacity}>
        <legend className={controlsStyles.controls__capacityTitle}>
          Select capacity
        </legend>
        <ul className={controlsStyles.controls__capacityList}>
          {selectedProduct.capacityAvailable.map(capacity => {
            const newProduct = modelVariants.find(
              v => v.capacity === capacity && v.color === selectedProduct.color,
            );

            return (
              <li key={capacity}>
                <Link
                  to={`../${newProduct?.id}`}
                  className={classNames(controlsStyles.controls__capacityItem, {
                    [controlsStyles['controls__capacityItem--active']]:
                      selectedProduct.capacity === capacity,
                  })}
                >
                  {capacity}
                </Link>
              </li>
            );
          })}
        </ul>
      </fieldset>
      <hr className="horizontal-line" />
      <div className={controlsStyles.controls__priceAndActions}>
        <div className={controlsStyles.controls__price}>
          <p className={controlsStyles.controls__priceDiscount}>
            ${selectedProduct.priceDiscount}
          </p>
          <p className={controlsStyles.controls__priceRegular}>
            ${selectedProduct.priceRegular}
          </p>
        </div>
        <div className={controlsStyles.controls__actions}>
          <button className={controlsStyles.controls__buttonAddToCart}>
            Add to cart
          </button>
          <button className={controlsStyles.controls__buttonAddToFavorites}>
            <IconSvg dataPath={ICON_DATA_PATHS.FAVOURITES} />
          </button>
        </div>
      </div>
      <ProductSpecs specs={shortSpecs} />
    </section>
  );
};
