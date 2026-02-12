import { Link } from 'react-router-dom';
import './Category.scss';
import { getAssetUrl } from '../../../utils/functions/function';

export const Category = () => {
  return (
    <div className="category">
      <div className="category__title">Shop by category</div>
      <div className="classes">
        <div className="category__class">
          <Link to="/phones" className="category__class--image">
            <img
              src={getAssetUrl('/img/mobilephones.png')}
              alt="phones"
              className="category__class--image-img"
            />
          </Link>
          <div className="category__class--name">Mobile phones</div>
          <div className="category__class--quantity">95 models</div>
        </div>
        <div className="category__class">
          <Link to="/tablets" className="category__class--image">
            <img
              src={getAssetUrl('/img/tablets.png')}
              alt="phones"
              className="category__class--image-img"
            />
          </Link>
          <div className="category__class--name">Tablets</div>
          <div className="category__class--quantity">24 models</div>
        </div>
        <div className="category__class">
          <Link to="/accessories" className="category__class--image">
            <img
              src={getAssetUrl('/img/accessories.png')}
              alt="phones"
              className="category__class--image-img"
            />
          </Link>
          <div className="category__class--name">Accessories</div>
          <div className="category__class--quantity">100 models</div>
        </div>
      </div>
    </div>
  );
};
