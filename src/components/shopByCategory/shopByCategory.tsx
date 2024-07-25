import { Link } from 'react-router-dom';

import phones from '../../img/HomeImgs/category-phones.png';
import tablets from '../../img/HomeImgs/category-tablets.png';
import accesories from '../../img/HomeImgs/category-accessories.png';
import productsFromApi from '../../api/products.json';

export const ShopByCategory: React.FC = () => {
  return (
    <section className="shop-by-category">
      <div>
        <h2 className="shop-by-category__h2">Shop by category</h2>
      </div>
      <div className="shop-by-category__links">
        <Link className="shop-by-category__link" to="/phones">
          <div className="shop-by-category__img-container phones-container">
            <img className="shop-by-category__img" src={phones} alt="" />
          </div>
          <div className="shop-by-category__info ">
            <h4 className="shop-by-category__h4">Mobile phones</h4>
            <p className="shop-by-category__text">
              {
                productsFromApi.filter(product => product.category === 'phones')
                  .length
              }{' '}
              models
            </p>
          </div>
        </Link>
        <Link className="shop-by-category__link" to="/tablets">
          <div className="shop-by-category__img-container tablets-container">
            <img className="shop-by-category__img" src={tablets} alt="" />
          </div>
          <div className="shop-by-category__info">
            <h4 className="shop-by-category__h4">Tablets</h4>
            <p className="shop-by-category__text">Will be added soon</p>
          </div>
        </Link>
        <Link className="shop-by-category__link" to="/accessories">
          <div className="shop-by-category__img-container acc-container">
            <img className="shop-by-category__img" src={accesories} alt="" />
          </div>
          <div className="shop-by-category__info">
            <h4 className="shop-by-category__h4">Accessories</h4>
            <p className="shop-by-category__text">Will be added soon</p>
          </div>
        </Link>
      </div>
    </section>
  );
};
