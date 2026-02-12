import React from 'react';

import styles from './ProductPresentation.module.scss';
import { Accessories } from '../../../../types/Accessories';
import { Phones } from '../../../../types/Phones';
import { Tablets } from '../../../../types/Tablets';
import { ProductPhotos } from '../productPhotos';
import { RadioColor } from '../radioColor';
import { CapacityRadio } from '../capacityRadio';
import { ToCartButton } from '../../../shared/components/toCartButton';
import { ToFavouriteButton } from '../../../shared/components/toFavoriteButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { Products } from '../../../../types/Products';

type Props = {
  product: Accessories | Phones | Tablets;
  productForButton: Products;
};

export const ProductPresentation: React.FC<Props> = ({
  product,
  productForButton,
}) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const onClickRadioButton = (newCapacity: string, newColor: string) => {
    const capacity = newCapacity.replaceAll(' ', '-').toLowerCase();
    const color = newColor.replaceAll(' ', '-').toLowerCase();

    navigate(`../${product.namespaceId}-${capacity}-${color}`, { state });
  };

  return (
    <section className={styles.productPresentation}>
      <ProductPhotos photos={product.images} />

      <div className={styles.mainControls}>
        <div>
          <div className={styles.containerSelectors}>
            <span>Available colors</span>

            <div className={styles.colors}>
              {product.colorsAvailable.map(color => (
                <RadioColor
                  key={color}
                  color={color}
                  name="color"
                  defaultChecked={product.color === color}
                  isActive={product.color === color}
                  onClick={() => onClickRadioButton(product.capacity, color)}
                />
              ))}
            </div>
          </div>

          <div className={styles.containerSelectors}>
            <span>Select capacity</span>

            <div className={styles.capacity}>
              {product.capacityAvailable.map(capacity => (
                <CapacityRadio
                  key={capacity}
                  capacity={capacity}
                  name="capacity"
                  defaultChecked={product.capacity === capacity}
                  isActive={product.capacity === capacity}
                  onClick={() => onClickRadioButton(capacity, product.color)}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className={styles.price}>
            <span className={styles.priceDiscount}>
              {'$' + product.priceDiscount}
            </span>

            <span className={styles.priceRegular}>
              {'$' + product.priceRegular}
            </span>
          </div>

          <div className={styles.buttons}>
            <ToCartButton product={productForButton} />
            <ToFavouriteButton product={productForButton} />
          </div>
        </div>

        <ul className={styles.informationList}>
          <li className={styles.listItem}>
            <span className={styles.category}>Screen</span>
            <span className={styles.data}>{product.screen}</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.category}>Resolution</span>
            <span className={styles.data}>{product.resolution}</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.category}>Processor</span>
            <span className={styles.data}>{product.processor}</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.category}>RAM</span>
            <span className={styles.data}>{product.ram}</span>
          </li>
        </ul>
      </div>
    </section>
  );
};
