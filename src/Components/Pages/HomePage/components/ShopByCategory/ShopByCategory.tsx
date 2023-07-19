import { Link } from 'react-router-dom';
import producs from '../../../../../new/products.json';
import FirstImage from './ShopByCategoryImage/1.png';
import TwoImage from './ShopByCategoryImage/2.png';
import ThridImage from './ShopByCategoryImage/3.png';
import './ShopByCategory.scss';

const lastProductId = producs[producs.length - 1].id;
const titleForComponent = 'Shop by category';

export const ShopByCategory = () => {
  return (
    <div className="shopByCategory">
      <h1 className="shopByCategory__title">{titleForComponent}</h1>

      <div className="main-container">

        <div className="shopByCategory__container">
          <Link to="/">
            <div className="shopByCategory__container-image-1">
              <img
                src={FirstImage}
                className="Images-for-shopByCategory-1"
                alt="Images-for-shopByCategory"
              />
            </div>
          </Link>

          <h3 className="shopByCategory-text">Mobile phones</h3>
          <p className="quantity-models">{`${lastProductId} models`}</p>
        </div>

        <div className="shopByCategory__container">
          <Link to="/">
            <div className="shopByCategory__container-image-2">
              <img
                src={TwoImage}
                className="Images-for-shopByCategory-2"
                alt="Images-for-shopByCategory"
              />
            </div>
          </Link>

          <h3 className="shopByCategory-text">Tablets</h3>
          <p className="quantity-models">0 models</p>

        </div>

        <div className="shopByCategory__container">
          <Link to="/">
            <div className="shopByCategory__container-image-3">
              <img
                src={ThridImage}
                className="Images-for-shopByCategory-3"
                alt="Images-for-shopByCategory"
              />
            </div>
          </Link>

          <h3 className="shopByCategory-text">Accessories</h3>
          <p className="quantity-models">0 models</p>
        </div>
      </div>
    </div>

  );
};
