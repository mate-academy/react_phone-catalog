import { Link } from 'react-router-dom';

import '../../style/main.scss';
import './category.scss';

import Phones from '../../images/categories/Phones.png';
import Tablets from '../../images/categories/Tablets.png';
import Accessories from '../../images/categories/Accessories.png';
import { Phone } from '../../Type/Phone';

type Props = {
  phones: Phone[],
};

export const Category: React.FC<Props> = ({ phones }) => {
  return (
    <section className="category__section">
      <h1 className="category__name">Shop by category</h1>

      <div className="category">
        <Link
          to="/Phones"
          className="container__category"
        >
          <div className="category__phones">
            <img
              className="category__phones--img"
              src={Phones}
              alt="Mobile phones"
            />
          </div>
          <div className="category__description">
            <h3 className="category__title">
              Mobile phones
            </h3>
            <p className="category__presence">
              {`${phones.length} models`}
            </p>
          </div>
        </Link>

        <Link
          to="/Tablets"
          className="container__category"
        >
          <div className="category__tablets">
            <img
              className="category__tablets--img"
              src={Tablets}
              alt="Tablets"
            />
          </div>
          <div className="category__description">
            <h3 className="category__title">
              Tablets
            </h3>
            <p className="category__presence">
              {`${0} models`}
            </p>
          </div>
        </Link>

        <Link
          to="/Accessories"
          className="container__category"
        >
          <div className="category__accessories">
            <img
              className="category__accessories--img"
              src={Accessories}
              alt="Accessories"
            />
          </div>
          <div className="category__description">
            <h3 className="category__title">
              Accessories
            </h3>
            <p className="category__presence">
              {`${0} models`}
            </p>
          </div>
        </Link>

      </div>
    </section>
  );
};
