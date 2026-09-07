import { useProducts } from '../../contexts/Products';
import { Link } from 'react-router-dom';
import { Carusel } from '../carusel';
import './MainPage.scss';
import { ProductsSlider } from '../ProductCardSwipper';

export const MainPage = () => {
  const { products, phones, tablets, accessories } = useProducts();

  return (
    <div className="main-page">
      <div className="page-top">
        <h1 className="main-page__hello">Welcome to Nice Gadgets store!</h1>

        <Carusel />
      </div>

      <div className="new-models swipe">
        <ProductsSlider
          products={phones.items.slice(0, 20)}
          blockName={'Brand new models'}
        />
      </div>

      <div className="categories">
        <h3 className="categories__name">Shop by category</h3>
        <div className="category__content">
          <div className="category">
            <div className="category__img category__img--1">
              <Link to="/phones" className="category__link">
                <img
                  src="./img/phones-baner.png"
                  alt="category-phones"
                  className="category__img__link"
                />
              </Link>
            </div>
            <div className="category__description">
              <Link to="/phones" className="category__link">
                <h3 className="category__description__name">Mobile phones</h3>
              </Link>
              <p className="category__description__info">{phones.items.length} items</p>
            </div>
          </div>

          <div className="category">
            <div className="category__img category__img--2">
              <Link to="/tablets" className="category__link">
                <img
                  src="./img/tablets-baner.png"
                  alt="category-tablets"
                  className="category__img__link"
                />
              </Link>
            </div>
            <div className="category__description">
              <Link to="/tablets" className="category__link">
                <h3 className="category__description__name">Tablets</h3>
              </Link>
              <p className="category__description__info">{tablets.items.length} items</p>
            </div>
          </div>

          <div className="category">
            <div className="category__img category__img--3">
              <Link to="/accessories" className="category__link">
                <img
                  src="./img/accessories-baner.png"
                  alt="category-accessories"
                  className="category__img__link"
                />
              </Link>
            </div>
            <div className="category__description">
              <Link to="/accessories" className="category__link">
                <h3 className="category__description__name">Accessories</h3>
              </Link>
              <p className="category__description__info">{accessories.items.length} items</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hot-prices swipe">
        <ProductsSlider
          products={phones.items.filter(product => product.priceRegular - product.priceDiscount > 80)}
          blockName={'Hot prices'}
          showDiscount={true}
        />
      </div>

      {/* <Catalog products={phones.items} pageName={'Mobile phones'}/> */}

      {/* <div className="footer">
        <Footer />
      </div> */}
    </div>
  );
};
