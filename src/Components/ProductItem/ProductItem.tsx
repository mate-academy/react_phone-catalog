import { Heart } from '../../SVG/Heart/Heart';
import { Phone } from '../../types/Phone';
import './ProductItem.scss';

type Props = {
  info: Phone;
};

export const ProductItem: React.FC<Props> = ({ info }) => {
  return (
    <div className="ProductItem">
      <div className="ProductItem__imageWrapper">
        <img
          src={info.imageUrl}
          alt="phone"
          className="ProductItem__image"
        />
      </div>
      <h1 className="ProductItem__name">
        {info.name}
      </h1>
      <div className="ProductItem__price">
        {
          info.discount !== 0 ? (
            <>
              <h3 className="ProductItem__discounted">
                {`$${info.price - info.discount}`}
              </h3>
              <h3 className="ProductItem__original">
                {`$${info.price}`}
              </h3>
            </>
          ) : (
            <h3 className="ProductItem__discounted">
              {`$${info.price}`}
            </h3>
          )
        }
      </div>
      <div className="ProductItem__description">
        <h3 className="ProductItem__category">
          Screen
        </h3>
        <h3 className="ProductItem__specifications">
          {info.screen}
        </h3>
      </div>
      <div className="ProductItem__description">
        <h3 className="ProductItem__category">
          Capacity
        </h3>
        <h3 className="ProductItem__specifications">
          {info.capacity}
        </h3>
      </div>
      <div className="ProductItem__description">
        <h3 className="ProductItem__category">
          RAM
        </h3>
        <h3 className="ProductItem__specifications">
          {info.ram}
        </h3>
      </div>
      <div className="ProductItem__actions">
        <button
          type="button"
          className="ProductItem__cardBtn"
        >
          Add to cart
        </button>
        <button
          type="button"
          className="ProductItem__liked"
        >
          <Heart />
        </button>
      </div>
    </div>
  );
};
