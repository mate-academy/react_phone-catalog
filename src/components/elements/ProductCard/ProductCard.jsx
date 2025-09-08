import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../pages/ShoppingCart/cartContextHelpers';
import { useFavourites } from '../../pages/FavouritesCart/favouritesContextHelpers';
import './ProductCard.scss';

export const ProductCard = ({ product }) => {
  const [animating, setAnimating] = useState(false);
  const { addToCart, cartItems } = useCart();
  const activeColor =
    product.colorOptions?.[0] || product.color || 'defaultColor';
  const activeCapacity =
    product.capacityOptions?.[0] || product.capacity || 'defaultCapacity';

  // Логіка перевірки, чи доданий товар:
  const added = cartItems.some(
    item =>
      item.id === product.id &&
      item.color === activeColor &&
      item.capacity === activeCapacity,
  );

  const { addToFavourites, removeFromFavourites, isFavourite } =
    useFavourites();

  const liked = isFavourite(product.id);

  const toggleLike = () => {
    if (liked) {
      removeFromFavourites(product.id);
    } else {
      addToFavourites(product);
    }

    setAnimating(true);
  };

  const handleAnimationEnd = () => {
    setAnimating(false);
  };

  const handleAddToCart = e => {
    e.preventDefault();

    if (added) {
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.priceDiscount,
      image: `/${product.images?.[0] || 'no-image.jpg'}`,
      color: activeColor,
      capacity: activeCapacity,
      quantity: 1,
      category: product.category,
    });
  };

  return (
    <div className="wrapper">
      <Link
        to={`/${product.category}/${product.id}`}
        className="product_card_link"
      >
        <div className="product_card_container">
          <div className="product_card_foto">
            <img
              src={
                product?.images?.[0]
                  ? `/${product.images[0]}`
                  : `/images/no-image.jpg`
              }
              alt={product?.name || 'No name'}
            />
          </div>
          <div>
            <div className="product_card_price_box">
              <p className="product_card_name">{product.name}</p>
              <p className="product_card_price">
                ${product.priceDiscount}
                {product.priceRegular && (
                  <span className="product_card_old_price">
                    ${product.priceRegular}
                  </span>
                )}
              </p>
            </div>

            <div>
              <div className="product_card_info_text">
                <span className="spec-label">Screen</span>
                <span className="spec-value">{product.screen}</span>
              </div>
              <div className="product_card_info_text">
                <span className="spec-label">Capacity</span>
                <span className="spec-value">{product.capacity}</span>
              </div>
              <div className="product_card_info_text">
                <span className="spec-label">RAM</span>
                <span className="spec-value">{product.ram}</span>
              </div>
            </div>

            <div className="product_card_button">
              <button
                className={`product_card_button_add ${added ? 'added' : ''}`}
                onClick={handleAddToCart}
                disabled={added}
              >
                {added ? 'Added to cart' : 'Add to cart'}
              </button>

              <button
                className={`product_card_button_icon ${animating ? 'animate' : ''}`}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleLike();
                }}
                onAnimationEnd={handleAnimationEnd}
              >
                <img
                  className="heart-icon"
                  src={
                    liked
                      ? `/images/icons/Favourites_Filled_(Heart_Like).svg`
                      : `/images/icons/Favourites_(Heart_Like).svg`
                  }
                  alt="Favorite"
                />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
