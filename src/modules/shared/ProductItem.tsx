import React from 'react';
import { Product } from './types/Product';
import style from './ProductItem.module.scss';
import { useFavourites } from './context/FavouritesContext';
import { Gadget } from './types/Gadget';
import { Link } from 'react-router-dom';
import { useCart } from './context/CartContext';

type Props = {
  product: Product | Gadget;
  discount?: boolean;
  styles?: React.CSSProperties;
};

export const ProductItem: React.FC<Props> = ({ product, discount, styles }) => {
  const { favourites, toggleFavourite } = useFavourites();
  const { addProduct, products } = useCart();
  const isAdded = products.some(p => p.id === product.id);

  const handleAddProduct = (productId: string) => {
    addProduct(productId);
  };

  return (
    <div className={style.product} style={styles}>
      <Link
        to={`/product/${'itemId' in product ? product.itemId : product.id}`}
      >
        <img
          className={style.product__image}
          src={`./${'image' in product ? product.image : product.images?.[0]}`}
          alt={product.name}
        />
      </Link>
      <div className={style.product__buy}>
        <h3>
          <Link
            to={`/product/${'itemId' in product ? product.itemId : product.id}`}
            className={style.product__name}
          >
            {product.name}
          </Link>
        </h3>
        {discount ? (
          <p className={style.product__price}>
            ${'price' in product ? product.price : product.priceDiscount}
            <span className={style.product__discount}>
              $
              {'fullPrice' in product
                ? product.fullPrice
                : product.priceRegular}
            </span>
          </p>
        ) : (
          <p className={style.product__price}>
            ${'fullPrice' in product ? product.fullPrice : product.priceRegular}
          </p>
        )}
      </div>
      <div className={style.product__description}>
        <div className={style.product__key}>
          <p>Screen</p>
          <p>Capacity</p>
          <p>RAM</p>
        </div>
        <div className={style.product__value}>
          <p>{product.screen}</p>
          <p>{product.capacity}</p>
          <p>{product.ram}</p>
        </div>
      </div>
      <div className={style.product__like}>
        <button
          className={isAdded ? style.product__added : style.product__add}
          disabled={isAdded}
          onClick={() =>
            handleAddProduct('itemId' in product ? product.itemId : product.id)
          }
        >
          {isAdded ? 'Added to cart' : 'Add to cart'}
        </button>
        <div
          className={style.product__heart}
          onClick={() => toggleFavourite(product.id)}
        >
          <img
            src={
              favourites.includes(product.id)
                ? 'icons/heart-red.png'
                : 'icons/heart.png'
            }
            alt="Like"
          ></img>
        </div>
      </div>
    </div>
  );
};
