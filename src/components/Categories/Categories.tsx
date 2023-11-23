import { Link } from 'react-router-dom';
import './Categories.scss';
import Phone_photo from './img/phones_image.png';
import Tablets_photo from './img/tablets_image.png';
import Accessories_photo from './img/accessories_image.png';
import {
  getPhonesQuantity,
  getTabletsQuantity,
  getAccessoriesQuantity,
} from '../../helpers/getCategoriesQuantity';
import { Product } from '../../Types/Product';

type Props = {
  title: string,
  products: Product[],
};

const Categories:React.FC<Props> = ({ title, products }) => {
  const phonesQuant = getPhonesQuantity(products);
  const tabletsQuant = getTabletsQuantity(products);
  const accessoriesQuant = getAccessoriesQuantity(products);

  return (
    <section
      className="categories main__section"
    >
      <h1 className="categories__title">
        {title}
      </h1>
      <div className="categories__container" data-cy="categoryLinksContainer">
        <div className="categories__card">
          <Link
            to="phones"
            className="categories__img categories__img-phones"
          >
            <img
              src={Phone_photo}
              alt=""
              className="categories__img-position"
            />
          </Link>
          <Link
            to="phones"
            className="categoties__subtitle"
          >
            <h3 className="categories__name">
              Mobile phones
            </h3>
            <span className="categories__count">
              {`${phonesQuant} models`}
            </span>
          </Link>
        </div>

        <div className="categories__card">
          <Link
            to="tablets"
            className="categories__img categories__img-tablets"
          >
            <img
              src={Tablets_photo}
              alt=""
              className="categories__img-position"
            />
          </Link>
          <Link
            to="tablets"
            className="categoties__subtitle"
          >
            <h3 className="categories__name">
              Tablets
            </h3>
            <span className="categories__count">
              {` ${tabletsQuant} models`}
            </span>
          </Link>
        </div>

        <div className="categories__card">
          <Link
            to="accesories"
            className=" categories__img-accessories categories__img"
          >
            <img
              src={Accessories_photo}
              alt=""
              className="categories__img-position"
            />
          </Link>
          <Link
            to="accessories"
            className="categoties__subtitle"
          >
            <h3 className="categories__name">
              Accessories
            </h3>
            <span className="categories__count">
              {` ${accessoriesQuant} models`}
            </span>
          </Link>
        </div>
      </div>

    </section>
  );
};

export default Categories;
