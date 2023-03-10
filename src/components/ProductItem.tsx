import { Link } from 'react-router-dom';
import { FC } from 'react';
import { Product } from '../types/Product';
import { Button } from './Button';
import { useAppContext } from '../context/AppContext';
import { ButtonLike } from './ButtonLike';

type Props = {
  product: Product;
};

export const ProductItem: FC<Props> = ({ product }) => {
  const {
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
    itemId,
    category,
  } = product;
  const { favorites, inCart, isSelectedProduct } = useAppContext();
  const isSelectedFav = isSelectedProduct(itemId, favorites);
  const isSelectedInCart = isSelectedProduct(itemId, inCart);

  return (
    <div className="product">
      <div className="product__container">
        <div className="product__content">
          <Link to={`/${category}/${itemId}`} className="product__link">
            <img src={image} alt="phones" className="product__img" />
            <h2 className="product__subtitle">{name}</h2>
          </Link>
          <div className="product__box-price">
            <span className="product__price">{`$${price}`}</span>
            <span className="product__full-price">{`$${fullPrice}`}</span>
          </div>
          <div className="product__box-characteristic">
            <div className="product__characteristic">
              <span className="product__key">screen</span>
              <span className="product__value">{screen}</span>
            </div>
            <div className="product__characteristic">
              <span className="product__key">capacity</span>
              <span className="product__value">{capacity}</span>
            </div>
            <div className="product__characteristic">
              <span className="product__key">RAM</span>
              <span className="product__value">{ram}</span>
            </div>
          </div>
          <div className="product__actions">
            <Button product={product} isSelected={isSelectedInCart} />
            <ButtonLike product={product} isSelected={isSelectedFav} />
          </div>
        </div>
      </div>
    </div>
  );
};
