import { Link } from 'react-router-dom';
import './Category.scss';
import phonesImg from '../../img/Phones.png';
import tabletsImg from '../../img/Tablets.png';
import accessoriesImg from '../../img/Accessories.png';
import { Product } from '../../types/productType';

type Props = {
  phones: Product[],
  tablets: Product[],
  accessories: Product[],
};

export const Category: React.FC<Props> = ({
  phones,
  accessories,
  tablets,
}) => {
  return (
    <div className="category" data-cy="categoryLinksContainer">
      <h1 className="title">Shop by category</h1>
      <ul className="category__list">
        <li className="category__list-item">
          <Link to="/phones" className="category__list-link">
            <img
              className="category__list-img"
              src={phonesImg.toString()}
              alt="phones category"
            />
            <div className="category__list-description">
              <h3 className="category__list-title">Phones</h3>
              <p className="category__list-count">{`${phones.length} models`}</p>
            </div>

          </Link>
        </li>
        <li className="category__list-item">
          <Link to="/tablets" className="category__list-link">
            <img
              className="category__list-img"
              src={tabletsImg.toString()}
              alt="phones category"
            />
            <div className="category__list-description">
              <h3 className="category__list-title">Tablets</h3>
              <p className="category__list-count items-count">{`${tablets.length} models`}</p>
            </div>
          </Link>
        </li>
        <li className="category__list-item">
          <Link to="/accessories" className="category__list-link">
            <img
              className="category__list-img"
              src={accessoriesImg.toString()}
              alt="phones category"
            />
            <div className="category__list-description">
              <h3 className="category__list-title">Accessories</h3>
              <p className="category__list-count">{`${accessories.length} models`}</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
