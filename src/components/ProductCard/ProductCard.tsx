import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { ProductsTypes } from '../../types/ProductsTypes';

type Props = {
  image: string;
  name: string;
  price: number;
  priceDiscount?: number;
  screen: string;
  capacity: string;
  ram: string;
  id: string;
  productType: ProductsTypes;
};

export const ProductCard: React.FC<Props> = ({
  id,
  image,
  name,
  price,
  priceDiscount,
  screen,
  capacity,
  ram,
  productType,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${productType}/` + id);
  };

  return (
    <div className="card">
      <img
        className="card__image"
        src={`${process.env.PUBLIC_URL}/${image}`}
        alt="product"
        onClick={handleNavigate}
      />
      <p onClick={handleNavigate} className="card__title body-text">
        {name} <br />
      </p>
      <div className="card__prices">
        {priceDiscount ? (
          <Fragment>
            <h3 className="card__price">{priceDiscount}$</h3>
            <p className="card__old-price">{price}$</p>
          </Fragment>
        ) : (
          <h3 className="card__price">{price}$</h3>
        )}
      </div>
      <div className="card__info">
        <div className="card__info-item">
          <p className="card__info-param small-text">Screen</p>
          <p className="card__info-value small-text">{screen}</p>
        </div>
        <div className="card__info-item">
          <p className="card__info-param small-text">Capacity</p>
          <p className="card__info-value small-text">{capacity}</p>
        </div>
        <div className="card__info-item">
          <p className="card__info-param small-text">RAM</p>
          <p className="card__info-value small-text">{ram}</p>
        </div>
      </div>
      <div className="card__buttons">
        <a className="card__button button" href="#">
          Add to cart
        </a>
        <a className="card__favourite favourite-button" href="#"></a>
      </div>
    </div>
  );
};
