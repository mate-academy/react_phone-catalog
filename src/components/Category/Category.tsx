import { Link } from 'react-router-dom';
import './Category.scss';
import smartphones from './category-photos/phones.png';
import tablets from './category-photos/tablets.png';
import accessories from './category-photos/accessories.png';
import { Phone } from '../../types/Phone';

type Props = {
  phones: Phone[],
};

export const Category: React.FC<Props> = ({ phones }) => {
  return (
    <div className="category">
      <div className="category__content">
        <h1 className="category__title">
          Shop by category
        </h1>

        <div className="category__images">
          <div
            className="category__images--item image"
            data-cy="categoryLinksContainer"
          >
            <Link to="/phones">
              <img src={smartphones} alt="phones" className="image" />
            </Link>

            <h2 className="image__title">
              Mobile phones
            </h2>

            <p className="image__subtitle">
              {phones.length}
              {' '}
              models
            </p>
          </div>

          <div
            className="category__image"
            data-cy="categoryLinksContainer"
          >
            <Link to="/tablets">
              <img src={tablets} alt="tablets" className="image" />
            </Link>

            <h2 className="image__title">
              Tablets
            </h2>

            <p className="image__subtitle">
              0 models
            </p>
          </div>

          <div
            className="category__image"
            data-cy="categoryLinksContainer"
          >
            <Link to="/accessories">
              <img src={accessories} alt="accessories" className="image" />
            </Link>

            <h2 className="image__title">
              Accessories
            </h2>

            <p className="image__subtitle">
              0 models
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
