import './Category.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import phonesImg from '../../images/img/category-phones.png';
import tabletsImg from '../../images/img/category-tablets.png';
import accessoriesImg from '../../images/img/category-accessories.png';

type Props = {
  products: Product[]
};

export const Category: React.FC<Props> = ({ products }) => {
  const amountPhones = products
    .filter(product => product.category === 'phones').length;

  const amountTablets = products
    .filter(product => product.category === 'tablets').length;

  const amountAccessories = products
    .filter(product => product.category === 'accessories').length;

  return (
    <div className="category">
      <h1 className="category__title">
        Shop by category
      </h1>

      <div
        className="category__link-container"
        data-cy="categoryLinksContainer"
      >
        <Link
          className="category__link category__phones"
          to="/phones"
        >
          <div className="category__img-box category__img-box--phones">
            <img
              src={phonesImg}
              alt="category phone"
              className="category__img category__img-phones"
            />
          </div>
          <h3 className="category__subtitle">
            Mobile phones
          </h3>
          <p className="category__amount">
            {`${amountPhones} models`}
          </p>
        </Link>

        <Link
          className="category__link category__tablets"
          to="/tablets"
        >
          <div className="category__img-box category__img-box--tablets">
            <img
              src={tabletsImg}
              alt="category phone"
              className="category__img category__img-tablets"
            />
          </div>
          <h3 className="category__subtitle">
            Tablets
          </h3>
          <p className="category__amount">
            {`${amountTablets} models`}
          </p>
        </Link>

        <Link
          className="category__link category__accessories"
          to="/accessories"
        >
          <div className="category__img-box category__img-box--accessories">
            <img
              src={accessoriesImg}
              alt="category phone"
              className="category__img category__img-accessories"
            />
          </div>
          <h3 className="category__subtitle">
            Accessories
          </h3>
          <p className="category__amount">
            {`${amountAccessories} models`}
          </p>
        </Link>
      </div>
    </div>
  );
};
