import cn from 'classnames';
import style from './Purchase.module.scss';
import { DetailedProduct } from '../../../../types/DetailedProduct';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddToCartContext } from '../../../../contexts/AddToCartContext';
import { AddToFavContext } from '../../../../contexts/AddToFavContext';
import { Product } from '../../../../types/Product';
import { CartProduct } from '../../../../types/CartProduct';

type Props = {
  product: DetailedProduct;
  analogProducts: DetailedProduct[];
  favProduct: Product;
  cartProduct: CartProduct;
};

export const Purchase: React.FC<Props> = ({
  product,
  analogProducts,
  favProduct,
  cartProduct,
}) => {
  const navigate = useNavigate();
  const fullPrice = product.priceRegular;
  const price = product.priceDiscount;
  const { cart, setCart } = useContext(AddToCartContext);
  const { fav, setFav } = useContext(AddToFavContext);
  const [isPicked, setIsPicked] = useState(
    cart.some(item => item.itemId === product.id),
  );

  const pickByColor = (color: string) => {
    const target = analogProducts.find(
      p => p.color === color && p.capacity === product.capacity,
    );

    if (!target) {
      return; // or handle fallback
    }

    navigate(`/${product.category}/${target.id}`);
  };

  const pickByGB = (cap: string) => {
    const target = analogProducts.find(
      p => p.capacity === cap && p.color === product.color,
    );

    if (!target) {
      return; // or handle fallback
    }

    navigate(`/${product.category}/${target.id}`);
  };

  const handleFav = () => {
    setFav(currFav =>
      currFav.some(item => item.itemId === favProduct.itemId)
        ? currFav.filter(item => item.itemId !== favProduct.itemId)
        : [...currFav, favProduct],
    );
  };

  const handleCart = () => {
    if (cart.some(p => p.itemId === cartProduct.itemId)) {
      setCart(currCart => currCart.filter(item => item.itemId !== product.id));
    } else {
      setCart(currCart => [...currCart, cartProduct]);
    }

    setIsPicked(!isPicked);
  };

  return (
    <div className={cn(style.product__purchase, style.purchase)}>
      <div className={style.purchase__top}>
        <div className={cn(style.purchase__colors, style.colors)}>
          <div className={style.colors__header}>
            <p className={style.colors__title}>Available colors</p>
            <p className={style.purchase__id}>ID: 802390</p>
          </div>
          <ul className={style.colors__list}>
            {product.colorsAvailable.map(color => (
              <li
                className={cn(style.colors__item, {
                  [style['colors__item--active']]: color === product.color,
                })}
                key={color}
              >
                <button
                  className={style.colors__link}
                  style={{ backgroundColor: color }}
                  onClick={() => pickByColor(color)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={style.purchase__line}></div>
        <div className={cn(style.purchase__capacity, style.capacity)}>
          <p className={style.capacity__title}>Select capacity</p>
          <ul className={style.capacity__list}>
            {product.capacityAvailable.map(capacity => (
              <li className={style.capacity__item} key={capacity}>
                <button
                  className={cn(style.capacity__link, {
                    [style['capacity__link--active']]:
                      capacity === product.capacity,
                  })}
                  onClick={() => pickByGB(capacity)}
                >
                  {capacity}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.purchase__line}></div>
      </div>
      <div className={style['purchase__main-info']}>
        <div className={style.purchase__prices}>
          {fullPrice !== price ? (
            <>
              <p className={style.purchase__price}>${price}</p>
              <p
                className={cn(
                  style.purchase__price,
                  style['purchase__price--full'],
                )}
              >
                ${fullPrice}
              </p>
            </>
          ) : (
            <p className={style.purchase__price}>${fullPrice}</p>
          )}
        </div>
        <div className={style.purchase__buttons}>
          {!isPicked ? (
            <button
              type="button"
              className={style['purchase__add-to-cart']}
              onClick={handleCart}
            >
              Add to cart
            </button>
          ) : (
            <button
              type="button"
              className={cn(
                style['purchase__add-to-cart'],
                style['purchase__add-to-cart--picked'],
              )}
              onClick={handleCart}
            >
              Added
            </button>
          )}
          <button
            type="button"
            className={cn(style['purchase__add-to-fav'], {
              [style['purchase__add-to-fav--active']]: fav.some(
                item => item.itemId === favProduct.itemId,
              ),
            })}
            onClick={handleFav}
          ></button>
        </div>
      </div>
      <section className={style.purchase__details}>
        <div className={style['purchase__details-content']}>
          <article className={cn(style.purchase__detail, style.detail)}>
            <p className={style.detail__title}>Screen</p>
            <p className={style.detail__desc}>{product.screen}</p>
          </article>
          <article className={cn(style.purchase__detail, style.detail)}>
            <p className={style.detail__title}>Capacity</p>
            <p className={style.detail__desc}>{product.capacity}</p>
          </article>
          <article className={cn(style.purchase__detail, style.detail)}>
            <p className={style.detail__title}>Processor</p>
            <p className={style.detail__desc}>{product.processor}</p>
          </article>
          <article className={cn(style.purchase__detail, style.detail)}>
            <p className={style.detail__title}>RAM</p>
            <p className={style.detail__desc}>{product.ram}</p>
          </article>
        </div>
      </section>
    </div>
  );
};
