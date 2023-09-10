import '../style/main.scss';
import imgPhones from '../images/categories/Phones.png';
import imgTablets from '../images/categories/Tablets.png';
import imgAccessories from '../images/categories/Accessories.png';
import { Phone } from '../Type/Phone';

type Props = {
  phones: Phone[],
};

export const Categories: React.FC<Props> = ({ phones }) => {
  return (
    <div className="container--shop">
      <h1>Shop by category</h1>

      <div className="category">
        <div className="container__category">
          <div className="category__phones">
            <img
              className="category__phones--img"
              src={imgPhones}
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
        </div>

        <div className="container__category">
          <div className="category__tablets">
            <img
              className="category__tablets--img"
              src={imgTablets}
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
        </div>

        <div className="container__category">
          <div className="category__accessories">
            <img
              className="category__accessories--img"
              src={imgAccessories}
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
        </div>

      </div>
    </div>
  );
};
