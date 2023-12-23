import { Link } from 'react-router-dom';
import { Phone } from '../types/Phone';
import { ProductType } from '../types/ProductType';
import './ShopByCategory.scss';

type Props = {
  products: Phone[];
};

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const getQuantityByCategory = (
    arrOfProducts: Phone[],
    type: ProductType,
  ) => arrOfProducts.filter(product => product.category === type).length;

  return (
    <div className="container">
      <div className="category__container">
        <div className="category__blocks">
          <div className="category__block">
            <Link
              to="/phones"
              className="category__link"
            >
              <div className="category__phones-img" />
              <span className="category__title">
                Mobile Phones
              </span>
              <span className="category__phones-quantity">
                {`${getQuantityByCategory(products, ProductType.Phone)} models`}
              </span>
            </Link>
          </div>

          <div className="category__block">
            <Link
              to="/tablets"
              className="category__link"
            >
              <div className="category__tablets-img" />
              <span className="category__title">
                Tablets
              </span>
              <span className="category__tablets-quantity">
                {`${getQuantityByCategory(products, ProductType.Tablet)} models`}
              </span>
            </Link>
          </div>

          <div className="category__block">
            <Link
              to="/accessories"
              className="category__link"
            >
              <div className="category__accessories-img" />
              <span className="category__title">
                Accessories
              </span>
              <span className="category__accessories-quantity">
                {`${getQuantityByCategory(products, ProductType.Accessory)} models`}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
