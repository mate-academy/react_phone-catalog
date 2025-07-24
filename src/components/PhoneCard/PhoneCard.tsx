import { Link } from 'react-router-dom';
import './phoneCard.scss';

type ProductInfo = {
  id: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  capacity: string;
  ram: string;
  screen: string;
  images: string[];
};

type Props = {
  product: ProductInfo;
  showDiscount?: boolean;
};

export const PhoneCard: React.FC<Props> = ({ product, showDiscount }) => {
  const screen = product.screen.split(' ').slice(0, 2).join(' ');
  const capacity = product.capacity.replace(/(\d)([A-Za-z])/g, '$1 $2');
  const ram = product.ram.replace(/(\d)([A-Za-z])/g, '$1 $2');
  const titleModelPhoto = product.images[0];
  const modelName = product.name;
  const priceRegular = `$${product.priceRegular}`;
  const priceDiscount = `$${product.priceDiscount}`;
  const modelId = product.id;

  return (
    <div className="phone-card-container" key={modelId}>
      <Link to="/" className="photo-name-container">
        <div className="device-photo">
          <img className="photo" src={titleModelPhoto} alt="device photo" />
        </div>
        <div className='name-container'>
          <div className="name">{modelName}</div>
        </div>
      </Link>

      <div className="price-container">
        {showDiscount ? (
          <>
            <div className="regular-price">{priceRegular}</div>
            <div className="discount-price">{priceDiscount}</div>
          </>
        ) : (
          <div className="regular-price">{priceRegular}</div>
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
          <div className="button-text">Add to card</div>
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
