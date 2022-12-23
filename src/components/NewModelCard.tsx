import { FC } from 'react';
import { Product } from 'types/Product';
import { HeartIcon } from './Icons/HeartIcon';

type Props = {
  newModel: Product;
};

export const NewModelCard: FC<Props> = ({ newModel }) => {
  const {
    name, imageUrl, price, screen, capacity, ram,
  } = newModel;

  return (
    <div className="new-model__card card">
      <img
        className="card__img"
        src={require(`../assets/${imageUrl}`).default}
        alt="phone"
      />
      <div className="new-model__top-block">
        <div className="card__desc">{name}</div>

        <div className="card__price">
          <div className="card__price-actual">{`${price}$`}</div>
        </div>
      </div>

      <div className="card__features">
        <div className="card__feature">
          <div className="card__feature-key">Screen</div>
          <div className="card__feature-vaue">{screen}</div>
        </div>
        <div className="card__feature">
          <div className="card__feature-key">Capacity</div>
          <div className="card__feature-vaue">{capacity}</div>
        </div>
        <div className="card__feature">
          <div className="card__feature-key">RAM</div>
          <div className="card__feature-value">{ram}</div>
        </div>
      </div>

      <div className="card__buttons">
        <div className="button-add-to-card">
          Add to cart
        </div>
        <div className="button-add-to-fav button-add-to-fav--selected">
          <HeartIcon />
        </div>
      </div>
    </div>
  );
};
