import './shopByCategory.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../type/product';

type Props = {
  products: Product[];
};

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const getProductsNumber = (type: 'phone' | 'tablet' | 'accessories') => {
    return products.filter((item: Product) => item.type === type).length;
  };

  return (
    <article className="shop-by-category">
      <h2 className="shop-by-category__title">
        Brand new models
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
              src="_new/img/category-phones.png"
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
            {`${getProductsNumber('phone')} models`}
          </p>
        </div>

        <div className="shop-by-category__card">
          <Link
            to="/tablets"
            className="shop-by-category__img-wrapper
            shop-by-category__img-wrapper--tablets"
          >
            <img
              src="_new/img/category-tablets.png"
              alt="tablets"
            />
          </Link>

          <Link to="/tablets" className="shop-by-category__name">
            Tablets
          </Link>

          <p className="shop-by-category__models-number">
            {`${getProductsNumber('tablet')} models`}
          </p>
        </div>

        <div className="shop-by-category__card">
          <Link
            to="accessories"
            className="shop-by-category__img-wrapper
            shop-by-category__img-wrapper--accessories"
          >
            <img
              src="_new/img/category-accessories.png"
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
            {`${getProductsNumber('accessories')} models`}
          </p>
        </div>
      </div>
    </article>
  );
};
