import { Link } from 'react-router-dom';
import { AllProductsType } from '../../types/AllProductsType';
// import { PhoneInfoType } from '../../types/PhoneInfoType';
import './productCard.scss';

type Props = {
  product: AllProductsType;
  showDiscount?: boolean;
  // phone: PhoneInfoType;
};

export const ProductCard: React.FC<Props> = ({ product, showDiscount}) => {
  const screen = product.screen.split(' ').slice(0, 2).join(' ');
  const capacity = product.capacity.replace(/(\d)([A-Za-z])/g, '$1 $2');
  const ram = product.ram.replace(/(\d)([A-Za-z])/g, '$1 $2');
  const titleModelPhoto = product.image;
  const modelName = product.name;

  const priceRegular = `$${product.fullPrice}`;

  const priceDiscount = `$${product.price}`;
  const modelId = product.id;

  return (
    <div className="product-card-container" key={modelId}>
      <Link to="/" className="photo-name-container">
        <div className="device-photo">
          <img className="photo" src={titleModelPhoto} alt="device photo" />
        </div>

        <div className="name-container">
          <div className="name">{modelName}</div>
        </div>
      </Link>

      <div className="price-container">
        {showDiscount ? (
          <>
            <div className="price">{priceDiscount}</div>
            <div className="price old-price">{priceRegular}</div>
          </>
        ) : (
          <div className="price">{priceRegular}</div>
        )}
      </div>

      <div className="info">
        <div className="screen">
          <div className="spec-name">Screen</div>
          <div className="spec-value">{screen}</div>
        </div>

        <div className="capacity">
          <div className="spec-name">Capacity</div>
          <div className="spec-value">{capacity}</div>
        </div>

        <div className="ram">
          <div className="spec-name">RAM</div>
          <div className="spec-value">{ram}</div>
        </div>
      </div>

      <div className="add-favourites-container">
        <div className="add-button has-shadow-cursor">
          <p className="button-text">Add to card</p>
        </div>

        <div className="favourites-button has-shadow-cursor">
          <img
            className="icon"
            src="/img/icons/Heart.svg"
            alt="favourites img"
          />
        </div>
      </div>
    </div>
  );
};
