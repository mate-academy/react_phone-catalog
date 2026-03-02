import { Link } from 'react-router-dom';
import { CartItem } from '@/types/Cart';
import { ProductDetails } from '@/types/Product';
import s from './CartProduct.module.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/utils/formatPrice';

import closeIcon from '@/assets/icons/closeCart-dark.svg';
import minusIcon from '@/assets/icons/minus.svg';
import plusIcon from '@/assets/icons/plus.svg';

interface Props {
  product: CartItem | ProductDetails;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const CartProduct: React.FC<Props> = ({
  product,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  const { i18n } = useTranslation();

  const imagePath = 'images' in product ? product.images[0] : product.image;
  const imageUrl = `/${imagePath}`;

  const currentPrice =
    product.priceDiscount ?? ('price' in product ? product.price : 0);

  const fullPrice =
    product.priceRegular ?? ('fullPrice' in product ? product.fullPrice : 0);

  const productId = 'itemId' in product ? product.itemId : product.id;
  const idString = String(productId).toLowerCase();

  let category = 'phones';
  if (idString.includes('ipad')) {
    category = 'tablets';
  } else if (idString.includes('watch')) {
    category = 'accessories';
  } else if ('category' in product && product.category) {
    category = product.category as string;
  }

  const linkTo = `/${category}/${productId}`;
  const quantity = 'quantity' in product ? product.quantity : 1;
  const priceToDisplay = (currentPrice || fullPrice) * quantity;

  return (
    <div className={s.item}>
      <button
        className={s.remove}
        type="button"
        onClick={onRemove}
      >
        <img
          src={closeIcon}
          alt="Remove"
          className={s.removeIcon}
        />
      </button>

      <div className={s.imageWrapper}>
        <Link
          to={linkTo}
          className="card__link"
        >
          <img
            src={imageUrl}
            alt={product.name}
            className={s.image}
          />
        </Link>
      </div>

      <div className={s.details}>
        <h3 className={s.name}>{product.name}</h3>
      </div>

      <div className={s.controls}>
        <div className={s.quantity}>
          <button
            className={s.btnMinus}
            onClick={onDecrease}
          >
            <img
              src={minusIcon}
              alt="Minus"
              className={s.minusIcon}
            />
          </button>
          <span className={s.count}>{quantity}</span>
          <button
            className={s.btnPlus}
            onClick={onIncrease}
          >
            <img
              src={plusIcon}
              alt="Plus"
              className={s.plusIcon}
            />
          </button>
        </div>

        <p className={s.price}>{formatPrice(priceToDisplay, i18n.language)}</p>
      </div>
    </div>
  );
};
