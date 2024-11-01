import { useEffect, useState } from 'react';
import { Product } from '../../types/ProductCard';
import { Link } from 'react-router-dom';
import favouritesIcon from '../../../public/img/icons/Favourites.svg';
import strokeLeft from '../../../public/img/icons/StrokeLeft.svg';
import strokeRight from '../../../public/img/icons/StrokeRight.svg';
import { ProductDescription } from '../../types/Accessories';

interface ProductsSliderProps {
  goods: ProductDescription[];
  title: string;
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({ goods, title }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const productsPerPage = 4;
  const totalProducts = goods.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const nextPage = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(prevIndex => (prevIndex + 1) % totalPages);
    }
  };

  const prevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => (prevIndex - 1 + totalPages) % totalPages);
    }
  };

  const startIndex = currentIndex * productsPerPage;
  const currentProducts = goods.slice(startIndex, startIndex + productsPerPage);

  return (
      <section className="section section--section ">
        <div className='section__header'>
          <h2 className="section__title">{title}</h2>
          <div className="slider">
            <button onClick={prevPage}
              className='slider__button button--prev'>
              <img src={strokeLeft} alt="Previous" className='slider__icon--prev'/>
            </button>
            <button onClick={nextPage}
              className='slider__button'>
              <img src={strokeRight} alt="Next" className='slider__icon--next'/>
            </button>
          </div>
        </div>

        <section className='products'>
          <div className="products__list product-grid">
            {currentProducts.map(product => (
              <div key={product.id} className="product-card">
                <Link
                  to={`/product/${product?.category}/${product?.namespaceId}-${product?.capacity.toLowerCase()}-${product?.color}`}
                  className="product-card__link"
                >
                  <img
                    src={`/${product.images[0]}`}
                    alt={product.name}
                    className="product-card__image"
                  />
                </Link>

                <Link
                  to={`/product/${product.category}/${product.namespaceId}-${product.capacity.toLowerCase()}-${product.color}`}
                  className="product-card__link"
                >
                  <h3 className="product-card__title">{product.name}</h3>
                </Link>
                <div className="product-card__price product-price">
                  <span className="product-card__price product-price__current">
                    {product.priceDiscount}$
                  </span>
                  <span className="product-card__price product-price__old">
                    {product.priceRegular}$
                  </span>
                </div>

                <div className="product-card__specs">
                  <div className="product-card__details">
                    <span className="product-card__property">Screen:</span>
                    <span className="product-card__value">{product.screen}</span>
                  </div>
                  <div className="product-card__details">
                    <span className="product-card__property">Capacity</span>
                    <span className="product-card__value">
                      {product.capacity}
                    </span>
                  </div>
                  <div className="product-card__details">
                    <span className="product-card__property">RAM</span>
                    <span className="product-card__value">{product.ram}</span>
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
      </section>
  );
};
