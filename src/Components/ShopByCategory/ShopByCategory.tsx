import './ShopByCategory.scss';
import { Link } from 'react-router-dom';

function goToTop() {
  window.scrollTo(0, 0);
}

export const ShopByCategory = () => {
  return (
    <>
      <div className="shop-by-category">
        <h1 className="shop-by-category__title">Shop by category</h1>
        <div className="shop-by-category__container">
          <div className="shop-by-category__wrapper">
            <Link to="/phones" onClick={goToTop}>
              <div className="shop-by-category--wrapper--phones category">
                <div className="shop-by-category__wrapper--phones"></div>
              </div>
            </Link>
            <p className="shop-by-category__name">Mobile phones</p>
            <p className="shop-by-category__number">95 models</p>
          </div>

          <div className="shop-by-category__wrapper">
            <Link to={'/tablets'} onClick={goToTop}>
              <div className="shop-by-category--wrapper--tablets category">
                <div className="shop-by-category__wrapper--tablets"></div>
              </div>
            </Link>
            <p className="shop-by-category__name">Tablets</p>
            <p className="shop-by-category__number">24 models</p>
          </div>
          <div className="shop-by-category__wrapper">
            <Link to={'/accessories'} onClick={goToTop}>
              <div className="shop-by-category--wrapper--accessories category">
                <div className="shop-by-category__wrapper--accessories"></div>
              </div>
            </Link>
            <p className="shop-by-category__name">Accessories</p>
            <p className="shop-by-category__number">100 models</p>
          </div>
        </div>
      </div>
    </>
  );
};
