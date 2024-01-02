/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  Link,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { useProductStore } from '../../helpers/store';

import './ProductItem.scss';

type Props = {
  product: Product,
};

export const ProductItem: React.FC<Props> = ({ product }) => {
  const [searchParams] = useSearchParams();
  const link = `/phones/${product.phoneId}`;

  const favProductsId = useProductStore((state) => state.favProductsId);
  const addFavProduct = useProductStore((state) => state.addFavProductId);
  const deleteFavProduct = useProductStore((state) => state.deleteFavProductId);
  const isProductFav = favProductsId.find(p => p === product.phoneId);
  const handleFavButtonClick = () => {
    if (isProductFav) {
      deleteFavProduct(product.phoneId);
    } else {
      addFavProduct(product.phoneId);
    }
  };

  const cartProducts = useProductStore((state) => state.cartProducts);
  const addCartProduct = useProductStore((state) => state.addCartProductId);
  const deleteCartProduct = useProductStore((state) => state.deleteCartProductId);
  const isProductAddedToCart = cartProducts.find(p => p.name === product.phoneId);
  const handleCartButtonClick = () => {
    if (isProductAddedToCart) {
      deleteCartProduct(product.phoneId);
    } else {
      addCartProduct(product.phoneId);
    }
  };

  return (
    <div className="product">
      <Link
        to={{
          pathname: link,
        }}
        state={{ search: searchParams.toString() }}
        data-cy="cardsContainer"
      >

        <div className="product__image">
          <img
            src={product.image}
            alt={product.id}
            className="product__image"
          />
        </div>
        <div className="product__top">
          <p className="product__top__name">
            <span>{`${product.name} (iMT9G2FS/A)`}</span>
          </p>
          <p className="product__top__price">
            <span className="product__top__price-full">{`$${product.price}`}</span>
            <span className="product__top__price-disc">{`$${product.fullPrice}`}</span>
          </p>
        </div>
      </Link>
      <div className="product__middle">
        <p className="product__middle__item">
          <span className="text text--small text--gray">Screen</span>
          <span>{product.screen}</span>
        </p>
        <p className="product__middle__item">
          <span className="text text--small text--gray">Capacity</span>
          <span>{product.capacity}</span>
        </p>
        <p className="product__middle__item">
          <span className="text text--small text--gray">RAM</span>
          <span>{product.ram}</span>
        </p>
      </div>
      <div className="product__bottom">
        <button
          className={
            classNames('button__cart', {
              'button__cart-selected': isProductAddedToCart,
            })
          }
          type="button"
          onClick={handleCartButtonClick}
        />
        <button
          className={
            classNames('button__fav', {
              'button__fav-selected': isProductFav,
            })
          }
          type="button"
          onClick={handleFavButtonClick}
        />
      </div>
    </div>
  );
};
