import React, { useContext } from 'react';
import RS from './RightSide.module.scss';
import { ProductDetails } from '../../../../types/ProductDetails';
import cn from 'classnames';
import { Product } from '../../../../types/Product';
import { FavouritesContext } from '../../../../contexts/FavouritesContext';
import { CartContext } from '../../../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const appleColors: { [name: string]: string } = {
  black: '#000000', // classic black
  green: '#4D7B6A', // midnight green
  yellow: '#FFD950', // iPhone yellow
  white: '#FFFFFF', // standard white
  purple: '#BFACE3', // iPhone purple
  red: '#FF3B30', // (PRODUCT)RED
  spacegray: '#4B4B4B', // Space Gray
  midnightgreen: '#4D7B6A', // Midnight Green
  gold: '#F6E0C9', // iPhone gold
  silver: '#C0C0C0', // silver finish
  rosegold: '#B76E79', // rose gold
  coral: '#FF7F50', // coral
  midnight: '#1C1C1C', // dark midnight
  spaceblack: '#000000', // space black
  blue: '#0071E3', // iPhone blue
  pink: '#FFC0CB', // pink
  graphite: '#383838', // graphite
  sierrablue: '#96AED1', // Sierra Blue
  'rose gold': '#B76E79', // rose gold duplicate
  'sky blue': '#87CEEB', // sky blue
  starlight: '#F5F5F5', // starlight
  'space gray': '#4B4B4B', // Space Gray duplicate
};

type Props = {
  product: ProductDetails;
  analogProducts: ProductDetails[];
  isNewest2022?: boolean;
  prod: Product[];
};

export const RightSide: React.FC<Props> = ({
  product,
  analogProducts,
  isNewest2022,
  prod,
}) => {
  const { toggleFavourite, isFavourite } = useContext(FavouritesContext);
  const { addToCart, removeFromCart, isInCart } = useContext(CartContext);
  const navigate = useNavigate();

  const pickByColor = (color: string) => {
    const analogP = analogProducts.find(
      p => p.color === color && p.capacity === product.capacity,
    );

    if (!analogP) {
      return;
    }

    navigate(`/${product.category}/${analogP.id}`);
  };

  const pickByGB = (capacity: string) => {
    const analogP = analogProducts.find(
      p => p.capacity === capacity && p.color === product.color,
    );

    if (!analogP) {
      return;
    }

    navigate(`/${product.category}/${analogP.id}`);
  };

  const readyProduct = prod.find(p => p.itemId === product.id);

  if (!readyProduct) {
    return;
  }

  const isActive = isFavourite(product.id);
  const isInCartAlready = isInCart(product.id);

  return (
    <div className={RS.rs}>
      <div className={RS.rs__colors}>
        <div className={RS.rs__colors__header}>
          <p className={RS.rs__colors__title}>Available colors</p>
          <p className={RS.rs__colors__ID}>ID: 802390</p>
        </div>
        <ul className={RS.rs__colors__list}>
          {product.colorsAvailable.map(color => (
            <li
              className={cn(RS.rs__colors__item, {
                [RS.rs__colors__item__active]: color === product.color,
              })}
              key={color}
            >
              <button
                className={RS.rs__colors__button}
                style={{ backgroundColor: appleColors[color] }}
                onClick={() => pickByColor(color)}
              />
            </li>
          ))}
        </ul>
        <div className={RS.rs__line}></div>
      </div>
      <div className={RS.rs__capacity}>
        <p className={RS.rs__capacity__title}>Select capacity</p>

        <ul className={RS.rs__capacity__list}>
          {product.capacityAvailable.map(capacity => (
            <li className={RS.rs__capacity__item} key={capacity}>
              <button
                className={cn(RS.rs__capacity__button, {
                  [RS.rs__capacity__button__active]:
                    capacity === product.capacity,
                })}
                onClick={() => pickByGB(capacity)}
              >
                {capacity}
              </button>
            </li>
          ))}
        </ul>
        <div className={RS.rs__line}></div>
      </div>
      <div className={RS.rs__price}>
        <div className={RS.rs__prices}>
          {!isNewest2022 ? (
            <>
              <span
                className={RS.prices__price}
              >{`$${product.priceDiscount}`}</span>
              <span className={cn(RS.prices__price, RS['prices__price--full'])}>
                {`$${product.priceRegular}`}
              </span>
            </>
          ) : (
            <div className={RS.prices__price}>{`$${product.priceRegular}`}</div>
          )}
        </div>
        <div className={RS.rs__buttons}>
          {!isInCartAlready ? (
            <button
              type="button"
              className={RS['rs__add-to-cart']}
              onClick={() => {
                addToCart(readyProduct);
              }}
            >
              Add to cart
            </button>
          ) : (
            <button
              type="button"
              className={cn(
                RS['rs__add-to-cart'],
                RS['rs__add-to-cart--picked'],
              )}
              onClick={() => {
                removeFromCart(readyProduct.itemId);
              }}
            >
              Added to cart
            </button>
          )}
          <button
            type="button"
            className={cn(RS['rs__add-to-fav'], {
              [RS['rs__add-to-fav--active']]: isActive,
            })}
            onClick={() => {
              toggleFavourite(readyProduct);
            }}
          ></button>
        </div>
      </div>
      <section className={RS.details}>
        <div className={RS.details__content}>
          <article className={RS.detail}>
            <p className={RS.detail__title}>Screen</p>
            <p className={RS.detail__desc}>{product.screen}</p>
          </article>
          <article className={RS.detail}>
            <p className={RS.detail__title}>Resolution</p>
            <p className={RS.detail__desc}>{product.resolution}</p>
          </article>
          <article className={RS.detail}>
            <p className={RS.detail__title}>Processor</p>
            <p className={RS.detail__desc}>{product.processor}</p>
          </article>
          <article className={RS.detail}>
            <p className={RS.detail__title}>RAM</p>
            <p className={RS.detail__desc}>{product.ram}</p>
          </article>
        </div>
      </section>
    </div>
  );
};
