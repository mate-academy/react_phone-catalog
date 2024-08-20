import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../types/Product';
import { useAppContext } from '../../../context/AppContext';
import './ProductItem.scss';

// eslint-disable-next-line max-len
import { CharacteristicProduct } from '../CharacteristicProduct/CharacteristicProduct';
import { ButtonAddToCart } from '../ButtonAddToCart/ButtonAddToCart';
import { ButtonLike } from '../ButtonLike/ButtonLike';
import { Size } from '../../../types/Size';

type Props = {
  product: Product;
};

export const ProductItem: FC<Props> = ({ product }) => {
  const {
    name,
    fullPrice,
    image,
    screen,
    capacity,
    ram,
    price,
    category,
    itemId,
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
            <img src={image} alt={name} className="product-item__img" />
            <h3 className="product-item__subtitle">{name} (iMT9G2FS/A)</h3>
          </Link>
          <div className="product-item__box-price">
            <span className="product-item__price">${price}</span>
            <span className="product-item__full-price">${fullPrice}</span>
          </div>
          <div className="product-item__characteristic">
            <CharacteristicProduct charProd={charProd} size={Size.Small} />
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
