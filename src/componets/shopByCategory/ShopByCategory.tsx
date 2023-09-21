import { Link } from 'react-router-dom';
import './ShopByCategory.scss';
import phones from '../../img/Phones.jpg';
import tablets from '../../img/tablets.jpg';
import accessories from '../../img/accessories.jpg';
import { useAppSelector } from '../../app/hooks';

export const ShopByCategory = () => {
  const products = useAppSelector((state) => state.products.list);

  return (
    <div className="shopByCategory">
      <h1 className="shopByCategory__title">Shop by category</h1>
      <div className="shopByCategory__container">
        <div className="shopByCategory__block">
          <Link to="/phones">
            <img src={phones} alt="phones" className="shopByCategory__image" />
          </Link>
          <Link to="/phones" className="shopByCategory__link">
            <h3 className="shopByCategory__block-heading">Mobile phones</h3>
          </Link>
          <span className="shopByCategory__block-description">
            {`${products.length} models`}
          </span>
        </div>
        <div className="shopByCategory__block">
          <Link to="/tablets">
            <img
              src={tablets}
              alt="tablets"
              className="shopByCategory__image"
            />
          </Link>
          <Link to="/tablets" className="shopByCategory__link">
            <h3 className="shopByCategory__block-heading">Tablets</h3>
          </Link>
          <span className="shopByCategory__block-description">0 models</span>
        </div>
        <div className="shopByCategory__block shopByCategory__block--last">
          <Link to="/accessories">
            <img
              src={accessories}
              alt="accessories"
              className="shopByCategory__image"
            />
          </Link>
          <Link to="/accessories" className="shopByCategory__link">
            <h3 className="shopByCategory__block-heading">Accessories</h3>
          </Link>
          <span className="shopByCategory__block-description">0 models</span>
        </div>
      </div>
    </div>
  );
};
