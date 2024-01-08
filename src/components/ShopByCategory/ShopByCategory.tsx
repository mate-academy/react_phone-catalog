import { Link } from 'react-router-dom';
import phones from '../../assets/category-phones.png';
import tablets from '../../assets/category-tablets.png';
import accessories from '../../assets/category-accessories.png';
import { Categories } from '../../types/Categories';
import './ShopByCategory.scss';
import { capitalize } from '../../helpers/helpers';
import { Product } from '../../types/Product';

const images = {
  phones,
  tablets,
  accessories,
};

type Props = {
  products: Product[];
};

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const modelsAmount = (type: string) => products
    .filter((product) => product.category === type).length;

  return (
    <section className="ShopByCategory" data-cy="categoryLinksContainer">
      <h1 className="ShopByCategory__title">Shop by category</h1>

      <div className="ShopByCategory__content">
        {Object.values(Categories).map((category) => (
          <Link
            to={`/${category}`}
            className="ShopByCategory__category"
            key={category}
          >
            <div>
              <img
                src={`${images[category]}`}
                alt={category}
                className="ShopByCategory__category-image"
              />
            </div>

            <p className="ShopByCategory__category-title">
              {capitalize(category)}
            </p>

            <span className="ShopByCategory__category-amount">
              {`${modelsAmount(category)} models`}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
