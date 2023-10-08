import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import imgPhones from '../../Images/Img/img-phones.png';
import imgTablets from '../../Images/Img/img-tablets.png';
import imgAccessories from '../../Images/Img/img-accessories.png';

type Props = {
  products: Product[],
};

export const Category: React.FC<Props> = ({ products }) => {
  const quantityPhones = products.filter(
    product => product.category === 'phones',
  ).length;

  const quantityTablets = products.filter(
    product => product.category === 'tablets',
  ).length;

  const quantityAccessories = products.filter(
    product => product.category === 'accessories',
  ).length;

  return (
    <div className="category">
      <h1 className="category__title">
        Shop by category
      </h1>
      <div
        className="category__link-container"
        data-cy="categoryLinksContainer"
      >
        <Link className="category__link category__phones" to="/phones">
          <div className="category__img-box category__img-box--phones">
            <img
              src={imgPhones}
              alt="category phone"
              className="category__img category__img-phones"
            />
          </div>
          <div className="category__info">
            <h3 className="category__title-small">
              Mobile phones
            </h3>
            <p className="category__quantity">
              {`${quantityPhones} models`}
            </p>
          </div>
        </Link>
        <Link className="category__link category__tablets" to="/tablets">
          <div className="category__img-box category__img-box--tablets">
            <img
              src={imgTablets}
              alt="category tablets"
              className="category__img category__img-tablets"
            />
          </div>
          <div className="category__info">
            <h3 className="category__title-small">
              Tablets
            </h3>
            <p className="category__quantity">
              {`${quantityTablets} models`}
            </p>
          </div>
        </Link>
        <Link
          className="category__link category__accessories"
          to="/accessories"
        >
          <div className="category__img-box category__img-box--tablets">
            <img
              src={imgAccessories}
              alt="category accessories"
              className="category__img category__img-accessories"
            />
          </div>
          <div className="category__info">
            <h3 className="category__title-small">
              Accessories
            </h3>
            <p className="category__quantity">
              {`${quantityAccessories} models`}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
