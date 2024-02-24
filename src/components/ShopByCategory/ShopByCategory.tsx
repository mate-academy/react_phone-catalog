import './ShopByCategory.scss';
import { Link } from 'react-router-dom';
import phones from '../../images/Phones.png';
import tablets from '../../images/Tablets.png';
import accessories from '../../images/Accessories.png';

export const ShopByCategory: React.FC = () => {
  return (
    <div className="shopByCategory">
      <h1 className="shopByCategory__title">Shop by category</h1>
      <div className="shopByCategory__categories">
        <div className="shopByCategory__card">
          <Link
            to="/phones"
            className="shopByCategory__photo"
          >
            <img
              src={phones}
              alt="phones"
              className="shopByCategory__image"
            />
          </Link>
          <div>
            <p className="shopByCategory__subTitle">Mobile phones</p>
            <p className="shopByCategory__models">95 models</p>
          </div>
        </div>
        <div className="shopByCategory__card">
          <Link
            to="/tablets"
            className="shopByCategory__photo"
          >
            <img
              src={tablets}
              alt="tablets"
              className="shopByCategory__image"
            />
          </Link>
          <div>
            <p className="shopByCategory__subTitle">Tablets</p>
            <p className="shopByCategory__models">0 models</p>
          </div>
        </div>
        <div className="shopByCategory__card">
          <Link
            to="/accessories"
            className="shopByCategory__photo"
          >
            <img
              src={accessories}
              alt="accessories"
              className="shopByCategory__image"
            />
          </Link>
          <div>
            <p className="shopByCategory__subTitle">Accessories</p>
            <p className="shopByCategory__models">0 models</p>
          </div>
        </div>
      </div>
    </div>
  );
};
