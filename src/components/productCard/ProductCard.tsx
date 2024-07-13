import React, { useContext } from 'react';
import Styles from './ProductCard.module.scss';
import { Item } from '../../types/Item';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ContextApp } from '../../appContext/AppContext';
import { firstLetterCapital } from '../../functions/firstLetterCapital';

interface Props {
  type: string;
  product: Item;
  discount?: boolean;
}

export const ProductCard: React.FC<Props> = ({ product, discount, type }) => {
  const { capacity, priceDiscount, priceRegular, ram, screen, images, id } =
    product;
  const { fav, handleAddFav, cart, handleAddCart } = useContext(ContextApp);

  return (
    <div className={Styles['productCard']}>
      <Link to={`/${type}/${id}`}>
        <img
          className={Styles['productCard__picture']}
          src={`./${images[0]}`}
        />
        <p className={Styles['productCard__product_name']}>
          {firstLetterCapital(id)}
        </p>
      </Link>

      {discount ? (
        <>
          <div className={Styles['productCard__container']}>
            <span className={Styles['productCard__container__price']}>
              ${priceDiscount}
            </span>
            <span className={Styles['productCard__container__price__reduce']}>
              ${priceRegular}
            </span>
          </div>
        </>
      ) : (
        <div className={Styles['productCard__container']}>
          <span className={Styles['productCard__container__price']}>
            ${priceRegular}
          </span>
          <span
            className={Styles['productCard__container__price__empty']}
          ></span>
        </div>
      )}

      <div className={Styles['productCard__separator']}></div>

      <div className={Styles['productCard__description']}>
        <p className={Styles['productCard__description__paragraph']}>
          <span className={Styles['productCard__description__paragraph__name']}>
            Screen
          </span>
          <span
            className={Styles['productCard__description__paragraph__value']}
          >
            {screen}
          </span>
        </p>

        <p className={Styles['productCard__description__paragraph']}>
          <span className={Styles['productCard__description__paragraph__name']}>
            Capacity
          </span>
          <span
            className={Styles['productCard__description__paragraph__value']}
          >
            {capacity}
          </span>
        </p>

        <p className={Styles['productCard__description__paragraph']}>
          <span className={Styles['productCard__description__paragraph__name']}>
            RAM
          </span>
          <span
            className={Styles['productCard__description__paragraph__value']}
          >
            {ram}
          </span>
        </p>
      </div>

      <div className={Styles['productCard__buttons']}>
        <div
          onClick={() => handleAddCart(product)}
          className={cn(Styles['productCard__buttons__add'], {
            [Styles.productCard__buttons__add__added]: cart.find(
              item => item.id === product.id,
            ),
          })}
        ></div>
        <div
          onClick={() => handleAddFav(product)}
          className={cn(Styles['productCard__buttons__fav'], {
            [Styles.productCard__buttons__fav__selected]: fav.find(
              item => item.id === product.id,
            ),
          })}
        ></div>
      </div>
    </div>
  );
};
