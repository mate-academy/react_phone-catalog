/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useFavorites } from '../../../context/FavoritesContext';
import { Product } from '../../../types/Product';
import { ProductDetails } from '../../../types/ProductDetails';
import { ProductCard } from '../../ProductCard/ProductCard';
import './ProductDetailsPage.scss';

interface Props {
  products: Product[];
  details: ProductDetails[];
}

export const ProductDetailsPage: React.FC<Props> = ({ products, details }) => {
  const { productId } = useParams();
  const { cart, addToCart, removeFromCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const product = details.find(d => d.id === productId);
  const baseProduct = products.find(p => p.itemId === productId);

  const [selectedImage, setSelectedImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const [step, setStep] = useState(288);
  const visibleCards = 4;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 639.5 && window.innerWidth < 1200) {
        setStep(253);
      } else {
        setStep(288);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setCurrentIndex(0);
    }
  }, [product]);

  const recommendedProducts = products
    .filter(p => p.category === baseProduct?.category && p.itemId !== productId)
    .slice(0, 12);

  const isInCart = cart.some(item => item.itemId === productId);
  const isInFavorites = favorites.some(item => item.id === baseProduct?.id);

  const handleCartClick = () => {
    if (baseProduct && isInCart) {
      removeFromCart(baseProduct.id);
    } else if (baseProduct) {
      addToCart(baseProduct);
    }
  };

  const handleFavoritesClick = () => {
    if (baseProduct) {
      toggleFavorite(baseProduct);
    }
  };

  const handleNext = () => {
    if (currentIndex < recommendedProducts.length - visibleCards) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled =
    currentIndex >= recommendedProducts.length - visibleCards;

  const getColorHex = (colorName: string) => {
    const normalizedName = colorName.toLowerCase().replace(/\s+/g, '');
    const colors: { [key: string]: string } = {
      gold: '#FCDBC1',
      grey: '#3B3E4A',
      spacegray: '#3B3E4A',
      black: '#0F1121',
      white: '#FFFFFF',
      midnightgreen: '#004953',
      rosegold: '#FADADD',
      graphite: '#41424C',
      sierrablue: '#9BB5CE',
      blue: '#215E7C',
    };

    return colors[normalizedName] || colorName;
  };

  if (!product || !baseProduct) {
    return (
      <div className="details container">
        <h1 className="details__title">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="details container">
      <nav className="details__top-nav" aria-label="Breadcrumb">
        <Link to="/" className="details__home-icon" aria-label="Home" />
        <span className="details__arrow">{' > '}</span>
        <Link to="/phones" className="details__model-name">
          Phones
        </Link>
        <span className="details__arrow">{' > '}</span>
        <span className="details__model-name">{product.name}</span>
      </nav>

      <Link to="/phones" className="details__back-link">
        Back
      </Link>

      <h1 className="details__title">{product.name}</h1>

      <div className="details__content">
        <div className="details__gallery">
          <div className="details__main-img">
            {selectedImage && (
              <img src={`/${selectedImage}`} alt={product.name} />
            )}
          </div>

          <div className="details__thumbnails">
            {product.images.map(img => (
              <button
                type="button"
                key={img}
                className={`details__thumb ${img === selectedImage ? 'is-active' : ''}`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={`/${img}`} alt="thumbnail" />
              </button>
            ))}
          </div>
        </div>

        <div className="details__actions-panel">
          <div className="details__section">
            <span className="details__section-label">Available colors</span>
            <div className="details__colors">
              {product.colorsAvailable.map(color => (
                <Link
                  key={color}
                  to={`/phones/${product.namespaceId}-${product.capacity.toLowerCase()}-${color}`}
                  className={`details__color ${color === product.color ? 'is-active' : ''}`}
                  style={{ backgroundColor: getColorHex(color) }}
                />
              ))}
            </div>
          </div>

          <div className="details__section">
            <span className="details__section-label">Select capacity</span>
            <div className="details__capacity">
              {product.capacityAvailable.map(cap => (
                <Link
                  key={cap}
                  to={`/phones/${product.namespaceId}-${cap.toLowerCase()}-${product.color}`}
                  className={`details__capacity-btn ${cap === product.capacity ? 'is-active' : ''}`}
                >
                  {cap}
                </Link>
              ))}
            </div>
          </div>

          <div className="details__price-block">
            <span className="details__price">{`$${product.priceDiscount}`}</span>
            <span className="details__price-old">{`$${product.priceRegular}`}</span>
          </div>

          <div className="details__actions">
            <button
              type="button"
              className={`details__cart-btn ${isInCart ? 'is-active' : ''}`}
              onClick={handleCartClick}
            >
              {isInCart ? 'Added' : 'Add to cart'}
            </button>
            <button
              type="button"
              className={`details__favorite-btn ${isInFavorites ? 'is-active' : ''}`}
              aria-label="Add to favorite"
              onClick={handleFavoritesClick}
            />
          </div>

          <div className="details__specs-short">
            {[
              { label: 'Screen', value: product.screen },
              { label: 'Resolution', value: product.resolution },
              { label: 'Processor', value: product.processor },
              { label: 'RAM', value: product.ram },
            ].map(spec => (
              <div key={spec.label} className="details__specs-item">
                <span className="details__specs-label">{spec.label}</span>
                <span className="details__specs-value">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="details__description">
        <section>
          <h2 className="details__subtitle">About</h2>
          {product.description.map(item => (
            <div key={item.title} className="details__text-block">
              <h3 className="details__section-title">{item.title}</h3>
              <p className="details__paragraph">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="details__specs-full">
          <h2 className="details__subtitle">Tech specs</h2>
          <div className="details__specs-list">
            {[
              { label: 'Screen', value: product.screen },
              { label: 'Resolution', value: product.resolution },
              { label: 'Processor', value: product.processor },
              { label: 'RAM', value: product.ram },
              { label: 'Built in memory', value: product.capacity },
              { label: 'Camera', value: product.camera },
              { label: 'Zoom', value: product.zoom },
              { label: 'Cell', value: product.cell.join(', ') },
            ].map(spec => (
              <div key={spec.label} className="details__specs-row">
                <span className="details__specs-label">{spec.label}</span>
                <span className="details__specs-value">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="details__suggested">
        <div className="details__suggested-header">
          <h2 className="details__suggested-title">You may also like</h2>
          <div className="details__suggested-arrows">
            <button
              type="button"
              className={`details__suggested-arrow details__suggested-arrow--left ${isPrevDisabled ? 'is-disabled' : ''}`}
              onClick={handlePrev}
              disabled={isPrevDisabled}
            />
            <button
              type="button"
              className={`details__suggested-arrow details__suggested-arrow--right ${isNextDisabled ? 'is-disabled' : ''}`}
              onClick={handleNext}
              disabled={isNextDisabled}
            />
          </div>
        </div>

        <div className="details__suggested-overflow">
          <div
            className="details__suggested-list"
            style={{ transform: `translateX(-${currentIndex * step}px)` }}
          >
            {recommendedProducts.map(recProduct => (
              <div key={recProduct.id} className="details__card-container">
                <ProductCard product={recProduct} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
