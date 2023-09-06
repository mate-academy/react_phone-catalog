// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
    image,
    fullPrice,
    price,
    ram,
    capacity,
    screen,
    phoneId,
  } = product;

  return (
    <Link
      to={`/phones/${phoneId}`}
      className="product-card"
    >
      <img
        className="product-card__img"
        alt={name}
        src={`/_new/${image}`}
      />
      <h3 className="product-card__name">{name}</h3>
      <div className="product-card__price-block">
        <p className="product-card__price-w-discount">{`$${price}`}</p>
        <p className="product-card__price">{`$${fullPrice}`}</p>
      </div>

      <div className="product-card__specs">
        <p>Screen</p>
        <p className="product-card__specs--right">{screen}</p>
        <p>Capacity</p>
        <p className="product-card__specs--right">{capacity}</p>
        <p>RAM</p>
        <p className="product-card__specs--right">{ram}</p>
      </div>

      <div className="product-card__buttons-block">
        <Button size={ButtonType.cart} />

        <IconButton type={IconButtonType.fav} />
      </div>
    </Link>
  );
};
