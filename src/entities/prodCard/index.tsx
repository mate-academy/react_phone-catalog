import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@ui/button';
import { PCImage, Description } from './subcomponents';
import { AriaNames, IconPath } from '@shared/types/ButtonProps';
import { BaseProduct } from '@shared/types/APITypes';

import styles from './productCard.module.scss';
import blBtn from '@shared/styles/blackenedButton.module.scss';
import regBtn from '@shared/styles/regularButton.module.scss';

type Props = {
  product: BaseProduct;
};

export const ProductCard = forwardRef<HTMLLIElement, Props>(
  ({ product }, ref) => {
    const cartCN = {
      main: blBtn['btn-blc'],
      span: blBtn['btn-blc__span'],
    };
    const favCN = {
      main: regBtn.button,
      icon: regBtn.button__icon,
    };

    const {
      image,
      name,
      price,
      fullPrice,
      screen,
      capacity,
      ram,
      itemId,
      category,
    } = product;

    return (
      <li ref={ref} className={styles.container}>
        <Link to={`/${category}/${itemId}`} className={styles['product-card']}>
          <PCImage image={image} />
          <h3 className={styles.name}>{name}</h3>

          <span
            className={styles.price}
            style={{ '--full-price': `"${fullPrice}$"` } as React.CSSProperties}
          >
            {`${price}$`}
          </span>

          <Description screen={screen} capacity={capacity} ram={ram} />

          <div className={styles.btns}>
            <Button
              ariaName={AriaNames.AddCart}
              text={AriaNames.AddCart}
              className={cartCN}
            />
            <Button
              ariaName={AriaNames.AddFav}
              iconPath={IconPath.Fav}
              className={favCN}
            />
          </div>
        </Link>
      </li>
    );
  },
);

ProductCard.displayName = 'ProductCard';
