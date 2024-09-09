import { Link } from 'react-router-dom';
import { OldProduct } from '../types/OldProducts';
import './DiscountProduct.scss';

type Props = {
  discountProduct: OldProduct;
};

export const DiscountProduct = ({ discountProduct }: Props) => {
  return (
    <div className="discountproduct">
      <Link to={`/oldPhones/${discountProduct.id}`}>
        <img
          className="discountproduct__image"
          src={discountProduct.imageUrl}
          alt={discountProduct.name}
        />
      </Link>

      <h2 className="discountproduct__name">{discountProduct.name}</h2>
      <div className="discountproduct__prices">
        <div className="discountproduct__price">
          {`$${discountProduct.price - discountProduct.discount}`}
        </div>
        {discountProduct.discount === 0 ? (
          ''
        ) : (
          <div className="discountproduct__before-discount">
            <del>{`$${discountProduct.price}`}</del>
          </div>
        )}
      </div>
      <div className="discountproduct__line" />
      <div className="discountproduct__description">
        <div className="discountproduct__screen">
          <div className="discountproduct__screen--title">Screen</div>
          <div className="discountproduct__screen--value">
            {discountProduct.screen}
          </div>
        </div>
        <div className="discountproduct__capacity">
          <div className="discountproduct__capacity--title">Capacity</div>
          <div className="discountproduct__capacity--value">
            {discountProduct.capacity}
          </div>
        </div>
        <div className="discountproduct__ram">
          <div className="discountproduct__ram--title">RAM</div>
          <div className="discountproduct__ram--value">
            {discountProduct.ram}
          </div>
        </div>
      </div>
      <div className="discountproduct__buttons">
        <button className="discountproduct__adding-button">Add to cart</button>
        <button className="discountproduct__button-with-heart"></button>
      </div>
    </div>
  );
};
