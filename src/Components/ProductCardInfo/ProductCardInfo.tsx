import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { Product } from '../../helpers/types/Product';

type Props = {
  product: Product,
  favoriteProducts: Product[],
  setFavorite: (item: Product) => void,
  selectedProducts: Product[],
  setSelectedProducts: (item: Product) => void,
};

export const ProductCardInfo: FC<Props> = ({
  product,
  favoriteProducts,
  setSelectedProducts,
  selectedProducts,
  setFavorite,
}) => {
  const isInStoreProduct = selectedProducts.find(({ id }) => id === product.id);

  const discountPrice = useMemo(() => (
    product.price - (product.price * product.discount) / 100
  ), []);

  const hendlerLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    setFavorite(product);
  };

  const hendlerAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    setSelectedProducts(product);
  };

  return (
    <>
      <img
        className="productCard__image"
        src={`./${product.imageUrl}`}
        alt={product.name}
      />
      <p className="productCard__title">{product.name}</p>
      <div className="productCard__price">
        {product.discount ? (
          <>
            <p className="productCard__newPrice">{`$${discountPrice}`}</p>
            <p className="productCard__oldPrice">{`$${product.price}`}</p>
          </>
        ) : (
          <>
            <p className="productCard__newPrice">{`$${product.price}`}</p>
          </>
        )}
      </div>
      <div className="productCard__description">
        <p className="productCard__descriptionTitle">Screen</p>
        <p className="productCard__descriptionCard">
          {`${Number.parseFloat(product.screen)}`}
          &#8221;
          {'  OLED'}
        </p>
      </div>
      <div className="productCard__description">
        <p className="productCard__descriptionTitle">Capacity</p>
        <p className="productCard__descriptionCard">{product.capacity && `${Number.parseFloat(product.capacity) / 1000} GB`}</p>
      </div>
      <div className="productCard__description">
        <p className="productCard__descriptionTitle">RAM</p>
        <p className="productCard__descriptionCard">{product.ram && `${Number.parseFloat(product.ram) / 1000} GB`}</p>
      </div>
      <div className="productCard__buttons">
        <button
          type="button"
          onClick={hendlerAdd}
          className={classNames(
            'buttonAdd productCard__button',
            { 'buttonAdd--active': isInStoreProduct },
          )}
        >
          {isInStoreProduct ? 'Added to cart' : 'Add to cart'}
        </button>
        {/* eslint-disable-next-line */}
        <button
          type="button"
          onClick={hendlerLike}
          data-cy="addToFavorite"
          className={classNames(
            'icon icon--heart productCard__like',
            {
              'icon--redHeart': favoriteProducts
                .find(({ id }) => (
                  product.id === id
                )),
            },
          )}
        />
      </div>
    </>
  );
};
