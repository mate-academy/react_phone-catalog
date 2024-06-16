import React, { useContext } from 'react';
import Styles from './ProductCard.module.scss';
import { Item } from '../../types/Item';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ContextApp } from '../../appContext/AppContext';

interface Props {
  type: string;
  product: Item;
  discount?: boolean;
}

export const ProductCard: React.FC<Props> = ({ product, discount, type }) => {
  const { capacity, priceDiscount, priceRegular, ram, screen, images, id } =
    product;
  const { fav, setFav, cart, setCart } = useContext(ContextApp);



  const handleAddFav = (newItem: string) => {
    if (fav.includes(newItem)) {
      setFav(prevState => {
        const updated = [...prevState].filter(item => item !== newItem);
        localStorage.setItem('fav', JSON.stringify(updated));

        return updated;
      });
    } else {
      setFav(prevState => {
        const updated = [...prevState, newItem];
        localStorage.setItem('fav', JSON.stringify(updated));

        return updated;
      });
    }
  };

  const handleAddCart = (newItem: string) => {
    if (cart.includes(newItem)) {
      setCart(prevState => {
        const updated = [...prevState].filter(item => item !== newItem);
        localStorage.setItem('cart', JSON.stringify(updated));

        return updated;
      });
    } else {
      setCart(prevState => {
        const updated = [...prevState, newItem];
        localStorage.setItem('cart', JSON.stringify(updated));

        return updated;
      });
    }
  };

  return (
    <div className={Styles['productCard']}>
      <Link to={`/${type}/${id}`}>
        <img
          className={Styles['productCard__picture']}
          src={`./${images[0]}`}
        />
        <p className={Styles['productCard__product_name']}>{id}</p>
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
          onClick={() => handleAddCart(product.id)}
          className={cn(Styles['productCard__buttons__add'],{
            [Styles.productCard__buttons__add__added]: cart.includes(product.id)
          })}
        ></div>
        <div
          onClick={() => handleAddFav(product.id)}
          className={cn(Styles['productCard__buttons__fav'], {
            [Styles.productCard__buttons__fav__selected]: fav.includes(
              product.id,
            ),
          })}
        ></div>
      </div>
    </div>
  );
};
