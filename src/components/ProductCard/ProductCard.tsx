import { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import './style.scss';
import { CartContext } from '../../store/CartContext';
import { FavoritesContext } from '../../store/FavoritesContext';
import { ButtonAddCart } from '../ButtonAddCart/ButtonAddCart';
import { ButtonAddFavorites } from '../ButtonAddFavorites/ButtonAddFavorites';
import { IMG_LINK } from '../../utils/IMG_LINK';

type Props = {
  product?: Phone;
  isOnSale?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  isOnSale = true,
}) => {
  const { cartProducts } = useContext(CartContext);
  const { favoritesProducts } = useContext(FavoritesContext);
  const [isInCart, setIsInCart] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsInCart(cartProducts.some(({ id }) => {
      return product ? id === product.id : false;
    }));

    setIsInFavorites(favoritesProducts.some(({ id }) => {
      return product ? id === product.id : false;
    }));
  }, [product, cartProducts, favoritesProducts]);

  const imagePath = `${IMG_LINK}${product?.image}`;

  return (
    <div className="product-card">
      <Link
        to={`/phones/${product?.itemId}`}
        state={{ search: searchParams.toString() }}
        className="product-card__link"
      >
        <img
          src={imagePath}
          alt="Phone"
          className="product-card__img"
        />
      </Link>

      <p className="product-card__title">
        {`${product?.name} (iMT9G2FS/A)`}
      </p>

      <div className="product-card__prices">
        <p className="product-card__full_price">
          {`$${product?.fullPrice}`}
        </p>
        {isOnSale && (
          <p className="product-card__sale_price">
            {`$${product?.price}`}
          </p>
        )}
      </div>

      <div className="product-card__description">
        <p className="product-card__param">
          <span className="product-card__param_title">Screen</span>
          <span className="product-card__param_value">{product?.screen}</span>
        </p>

        <p className="product-card__param">
          <span className="product-card__param_title">Capacity</span>
          <span className="product-card__param_value">{product?.capacity}</span>
        </p>

        <p className="product-card__param">
          <span className="product-card__param_title">RAM</span>
          <span className="product-card__param_value">{product?.ram}</span>
        </p>
      </div>
      <div className="product-card__buttons">
        {product && (
          <>
            <ButtonAddCart
              product={product}
              isInCart={isInCart}
            />
            <ButtonAddFavorites
              product={product}
              isInFavorites={isInFavorites}
            />
          </>
        )}
      </div>
    </div>
  );
};
