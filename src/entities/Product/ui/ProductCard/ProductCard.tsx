/* eslint-disable react/display-name */
import { memo } from 'react';
import { Product } from '../../model/types/product';
import { TechSpecs } from '../../../../shared/ui/TechSpecs';
import cls from './productCard.module.scss';
import icons from '../../../../shared/styles/icons.module.scss';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../../../../shared/config/routeConfig';
import { Button, ButtonSize, ButtonTheme } from '../../../../shared/ui/forms';

interface Props {
  cart: Product;
}

export const ProductCard = memo(({ cart }: Props) => {
  const {
    name,
    image,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    category,
    itemId,
  } = cart;
  const techSpecs = { screen, capacity, ram };

  return (
    <Link
      to={`${RoutePaths.product_detail}${category}/${itemId}`}
      className={cls.productCard}
    >
      <div className={cls.productCard__image}>
        <img src={`/${image}`} alt={name} />
      </div>

      <div className={cls.productCard__content}>
        <p className={cls.productCard__name}>{name}</p>

        <div className={cls.productCard__price}>
          <span
            className={cls['productCard__current-price']}
          >{`$${price}`}</span>
          {fullPrice && (
            <span className={cls['productCard__absolute-price']}>
              {`$${fullPrice}`}
            </span>
          )}
        </div>

        <TechSpecs
          techSpecs={techSpecs}
          className={cls.productCard__characteristics}
        />

        <div className={cls.productCard__buttons}>
          <Button>Add to cart</Button>
          <Button
            className={`${icons['_icon-heart']}`}
            theme={ButtonTheme.SQUARE}
            size={ButtonSize.M}
          />
        </div>
      </div>
    </Link>
  );
});
