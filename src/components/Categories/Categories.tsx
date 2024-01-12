import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Categories.scss';
import { ICONS } from '../../icons';
import { GlobalContext } from '../Context/GlobalContext';

export const Categories = () => {
  const { products } = useContext(GlobalContext);
  const phones = products.filter(product => product.category === 'phones');
  const tablets = products.filter(product => product.category === 'tablet');
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  return (
    <section className="categories">
      <div className="categories__container">
        <h1 className="categories__title">Shop by category</h1>
        <div className="categories__phones">
          <Link to="/phones">
            <img
              src={ICONS.categoryPhones}
              alt="Category phones"
              className="categories__phones-image"
            />

            <div className="categories__phones-title">Mobile phones</div>

            <div className="categories__phones-description">
              {`${phones.length} models`}
            </div>
          </Link>
        </div>

        <div className="categories__tablets">
          <Link to="/tablets">
            <img
              src={ICONS.categoryTablets}
              alt="Category tablets"
              className="categories__tablets-image"
            />

            <div className="categories__tablets-title">Tablets</div>

            <div className="categories__tablets-description">
              {`${tablets.length} models`}
            </div>
          </Link>
        </div>

        <div className="categories__accessories">
          <Link to="/accessories">
            <img
              src={ICONS.categoryAccessories}
              alt="Category accessories"
              className="categories__accessories-image"
            />

            <div className="categories__accessories-title">Accessories</div>

            <div className="categories__accessories-description">
              {`${accessories.length} models`}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
