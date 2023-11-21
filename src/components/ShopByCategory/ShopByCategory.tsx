import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import './ShopByCategory.scss';

export const ShopByCategory = () => {
  const { products } = useContext(GlobalContext);
  const tablets = products.filter(item => item.category === 'tablets').length;
  const accessories
    = products.filter(item => item.category === 'accessories').length;

  return (
    <section className="category">
      <h2 className="title title--h2">
        Shop by category
      </h2>

      <div className="category__container" data-cy="categoryLinksContainer">
        <div className="category__wrap-link">
          <Link to="/phones" className="category__link">
            <div className="category__img category__img--phones" />

            <h3 className="category__title">
              Mobile phones
            </h3>

            <span className="category__info">
              {`${products.length || 'No'} models`}
            </span>
          </Link>
        </div>

        <div className="category__wrap-link">
          <Link to="/tablets" className="category__link">
            <div className="category__img category__img--tablets" />

            <h3 className="category__title">
              Tablets
            </h3>

            <span className="category__info">
              {`${tablets || 'No'} models`}
            </span>
          </Link>
        </div>

        <div className="category__wrap-link">
          <Link to="/accessories" className="category__link">
            <div className="category__img category__img--accessories" />

            <h3 className="category__title">
              Accessories
            </h3>

            <span className="category__info">
              {`${accessories || 'No'} models`}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
