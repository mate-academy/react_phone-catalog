import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Product } from '../../types/Product';
import '../../styles/styles.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SelectedStatus } from '../../types/SelectedStatus';
import {
  setPhone,
} from '../../features/selectedPhone/selectedPhoneSlice';
import {
  setFavoritePhone, unsetFavoritePhone,
} from '../../features/PhonesFavorites/phonesFavoritesSlice';
import {
  setInCardPhone, unsetFromCardPhone,
} from '../../features/PhonesInCard/phonesInCardSlice';
import {
  favoriteProductsSelector,
  phoneCardSelector,
  selectedPhoneSelector,
  selectedPhoneStatusSelector,
} from '../../app/selector';
import { KeyJson } from '../../types/KeyJson';

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const selectedPhoneId = useAppSelector(selectedPhoneSelector)?.id;
  const statusSelectedPhone = useAppSelector(selectedPhoneStatusSelector);
  const favoritesPhones = useAppSelector(favoriteProductsSelector);
  const [isFavorite, setIsFavorite] = useState(() => {
    if (favoritesPhones.some(p => product.id === p.id)) {
      return true;
    }

    return false;
  });
  const cardedPhones = useAppSelector(phoneCardSelector);
  const [isCarded, setIsCarded] = useState(() => {
    if (cardedPhones.some(p => product.itemId === p.id)) {
      return true;
    }

    if (cardedPhones.some(p => product.id === p.id)) {
      return true;
    }

    return false;
  });

  const handleSelectingProduct = () => {
    switch (statusSelectedPhone) {
      case SelectedStatus.UNSELECTED:
        dispatch(setPhone(product));
        break;

      default:
        break;
    }

    if (selectedPhoneId !== product.id) {
      dispatch(setPhone(product));
    }
  };

  const handleFavoritesProducts = () => {
    if (favoritesPhones.find(p => p.id === product.id)) {
      dispatch(unsetFavoritePhone(product));
      setIsFavorite(false);
    } else {
      dispatch(setFavoritePhone(product));
      setIsFavorite(true);
    }
  };

  const handleCardedProducts = () => {
    if (
      product.itemId !== undefined
       && cardedPhones.find(card => card.id === product.itemId)
    ) {
      dispatch(unsetFromCardPhone(product));
      setIsCarded(false);
    } else if (
      product.id.length !== undefined
       && cardedPhones.find(card => card.id === product.id)
    ) {
      const oldApiProduct = {
        ...product,
        itemId: product.id,
      };

      dispatch(unsetFromCardPhone(oldApiProduct));
      setIsCarded(false);
    } else {
      const productToSave = product.itemId === undefined ? {
        ...product,
        itemId: product.id,
      } : product;

      dispatch(setInCardPhone(productToSave));
      setIsCarded(true);
    }
  };

  useEffect(() => {
    window.localStorage.setItem(KeyJson.CARD, JSON.stringify(cardedPhones));
  }, [cardedPhones]);

  const price = product.discount
    ? product.price - product.discount
    : product.price;
  const fullPrice = product.fullPrice ? product.fullPrice : product.price;

  return (
    <div className="product-card" key={product.id}>
      <Link
        className="product-card__link"
        to={`/${product.phoneId ? 'phones' : 'tablets'}/${product.phoneId || product.id}`}
        onClick={handleSelectingProduct}
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
          onClick={handleCardedProducts}
        >
          Add to cart
        </button>
        <button
          type="button"
          className="product-card__add-to-favorites add-to-favorites"
          onClick={handleFavoritesProducts}
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
