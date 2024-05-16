import React, { useContext } from 'react';
import './ProductCard.scss';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { StoreContext } from '../../context/StoreContext';
import classNames from 'classnames';

type Props = {
  isDiscount: boolean;
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ isDiscount, product }) => {
  const {
    itemId,
    category,
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  const {
    favouriteProducts,
    setFavouriteProducts,
    basketProducts,
    setBasketProducts,
  } = useContext(StoreContext);

  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const isFavourite = () => {
    const favorutriteIds = favouriteProducts.map(fp => fp.itemId);

    return favorutriteIds.includes(product.itemId);
  };

  const isInBasket = () => {
    const basketIds = basketProducts.map(bp => bp.itemId);

    return basketIds.includes(product.itemId);
  };

  const handleAddToBasket = () => {
    const productWithAmount = {
      ...product,
      amount: 1,
    };

    if (isInBasket()) {
      const newProducts = basketProducts.filter(
        bp => bp.itemId !== product.itemId,
      );

      setBasketProducts(newProducts);
    } else {
      setBasketProducts([...basketProducts, productWithAmount]);
    }
  };

  const handleAddToFavourite = () => {
    if (isFavourite()) {
      const newProducts = favouriteProducts.filter(
        fp => fp.itemId !== product.itemId,
      );

      setFavouriteProducts(newProducts);
    } else {
      setFavouriteProducts([...favouriteProducts, product]);
    }
  };

  return (
    <div className="card">
      <Link
        to={`/${category}/${itemId}`}
        state={{ pathname, search: searchParams.toString() }}
        className="card__link"
      >
        <img className="card__image" src={image} alt={itemId} />

        <div className="card__title">{name}</div>

        <div className="card__price">
          <div className="price--new">{`$${price}`}</div>
          {isDiscount && <div className="price--old">{`$${fullPrice}`}</div>}
        </div>

        <div className="card__specifications">
          <div className="specification">
            <span className="specification__title">Screen</span>
            <span className="specification__value">{screen}</span>
          </div>
          <div className="specification">
            <span className="specification__title">Capacity</span>
            <span className="specification__value">{capacity}</span>
          </div>
          <div className="specification">
            <span className="specification__title">RAM</span>
            <span className="specification__value">{ram}</span>
          </div>
        </div>
      </Link>

      <div className="card__buttons">
        <button
          className={classNames('button--add-to-card', {
            'button--add-to-card--active': isInBasket(),
          })}
          onClick={handleAddToBasket}
        >
          Add to card
        </button>
        <button
          className={classNames('button--add-to-favourite', {
            'button--add-to-favourite--active': isFavourite(),
          })}
          onClick={handleAddToFavourite}
        />
      </div>
    </div>
  );
};
