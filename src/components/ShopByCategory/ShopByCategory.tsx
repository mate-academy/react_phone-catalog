import './shopByCategory.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../type/product';

import Phones from './images/category-phones.png';
import Tablets from './images/category-tablets.png';
import Accessories from './images/category-accessories.png';

type Props = {
  products: Product[];
};

enum Categories {
  Phone = 'phone',
  Tablet = 'tablet',
  Accesorie = 'accessories',
}

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const getProductsNumber = (category: Categories) => {
    return products.filter((item: Product) => item.type === category).length;
  };

  return (
    <article className="shop-by-category">
      <h2 className="shop-by-category__title">
        Shop by category
      </h2>

      <div
        data-cy="categoryLinksContainer"
        className="shop-by-category__categories"
      >

        <div className="shop-by-category__card">
          <Link
            to="phones"
            className="shop-by-category__img-wrapper
            shop-by-category__img-wrapper--phones"
          >
            <img
              src={Phones}
              alt="mobile phones"
            />
          </Link>

          <Link
            to="phone"
            className="shop-by-category__name"
          >
            Mobile phones
          </Link>

          <p className="shop-by-category__models-number">
            {`${getProductsNumber(Categories.Phone)} models`}
          </p>
        </div>

        <div className="shop-by-category__card">
          <Link
            to="/tablets"
            className="shop-by-category__img-wrapper
            shop-by-category__img-wrapper--tablets"
          >
            <img
              src={Tablets}
              alt="tablets"
            />
          </Link>

          <Link to="/tablets" className="shop-by-category__name">
            Tablets
          </Link>

          <p className="shop-by-category__models-number">
            {`${getProductsNumber(Categories.Tablet)} models`}
          </p>
        </div>

        <div className="shop-by-category__card">
          <Link
            to="accessories"
            className="shop-by-category__img-wrapper
            shop-by-category__img-wrapper--accessories"
          >
            <img
              src={Accessories}
              alt="accessories"
            />
          </Link>

          <Link
            to="accessories"
            className="shop-by-category__name"
          >
            Accessories
          </Link>

          <p className="shop-by-category__models-number">
            {`${getProductsNumber(Categories.Accesorie)} models`}
          </p>
        </div>
      </div>
    </article>
  );
};
