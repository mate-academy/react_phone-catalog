import { Link } from 'react-router-dom';
import { Product } from '../../type/Product';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import './ShopByCategory.scss';

type Props = {
  products: Product[];
};

export const ShopByCategory: React.FC<Props> = () => {
  const {
    phonesCount,
    tabletsCount,
    accessoriesCount,
  } = useContext(AppContext);

  return (
    <div className="category" data-cy="categoryLinksContainer">
      <h2 className="category__title">Shop By Category</h2>

      <div className="category__container">
        <Link to="/phones" className="category__link">
          <div className="category__phones category__phones--image" />

          <div className="category__description">
            <h3 className="category__name">Mobile phones</h3>
            <div className="category__amount">
              {phonesCount}
            </div>
          </div>
        </Link>

        <Link to="/tablets" className="category__link">
          <div className="category__tablets category__phones--image" />

          <div>
            <h3 className="category__name">Tablets</h3>
            <span className="category__amount">{tabletsCount}</span>
          </div>
        </Link>

        <Link to="/accessories" className="category__link">
          <div className="category__accessories category__phones--image" />

          <div>
            <h3 className="category__name">Accessories</h3>
            <span className="category__amount">{accessoriesCount}</span>
          </div>
        </Link>
      </div>

    </div>
  );
};
