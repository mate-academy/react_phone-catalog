import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import './Category.scss';

type Props = {
  products: Product[];
};

export const ShopCategory: React.FC<Props> = ({ products }) => {
  return (
    <div className="category__main-container">
      <div className="category-container">
        <div className="category__little-container">
          <Link to="/phones">
            <div className="category-img category-img-1" />
          </Link>
          <div>
            <h1 className="category__title">Mobile phones</h1>
            <h2 className="category__subtitle">{`${products?.length} models`}</h2>
          </div>
        </div>
        <div className="category__little-container">
          <Link to="/tablets">
            <div className="category-img category-img-2" />
          </Link>
          <div>
            <h1 className="category__title">Tablets</h1>
            <h2 className="category__subtitle">24 models</h2>
          </div>
        </div>
        <div className="category__little-container">
          <Link to="/accessories">
            <div className="category-img category-img-3" />
          </Link>
          <div>
            <h1 className="category__title">Accessories</h1>
            <h2 className="category__subtitle">100 models</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
