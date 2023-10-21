import { Link } from 'react-router-dom';
import { getProductsQuantity } from '../../helpers/functions';
import { Product } from '../../types/Product';
import { categories } from '../../variables/variables';
import { Spinner } from '../Spinner';
import './Category.scss';

type PropTypes = {
  isLoading: boolean;
  products: Product[];
};

export const Category: React.FC<PropTypes> = ({ isLoading, products }) => {
  if (isLoading) {
    return (
      <section className="page__section category">
        <Spinner />
      </section>
    );
  }

  return (
    <section className="page__section category">
      <div className="container">
        <h1 className="category__title">
          Shop by category
        </h1>
        <div className="category__container">
          {categories.map(category => {
            const {
              imageUrl,
              name,
              type,
              imageBackground,
              id,
            } = category;
            const quantity = getProductsQuantity(type, products);

            return (
              <div
                className="category__box"
                key={id}
                data-cy="categoryLinksContainer"
              >
                <div className="category__image-box">
                  <Link
                    className="category__element"
                    to={type}
                    data-cy="categoryLinksContainer"
                  >
                    <img
                      src={imageUrl}
                      alt="category"
                      className="category__img"
                      style={{ backgroundColor: imageBackground }}
                    />
                  </Link>
                </div>
                <Link to={type} className="category__link">
                  <h3 className="categoty__name">{name}</h3>
                </Link>
                <Link to={type} className="category__link-quantity">
                  <p className="category__quantity">{`${quantity} models`}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
