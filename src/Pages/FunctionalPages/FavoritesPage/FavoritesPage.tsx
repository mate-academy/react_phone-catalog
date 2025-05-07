/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import { useCart } from '../../../Functional/CartContext/CartContext';
import { Link } from 'react-router-dom';
import './FavoritesPage.scss';
import { useEffect, useState } from 'react';
import { Accessories, Phone, Tablet } from '../../../Interface';
import activeSvg from '../../../../public/figmaLogo/ActiveHeart.svg';
import pageNotFound from '../../../../public/img/page-not-found.png';

export const FavoritesPage = () => {
  const { favorites, toggleFavorite, cart, addToCart, removeFromCart } =
    useCart();
  const [allProducts, setAllProducts] = useState<
    (Phone | Tablet | Accessories)[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState<boolean>(true);

  function isPhoneOrTablet(
    product: Phone | Tablet | Accessories,
  ): product is Phone | Tablet {
    return 'capacity' in product;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const urls = [
        'api/phones.json',
        'api/tablets.json',
        'api/accessories.json',
      ];
      const allData: (Phone | Tablet | Accessories)[] = [];

      try {
        for (const url of urls) {
          const res = await fetch(url);

          if (!res.ok) {
            throw new Error(`Failed to fetch ${url}`);
          }

          const data = await res.json();

          allData.push(...data);
        }

        setAllProducts(allData);
        setError(null);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load favorites.';

        setError(errorMessage);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const favoriteProducts = allProducts.filter(product =>
    favorites.includes(product.id),
  );

  const handleImageError = (imageSrc: string) => {
    setImageError(prev => ({ ...prev, [imageSrc]: true }));
  };

  const handleCartToggle = (product: Phone | Tablet | Accessories) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.priceDiscount,
      image: product.images[0] ? `${product.images[0]}` : pageNotFound,
      color: product.color,
      quantity: 1,
      ...(isPhoneOrTablet(product) && {
        capacity: product.capacity,
      }),
    };

    const isInCart = cart.some(item => item.id === product.id);

    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(cartItem);
    }
  };

  if (loading) {
    return (
      <section className="favorites section">
        <h1 className="favorites__title">Your Favorites</h1>
        <p className="favorites__empty">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="favorites section">
        <h1 className="favorites__title">Your Favorites</h1>
        <p className="favorites__empty">{error}</p>
      </section>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <section className="favorites section">
        <Link to="/" className="favorites__back">
          {'< Back'}
        </Link>
        <h1 className="favorites__title">Your Favorites</h1>
        <p className="favorites__empty">Your favorites list is empty.</p>
      </section>
    );
  }

  return (
    <section className="favorites section">
      <Link to="/" className="favorites__back">
        {'< Back'}
      </Link>
      <h1 className="favorites__title">Your Favorites</h1>
      <div className="favorites__items">
        {favoriteProducts.map(product => (
          <div key={product.id} className="favorites__item">
            <Link to={`/products/${product.id}`}>
              <img
                src={
                  imageError[`${product.images[0]}`] || !product.images[0]
                    ? pageNotFound
                    : `${product.images[0]}`
                }
                alt={product.name}
                className="favorites__item-image"
                onError={() =>
                  product.images[0] && handleImageError(`${product.images[0]}`)
                }
              />
              <h3 className="favorites__item-name">{product.name}</h3>
              <p className="favorites__item-price">${product.priceDiscount}</p>

              {isPhoneOrTablet(product) && (
                <div className="brand__card-specs">
                  <div className="brand__card-spec">
                    <span className="brand__card-spec-label">Screen</span>
                    <span className="brand__card-spec-value">
                      {product.screen}
                    </span>
                  </div>
                  <div className="brand__card-spec">
                    <span className="brand__card-spec-label">Capacity</span>
                    <span className="brand__card-spec-value">
                      {product.capacity}
                    </span>
                  </div>
                  <div className="brand__card-spec">
                    <span className="brand__card-spec-label">RAM</span>
                    <span className="brand__card-spec-value">
                      {product.ram}
                    </span>
                  </div>
                </div>
              )}
            </Link>
            <div className="favorites__item-actions">
              <button
                className={`favorites__item-btn ${
                  cart.some(item => item.id === product.id) ? 'added' : ''
                }`}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCartToggle(product);
                }}
              >
                {cart.some(item => item.id === product.id)
                  ? 'Added'
                  : 'Add to cart'}
              </button>
              <button
                className="favorites__item-btn favorites__item-btn--favorite favorite--active"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(product.id);
                }}
              >
                <img
                  src={activeSvg}
                  alt="Remove from favorites"
                  className="favorites__item-btn-icon"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
