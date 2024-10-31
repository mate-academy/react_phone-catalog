import { useEffect, useState } from 'react';
import { Product } from '../../../types/ProductCard';
import { Link } from 'react-router-dom';
import favouritesIcon from '../../../../public/img/icons/Favourites.svg';
import strokeLeft from '../../../../public/img/icons/StrokeLeft.svg';
import strokeRight from '../../../../public/img/icons/StrokeRight.svg';
import { ProductDescription } from '../../../types/Accessories';

interface ProductsSliderProps {
  goods: ProductDescription[];
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({ goods }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const productsPerPage = 4;
  const totalProducts = goods.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const nextPage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + totalPages) % totalPages);
  };

  const startIndex = currentIndex * productsPerPage;
  const currentProducts = goods.slice(startIndex, startIndex + productsPerPage);

  return (
    <section className="section section--brand-new">
      <div>
        <h2 className="section__title">Brand new models</h2>
        <div className="slider-controls">
          <button onClick={prevPage}>
            <img src={strokeLeft} alt="Previous" />
          </button>
          <button onClick={nextPage}>
            <img src={strokeRight} alt="Next" />
          </button>
        </div>
      </div>
      <div className="product-slider__track product-grid">
        {currentProducts.map(good => (
          <div key={good.id} className="suggested-product product-card">
            <Link
              to={`/product/${good.category}/${good.itemId}`}
              className="suggested-product__link"
            >
              <img
                src={`/${good.image}`}
                alt={good.name}
                className="product-card__image"
              />
            </Link>

            <Link
              to={`/product/${good.category}/${good.itemId}`}
              className="suggested-product__link"
            >
              <h3 className="suggested-product__name">{good.name}</h3>
            </Link>
            <div className="suggested-product__price product-price">
              <span className="suggested-product__price product-price__current">
                {good.price}$
              </span>
              <span className="suggested-product__price product-price__old">
                {good.priceRegular}$
              </span>
            </div>

            <div className="product-card__specs">
              <div className="product-card__details">
                <span className="product-card__property">Screen:</span>
                <span className="product-card__value">{good.screen}</span>
              </div>
              <div className="product-card__details">
                <span className="product-card__property">Capacity</span>
                <span className="product-card__value">{good.capacity}</span>
              </div>
              <div className="product-card__details">
                <span className="product-card__property">RAM</span>
                <span className="product-card__value">{good.ram}</span>
              </div>
            </div>
            <div className="product-card__actions">
              <button className="product-card__button">Add to cart</button>
              <a href="#">
                <img
                  src={favouritesIcon}
                  alt="Favourites"
                  className="product-card__icon"
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
