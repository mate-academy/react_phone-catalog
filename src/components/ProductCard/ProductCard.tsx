import { FC } from 'react';
import './ProductCard.scss';
import { ProductAllType } from '../../types/Product';
import { ProductCardButtons } from './ProductCardButtons';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/utils';

type Props = {
  product: ProductAllType;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const {
    image,
    name,
    price,
    screen,
    capacity,
    ram,
    fullPrice,
    itemId,
    category,
  } = product;

  return (
    <div className="card">
      <Link
        to={`/${category}/${itemId}`}
        state={{ product, itemId }}
        className="card__link"
        onClick={() => scrollToTop()}
      >
        <img src={`../${image}`} alt="" className="card__image" />
        <div className="card__title">{name}</div>
        <div className="card__price">
          <span className="card__price--sale">${price} </span>
          <span className="card__price--full">${fullPrice}</span>
        </div>
      </Link>
      <div className="card__block">
        <div className="card__info">
          <div className="card__param">
            <span className="card__param_name">Screen</span>
            <span className="card__param_value">{screen}</span>
          </div>
          <div className="card__param">
            <span className="card__param_name">Capacity</span>
            <span className="card__param_value">{capacity}</span>
          </div>
          <div className="card__param">
            <span className="card__param_name">RAM</span>
            <span className="card__param_value">{ram}</span>
          </div>
        </div>
        <ProductCardButtons product={product} />
      </div>
    </div>
  );
};
