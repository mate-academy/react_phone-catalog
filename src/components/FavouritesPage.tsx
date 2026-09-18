import React from 'react';
import { Link } from 'react-router-dom';
import productsData from '../../public/api/products.json';
import { useFavourites } from './FavouritesContext';
import { AddToCartButton } from './addToCart';
import { ProductDetails } from './ProductDetailsPage';
import { Footer } from './Footer/Footer';
import './FavouritesPage.scss';

export const FavouritesPage: React.FC = () => {
  const { favourites, isFavourite, toggleFavourite } = useFavourites();

  const favouriteProducts = productsData.filter(product =>
    favourites.includes(product.itemId),
  );

  return (
    <>
      <div className="favourites-page">
        <div className="favourites-page__container">
          <div className="nav-chain">
            <Link to="/" className="nav-chain__icon">
              <img src="./img/Home.svg" alt="Home" />
            </Link>
            <img
              src="./img/VectorNext.svg"
              alt=">"
              className="nav-chain__arrow"
            />
            <span className="nav-chain__text">Favourites</span>
          </div>

          <h1 className="favourites-page__title">Favourites</h1>
          <p className="favourites-page__count">
            {favouriteProducts.length} items
          </p>

          {favouriteProducts.length === 0 ? (
            <div className="favourites-page__empty">
              Your favourites list is empty
            </div>
          ) : (
            <div className="favourites-page__grid">
              {favouriteProducts.map(product => {
                const isFav = isFavourite(product.itemId);
                const hasDiscount = Boolean(
                  product.fullPrice && product.fullPrice > product.price,
                );

                const cardDetails: ProductDetails = {
                  id: product.itemId,
                  category: product.category,
                  namespaceId: '',
                  name: product.name,
                  capacityAvailable: [],
                  capacity: product.capacity,
                  priceRegular: product.fullPrice || product.price,
                  priceDiscount: product.price,
                  colorsAvailable: [],
                  color: '',
                  images: [product.image],
                  description: [],
                };

                return (
                  <Link
                    key={product.id}
                    to={`/${product.category}/${product.itemId}`}
                    className="product-card"
                  >
                    <div className="product-card__image-wrapper">
                      <img
                        src={`./${product.image}`}
                        alt={product.name}
                        className="product-card__image"
                      />
                    </div>

                    <h3 className="product-card__title">{product.name}</h3>

                    <div className="product-card__price-container">
                      <p className="product-card__price">${product.price}</p>
                      {hasDiscount && (
                        <span className="product-card__full-price">
                          ${product.fullPrice}
                        </span>
                      )}
                    </div>

                    <div className="product-card__divider" />

                    <div className="product-card__specs">
                      <div className="product-card__spec">
                        <span>Screen</span>
                        <span>{product.screen}</span>
                      </div>
                      <div className="product-card__spec">
                        <span>Capacity</span>
                        <span>{product.capacity}</span>
                      </div>
                      <div className="product-card__spec">
                        <span>RAM</span>
                        <span>{product.ram}</span>
                      </div>
                    </div>

                    <div className="product-card__actions">
                      <AddToCartButton
                        productSummary={product}
                        productDetails={cardDetails}
                        selectedImage={product.image}
                        className="product-card__add-btn"
                        onClick={e => e.preventDefault()}
                      />
                      <button
                        type="button"
                        className={`product-card__favorite-btn ${
                          isFav ? 'product-card__favorite-btn--active' : ''
                        }`}
                        aria-label="Add to favorites"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavourite(product.itemId);
                        }}
                      >
                        <img
                          src={
                            isFav
                              ? './img/FavouritesFilled.svg'
                              : './img/love.svg'
                          }
                          alt="Favorites"
                          className="product-card__love-icon"
                        />
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer className="footer" />
    </>
  );
};
