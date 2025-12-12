import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../pages/ShoppingCart/cartContextHelpers';
import { useFavourites } from './favouritesContext';
import './FavouritesCart.scss';

export const FavouritesCart = () => {
  const { favourites, removeFromFavourites, isFavourite, addToFavourites } =
    useFavourites();
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const [animatingItems, setAnimatingItems] = React.useState({});

  const handleAddToCart = product => {
    const activeColor = product.colorOptions?.[0] || 'defaultColor';
    const activeCapacity = product.capacityOptions?.[0] || 'defaultCapacity';

    addToCart({
      id: product.id,
      name: product.name,
      price: product.priceDiscount,
      image: `/${product.images?.[0] || 'no-image.jpg'}`,
      color: activeColor,
      capacity: activeCapacity,
      quantity: 1,
    });
  };

  const toggleLike = product => {
    if (isFavourite(product.id)) {
      removeFromFavourites(product.id);
    } else {
      addToFavourites(product);
    }

    setAnimatingItems(prev => ({ ...prev, [product.id]: true }));
  };

  const handleAnimationEnd = productId => {
    setAnimatingItems(prev => ({ ...prev, [productId]: false }));
  };

  return (
    <div className="shopping-container">
      <div className="shopping-page">
        <p className="products-list-title-page">
          <img
            src="./images/icons/Chevron_Arrow_Left_Disabled.svg"
            className="product-list-arrow-one"
            alt="Arrow_Left"
          />
          <button onClick={() => navigate(-1)} className="back-button">
            <p className="hover-link hover-link-text">Back</p>
          </button>
        </p>
      </div>
      <div className="shopping-favourites-title">Favourites</div>
      <div className="shopping-total-items">
        Total {favourites.length === 1 ? 'item' : 'items'}: {favourites.length}
      </div>
      <div className="product-list product-list-favourites">
        {favourites.length === 0 ? (
          <p></p>
        ) : (
          favourites.map(product => {
            const isAnimating = animatingItems[product.id];
            const liked = isFavourite(product.id);

            // Оновлена перевірка чи товар у кошику (по id, кольору і ємності)
            const added = cartItems.some(
              item =>
                item.id === product.id &&
                item.color === (product.colorOptions?.[0] || 'defaultColor') &&
                item.capacity ===
                  (product.capacityOptions?.[0] || 'defaultCapacity'),
            );

            return (
              <div key={product.id} className="wrapper">
                <Link
                  to={`/${product.category}/${product.id}`}
                  className="product_card_link"
                >
                  <div className="product_card_container">
                    <div className="product_card_foto">
                      <img
                        src={
                          product?.images?.[0]
                            ? `./${product.images[0]}`
                            : `./images/no-image.jpg`
                        }
                        alt={product?.name || 'No name'}
                      />
                    </div>
                    <div className="product_card_info">
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

                      <div className="product_card_text">
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
                          className={`product_card_button_add ${
                            added ? 'added' : ''
                          }`}
                          onClick={e => {
                            e.preventDefault();
                            if (!added) {
                              handleAddToCart(product);
                            }
                          }}
                          disabled={added}
                        >
                          {added ? 'Added to cart' : 'Add to cart'}
                        </button>

                        <button
                          className={`product_card_button_icon  ${
                            isAnimating ? 'animate' : ''
                          }`}
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleLike(product);
                          }}
                          onAnimationEnd={() => handleAnimationEnd(product.id)}
                        >
                          <img
                            className="heart-icon"
                            src={
                              liked
                                ? `./images/icons/Favourites_Filled_(Heart_Like).svg`
                                : `./images/icons/Favourites_(Heart_Like).svg`
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
          })
        )}
      </div>
    </div>
  );
};
