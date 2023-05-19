import { Link } from 'react-router-dom';
import { FC } from 'react';
import { Product } from '../../types/Product';
import { ButtonAddToCart } from '../ButtonAddToCart';
import { useAppContext } from '../../context/AppContext';
import { ButtonLike } from '../ButtonLike';
import { CharacteristicProduct } from '../CharacteristicProduct';
import './product-item.scss';

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

  const ramItem = `${Number.parseInt(ram, 10)} GB`;
  const charProd = {
    keys: ['screen', 'capacity', 'RAM'],
    values: [`${screen}`, `${capacity}`, `${ramItem}`],
  };

  return (
    <div className="product-item">
      <div className="product-item__container">
        <div className="product-item__content">
          <Link to={`/${category}/${itemId}`} className="product-item__link">
            <img src={image} alt="phones" className="product-item__img" />
            <h2 className="product-item__subtitle">{name}</h2>
          </Link>
          <div className="product-item__box-price">
            <span className="product-item__price">{`$${price}`}</span>
            <span className="product-item__full-price">{`$${fullPrice}`}</span>
          </div>
          <div className="product-item__characteristic">
            <CharacteristicProduct charProd={charProd} />
          </div>
          <div className="product-item__actions">
            <ButtonAddToCart product={product} isSelected={isSelectedInCart} />
            <ButtonLike product={product} isSelected={isSelectedFav} />
          </div>
        </div>
      </div>
    </div>
  );
};
