import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Button from '../Button/Button';
import ProductInfo from '../ProductInfo/ProductInfo';
import './ProductCard.scss';
import FavoriteButton from '../Buttons/FavoriteButton';
import CartButton from '../Buttons/CartButtons';


// import { Link} from 'react-router-dom';

type Props = { product: Product };


const ProductCard: React.FC<Props> = ({ product }) => {
  const [type, setType] = useState('phones');

  const {
    name, imageUrl, price, discount, screen, capacity, ram, id,
  } = product;
  const priceWithDiscount = (price - (price * (discount / 100)));

  useEffect(() => {
    if (type === 'phones') {
      setType('phones');
    }

    if (type === 'tablets') {
      setType('tablets');
    }

    if (type === 'accessories') {
      setType('accessories');
    }
  }, [type]);

  return (
    <div className="ProductCard__item">

      <Link to={`/${type}/${id}`}>
        <img
          src={`./${imageUrl}`}
          alt={name}
          className="ProductCard__img"
        />
      </Link>

      <Link to={`/${type}/${id}`} className="ProductCard__link">
        <p className="ProductCard__name">{name}</p>
      </Link>

      <div className="price">
        <span className="price__withDiscount">
          {' '}
          $
          {priceWithDiscount}
        </span>
        {discount !== 0 && (
          <span className="price__withoutDiscount">
            {' '}
            $
            {price}
          </span>
        )}
      </div>
      <ProductInfo title="Screen" value={screen} />
      <ProductInfo title="Ram" value={ram} />
      <ProductInfo title="Capacity" value={capacity} />
      <div className="Button">
        <CartButton product={product} />
        <FavoriteButton product={product} />
      </div>

    </div>

  );
};

export default ProductCard;
