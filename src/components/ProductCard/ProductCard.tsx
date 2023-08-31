// import { Link } from 'react-router-dom';
import { Button, IconButton } from '../../bits';
import { ButtonType, Product } from '../../types';
import { IconButtonType } from '../../types/enums/IconButtonType';
import './ProductCard.scss';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name,
    imageUrl,
    price,
    discount,
  } = product;

  const getPriceWithDiscount = () => {
    return price - ((price / 100) * discount);
  };

  return (
    <div className="product-card">
      <img
        className="product-card__img"
        alt={name}
        src={`${imageUrl}`}
      />
      <h3 className="product-card__name">{name}</h3>
      <div className="product-card__price-block">
        <p className="product-card__price-w-discount">{`$${getPriceWithDiscount()}`}</p>
        {!discount && (<p className="product-card__price">{`$${price}`}</p>)}
      </div>

      <div className="product-card__specs">
        <p>Screen</p>
        <p className="product-card__specs--right">5.8” OLED</p>
        <p>Capacity</p>
        <p className="product-card__specs--right">64 GB</p>
        <p>RAM</p>
        <p className="product-card__specs--right">4 GB</p>
      </div>

      <div className="product-card__buttons-block">
        <Button size={ButtonType.cart} />

        <IconButton type={IconButtonType.fav} />
      </div>

    </div>
  );
};
