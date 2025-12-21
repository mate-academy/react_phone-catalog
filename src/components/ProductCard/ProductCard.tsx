import { useContext, useMemo } from 'react';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import { GlobalContext } from '../../context/GlobalContext';
import classNames from 'classnames';
import { Price } from '../Price';
import { CartButton } from '../CartButton';
import { FavButton } from '../FavButton';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
  discount: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, discount }) => {
  return (
    <Link
      to={`/${product.category}/${product.itemId}`}
      className="card"
    >
      <div className="card__container">
        <div className="card__photo">
          <img src={product.image} alt="card-image" className="card__image" />
        </div>
        <p className="card__title">{product.name}</p>

        <Price
          price={{
            'fullPrice': product.fullPrice,
            'price': product.price,
          }}
          discount={discount}
        />

        <div className="card__specifications">
          <div className="card__block">
            <p className="card__param">Screen</p>
            <p className="card__value">{product.screen}</p>
          </div>
          <div className="card__block">
            <p className="card__param">Capacity</p>
            <p className="card__value">{product.capacity}</p>
          </div>
          <div className="card__block">
            <p className="card__param">RAM</p>
            <p className="card__value">{product.ram}</p>
          </div>
        </div>
        <div className="card__buttons">

          <CartButton
            productId={product.itemId}
          />

          <FavButton
            productId={product.itemId}
          />
        </div>
      </div>
    </Link>
  );
};
