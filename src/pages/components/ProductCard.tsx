import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Phone } from '../../types/Phone';
import '../../styles/styles.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SelectedStatus } from '../../types/SelectedStatus';
import {
  setPhone, unsetPhone,
} from '../../features/selectedPhone/selectedPhoneSlice';

type Props = {
  product: Phone;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const selectedPhoneId = useAppSelector(
    state => state.selectedPhone.value?.id,
  );
  const statusSelectedPhone = useAppSelector(
    state => state.selectedPhone.status,
  );

  function handleSelectingProduct(payload: Phone) {
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

  return (
    <div className="product-card" key={product.id}>
      <Link
        className="product-card__link"
        to={`./${product.id}`}
        onClick={() => (handleSelectingProduct(product))}
      >

        <img
          src={product.image}
          alt="Phone"
          className="product-card__phone-img"
        />
        <h2 className="product-card__title">
          {/* Apple iPhone Xs 64GB Silver (iMT9G2FS/A) */}
          {product.name}
        </h2>
      </Link>

      <p className="product-card__price">{`${product.price}$`}</p>
      <p className="product-card__price product-card__price--discount">{`${product.fullPrice}$`}</p>
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
          className="product-card__add-to-card"
          type="button"
        >
          Add to cart
        </button>
        <a
          href="http://"
          className="product-card__add-to-favorites add-to-favorites"
        >
          <img
            className="add-to-favorites__icon"
            src="images/icons/HeartLike.svg"
            alt="icon"
          />
        </a>
      </div>
    </div>
  );
};
