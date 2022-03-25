import { Link } from 'react-router-dom';
import { Phone } from './ProductCard';

type Props = {
  gadgetsList: Phone[],
};

export const Categories: React.FC<Props> = ({ gadgetsList }) => {
  const phones = gadgetsList.filter(gadget => gadget.type === 'phone');
  const tablets = gadgetsList.filter(gadget => gadget.type === 'tablet');
  const accessories = gadgetsList.filter(gadget => gadget.type === 'accessory');

  return (
    <div className="categories">
      <h2 className="categories__title">Shop by category</h2>
      <div className="categories__link-container">
        <Link to="/phones" className="categories__link">
          <div>
            <img
              src="./img/link-banners/link-mobile.png"
              alt="mobile phones"
              className="categories__link-banner"
            />
          </div>
          <div className="categories__link-title">Mobile phones</div>
          <div className="categories__link-quantity">
            {`${phones.length} models`}
          </div>
        </Link>
        <Link to="/tablets" className="categories__link">
          <div>
            <img
              src="./img/link-banners/link-tablets.png"
              alt="tablets"
              className="categories__link-banner"
            />
          </div>
          <div className="categories__link-title">Tablets</div>
          <div className="categories__link-quantity">
            {`${tablets.length} models`}
          </div>
        </Link>
        <Link to="/accessories" className="categories__link">
          <div>
            <img
              src="./img/link-banners/link-accesories.png"
              alt="accessories"
              className="categories__link-banner"
            />
          </div>
          <div className="categories__link-title">Accessories</div>
          <div className="categories__link-quantity">
            {`${accessories.length} models`}
          </div>
        </Link>
      </div>
    </div>
  );
};
