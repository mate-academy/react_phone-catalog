import { HotPricesProduct } from '../types/HotPricesProducts';

type Props = {
  discountProduct: HotPricesProduct;
};

export const DiscountProduct = ({ discountProduct }: Props) => {
  return (
    <div className="discountproduct">
      <img
        className="discountproduct__image"
        src={'_old/v1/img/motorola-xoom-with-wi-fi.0.jpg'}
        alt={discountProduct.name}
      />

      <h2 className="discountproduct__name">{discountProduct.name}</h2>
      <div className="discountproduct__price">{`$${discountProduct.price}`}</div>
      <div className="discountproduct__line"></div>
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
