import { FC } from 'react';
import './ProductCard.scss';
import { ProductAllType } from '../../types/Product';
import { ProductCardButtons } from './ProductCardButtons';
import { useProducts } from '../../context/ProductsContext';
import { NameProducts } from '../../types/NameProducts';
import { Link, useLocation, useParams } from 'react-router-dom';

type Props = {
  product: ProductAllType;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const { image, name, price, screen, capacity, ram, fullPrice, itemId } =
    product;
  const local = useLocation();

  const { findNessesaryItem } = useProducts();

  return (
    <div className="card">
      <Link to={`./${itemId}`} className="card__link">
        <img src={image} alt="" className="card__image" />
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
