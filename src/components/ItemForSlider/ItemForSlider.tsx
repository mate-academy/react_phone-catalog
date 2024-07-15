import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import './ItemForSlider.scss';

type Props = {
  product: Product;
};

export const ItemForSlider: React.FC<Props> = ({ product }) => {
  const {
    // addedToFavourites,
    // addedToCart,
    // category,
    // itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  return (
    <section className="itemForSlider">
      <Link to="" className="itemForSlider__link">
        <img src={image} alt={name} className="itemForSlider__link-image" />
      </Link>
      <div className="itemForSlider__title">{name}</div>
      <div className="itemForSlider__price">
        <h3 className="itemForSlider__price-seil">{`$${price}`}</h3>
        <h3 className="itemForSlider__price-full">{`$${fullPrice}`}</h3>
      </div>
      <p className="itemForSlider__line" />
      <div className="itemForSlider__description">
        <div className="itemForSlider__description-block">
          <p className="itemForSlider__description-name">Screen</p>
          <p className="itemForSlider__description-value">{screen}</p>
        </div>
        <div className="itemForSlider__description-block">
          <p className="itemForSlider__description-name">Capacity</p>
          <p className="itemForSlider__description-value">{capacity}</p>
        </div>
        <div className="itemForSlider__description-block">
          <p className="itemForSlider__description-name">Ram</p>
          <p className="itemForSlider__description-value">{ram}</p>
        </div>
      </div>
    </section>
  );
};
