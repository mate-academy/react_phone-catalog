import { memo, MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button, ButtonTheme } from '../../../../shared/ui/forms';
import { Product } from '../../model/types/product';
import { RoutePaths } from '../../../../shared/config/routeConfig';
import icons from '../../../../shared/styles/icons.module.scss';
import cls from './productCard.module.scss';

interface Props {
  product: Product;
  removeCart: (itemId: string) => void;
  plusAmount?: (amount: number, itemId: string) => void;
  minusAmount?: (amount: number, itemId: string) => void;
}

export const CartProductCard = memo(
  ({ product, removeCart, minusAmount, plusAmount }: Props) => {
    const { image, name, price, cartItem, itemId, category } = product;
    const [count, setCount] = useState<number>(cartItem as number);

    const removeCartHandler = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      removeCart(itemId);
    };

    const minusAmountHandler = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      minusAmount?.(price, itemId);
      if (count - 1 !== 0) {
        setCount(prev => prev - 1);
      }
    };

    const plusAmountHandler = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      plusAmount?.(price, itemId);
      setCount(prev => prev + 1);
    };

    return (
      <Link
        to={`${RoutePaths.product_detail}${category}/${itemId}`}
        state={{ fromLocation: location.pathname }}
        className={classNames(cls.productCard, cls['productCard--cart'])}
      >
        <button
          type="button"
          className={classNames(icons['_icon-close'], cls.button)}
          onClick={removeCartHandler}
        />
        <div className={cls.productCard__image}>
          <img src={image} alt={itemId} />
        </div>
        <p className={cls.productCard__name}>{name}</p>
        <div className={cls.quantity}>
          <Button
            theme={ButtonTheme.SQUARE}
            className={icons['_icon-minus']}
            onClick={minusAmountHandler}
            disabled={count === 1}
          />
          <span>{count}</span>
          <Button
            theme={ButtonTheme.SQUARE}
            className={icons['_icon-plus']}
            onClick={plusAmountHandler}
          />
        </div>
        <span className={cls['productCard__current-price']}>{`$${price}`}</span>
      </Link>
    );
  },
);
