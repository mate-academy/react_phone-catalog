import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Product } from '../../types/Product';
import '../../styles/styles.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SelectedStatus } from '../../types/SelectedStatus';
import {
  setPhone, unsetPhone,
} from '../../features/selectedPhone/selectedPhoneSlice';
import {
  setFavoritePhone, unsetFavoritePhone,
} from '../../features/PhonesFavorites/phonesFavoritesSlice';
import {
  setInCardPhone, unsetFromCardPhone,
} from '../../features/PhonesInCard/phonesInCardSlice';

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const selectedPhoneId = useAppSelector(
    state => state.selectedPhone.value?.id,
  );
  const statusSelectedPhone = useAppSelector(
    state => state.selectedPhone.status,
  );
  const favoritesPhones = useAppSelector(state => state.phonesFavorites.value);
  const [isFavorite, setIsFavorite] = useState(() => {
    if (favoritesPhones.some(p => product.id === p.id)) {
      return true;
    }

    return false;
  });
  const cardedPhones = useAppSelector(state => state.phonesCarded.value);
  const [isCarded, setIsCarded] = useState(() => {
    if (cardedPhones.some(p => product.id === p.id)) {
      return true;
    }

    return false;
  });

  function handleSelectingProduct(payload: Product) {
    switch (statusSelectedPhone) {
      case SelectedStatus.SELECTED:
        dispatch(unsetPhone());
        break;

      case SelectedStatus.UNSELECTED:
        dispatch(setPhone(payload));
        break;

      default:
        break;
    }

    if (selectedPhoneId !== payload.id) {
      dispatch(setPhone(payload));
    }
  }

  function handleFavoritesProducts(payload: Product) {
    if (favoritesPhones.find(p => p.id === product.id)) {
      dispatch(unsetFavoritePhone(payload));
      setIsFavorite(false);
    } else {
      dispatch(setFavoritePhone(payload));
      setIsFavorite(true);
    }
  }

  function handleCardedProducts(payload: Product) {
    if (cardedPhones.find(p => p.id === product.id)) {
      dispatch(unsetFromCardPhone(payload));
      setIsCarded(false);
    } else {
      dispatch(setInCardPhone(payload));
      setIsCarded(true);
    }
  }

  const price = product.discount
    ? product.price - product.discount
    : product.price;
  const fullPrice = product.fullPrice ? product.fullPrice : product.price;

  return (
    <div className="product-card" key={product.id}>
      <Link
        className="product-card__link"
        to={`/phones/${product.phoneId}`}
        onClick={() => (handleSelectingProduct(product))}
      >

        <img
          src={product.imageUrl || product.image}
          alt="Phone"
          className="product-card__phone-img"
        />
        <h2 className="product-card__title">
          {product.name}
        </h2>
      </Link>

      <p className="product-card__price">{`${price}$`}</p>
      {price !== fullPrice && (
        <p className="product-card__price product-card__price--discount">
          {`${fullPrice}$`}
        </p>
      )}
      <dl className="product-card__description-phone description-phone">
        <dt className="description-phone--title">Screen</dt>
        <dd className="description-phone--value">{product.screen}</dd>
        <dt className="description-phone--title">Capacity</dt>
        <dd className="description-phone--value">{product.capacity}</dd>
        <dt className="description-phone--title">RAM</dt>
        <dd className="description-phone--value">{product.ram}</dd>
      </dl>
      <div className="product-card__container">
        <button
          className={classNames(
            'product-card__add-to-card',
            { 'product-card__add-to-card--is-added': isCarded },
          )}
          type="button"
          onClick={() => handleCardedProducts(product)}
        >
          Add to cart
        </button>
        <button
          type="button"
          className="product-card__add-to-favorites add-to-favorites"
          onClick={() => handleFavoritesProducts(product)}
        >
          <img
            className="add-to-favorites__icon"
            src={isFavorite
              ? 'images/icons/HeartLikeFilled.svg'
              : 'images/icons/HeartLike.svg'}
            alt="icon"
          />
        </button>
      </div>
    </div>
  );
};
