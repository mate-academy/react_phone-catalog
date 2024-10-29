import { Link } from "react-router-dom";
import { useRef } from "react";
import strokeLeft from '../../../public/img/icons/StrokeLeft.svg';
import strokeRight from '../../../public/img/icons/StrokeRight.svg';
import favouritesIcon from '../../../public/img/icons/Favourites.svg';

import { ProductDescription } from "../../types/Accessories"


interface SuggestedProductsProps {
  products: ProductDescription[];
}

export const SuggestedProducts: React.FC<SuggestedProductsProps> = ({ products }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    console.log('Scroll left', scrollLeft)
    scrollContainerRef.current?.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    console.log('Scroll Right')
    scrollContainerRef.current?.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };



  return (
    <section className='section section--hot-prices'>
        <div className='section__header'>
          <h1 className='section__title'>You may also like</h1>
          <a href="#" onClick={(event) => { event.preventDefault(); scrollLeft()}}><img src={strokeLeft} alt="Previous" ></img></a>
          <a href="#" onClick={(event) => { event.preventDefault(); scrollRight()}}><img src={strokeRight} alt="Next"></img></a>
        </div>

        <section className="suggested-products ">
          <div ref={scrollContainerRef} className="suggested-products__list product-grid">
             {products.map(product => (
              <div key={product.id} className="suggested-product product-card">
                <Link to={`/product/${product.namespaceId}-${product.capacity}-${product.color}`} className="suggested-product__link">
                  <img
                    src={`../${product.images[0]}`}
                    alt={product.name}
                    className="product-card__image"
                  />
                </Link>

                <Link to={`/product/${product.namespaceId}-${product.capacity}-${product.color}`}
                  className="suggested-product__link">
                  <h3 className="suggested-product__name">{product.name}</h3>
                </Link>
                <div className='suggested-product__price product-price'>
                  <span className="suggested-product__price product-price__current">{product.priceDiscount}$</span>
                  <span className="suggested-product__price product-price__old">{product.priceRegular}$</span>
                </div>

                <div className="product-card__specs">
                  <div className="product-card__details">
                    <span className="product-card__property">Screen:</span>
                    <span className="product-card__value">{product.screen}</span>
                  </div>
                  <div className="product-card__details">
                    <span className="product-card__property">Capacity</span>
                    <span className="product-card__value">{product.capacity}</span>
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


  )
}
