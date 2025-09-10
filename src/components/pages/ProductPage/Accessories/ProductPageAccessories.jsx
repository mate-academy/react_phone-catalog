// src/components/pages/ProductPage/Accessories.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import { useFavourites } from '../../FavouritesCart/favouritesContextHelpers';
import { useCart } from '../../ShoppingCart/cartContextHelpers';
import DownPage from '../DownPage';
import accessories from '../../../../data/accessories.json';
import '../styles/ProductPage.scss';

export default function ProductPage() {
  const { addToCart, cartItems } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const product = accessories.find(p => p.id === id);

  const [randomProducts] = useState(() => {
    return [...accessories].sort(() => 0.5 - Math.random());
  });

  const { addToFavourites, removeFromFavourites, isFavourite } =
    useFavourites();

  const [activePhoto, setActivePhoto] = useState(product?.images?.[0] || '');
  const [animating, setAnimating] = useState(false);
  const [activeColor, setActiveColor] = useState(product?.color);
  const [activeCapacity, setActiveCapacity] = useState(product?.capacity);

  useEffect(() => {
    if (product) {
      setActiveCapacity(product.capacity);
      setActiveColor(product.color);
      setActivePhoto(product.images?.[0] || '');
    }
  }, [product]);

  if (!product) {
    return <p className="not-found">Product not found</p>;
  }

  // Перевірка чи товар з поточними кольором і ємністю вже в кошику
  const added = cartItems.some(
    item =>
      item.id === product.id &&
      item.color === activeColor &&
      item.capacity === activeCapacity,
  );

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

  const handleAddToCart = () => {
    if (added) {
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.priceDiscount,
      image: `/${product.images?.[0]}`,
      color: activeColor,
      capacity: activeCapacity,
      quantity: 1,
      category: product.category,
    });
  };

  const validCapacities = product.capacityAvailable.filter(capacity =>
    accessories.some(
      p =>
        p.namespaceId === product.namespaceId &&
        p.capacity === capacity &&
        p.color === activeColor,
    ),
  );

  const filteredColors = product.colorsAvailable.filter(color =>
    accessories.some(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === color &&
        p.capacity === activeCapacity &&
        p.availability !== 'no',
    ),
  );

  const handleCapacityChange = capacity => {
    const found = accessories.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.capacity === capacity &&
        p.color === activeColor,
    );

    if (found) {
      navigate(`/accessories/${found.id}`);
    } else {
      setActiveCapacity(capacity);
    }
  };

  const handleColorChange = color => {
    const found = accessories.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === color &&
        p.capacity === activeCapacity,
    );

    if (found) {
      navigate(`/accessories/${found.id}`);
    } else {
      setActiveColor(color);
    }
  };

  return (
    <>
      <div className="product-page-container">
        <div className="products-list-title-page">
          <Link to="/Home">
            <img
              src="./images/icons/Home.svg"
              className="products-list-icon"
              alt="Home"
            />
          </Link>
          <img
            src="./images/icons/Chevron_Arrow_Right_Disabled.svg"
            className="products-list-arrow"
            alt="Arrow_Right"
          />
          <NavLink to="/accessories">
            <p className="hover-link hover-link-text">Accessories</p>
          </NavLink>

          <img
            src="./images/icons/Chevron_Arrow_Right_Disabled.svg"
            className="products-list-arrow"
            alt="Arrow_Right"
          />
          <p className="hover-link hover-link-product">{product.name}</p>
        </div>

        <p className="products-list-title-page">
          <img
            src="./images/icons/Chevron_Arrow_Left_Disabled.svg"
            className="product-list-arrow-one"
            alt="Arrow_Right"
          />
          <button onClick={() => navigate(-1)} className="back-button ">
            <p className="hover-link hover-link-text">Back</p>
          </button>
        </p>

        <h1 className="kartka-product-title-one">{product.name}</h1>
      </div>

      <div className="photo-gallery-container-one">
        <div className="photo-gallery">
          <div className="photo-gallery__left-column">
            {product.images?.map((src, i) => (
              <img
                key={i}
                src={`/${src}`}
                alt={`Photo ${i + 1}`}
                className={`photo-gallery__small-photo ${
                  activePhoto === src ? 'active' : ''
                }`}
                onClick={() => setActivePhoto(src)}
              />
            ))}
          </div>

          <div className="photo-gallery__right-photo">
            <img
              src={`/${activePhoto}`}
              alt="Big preview"
              className="photo-gallery__big-photo"
            />
          </div>
        </div>

        <div className="kartka-product-info">
          <div>
            <h1 className="kartka-product-title">Available colors</h1>
            <div className="color-buttons">
              {filteredColors.map(color => {
                const variant = accessories.find(
                  p =>
                    p.namespaceId === product.namespaceId &&
                    p.color === color &&
                    p.capacity === activeCapacity,
                );

                const isAvailable = variant && variant.availability !== 'no';

                return (
                  <div className="capacity-wrapper" key={color}>
                    <button
                      className={`color-button ${
                        activeColor === color ? 'active' : ''
                      }`}
                      style={{
                        backgroundColor: color,
                        opacity: isAvailable ? 1 : 0.4,
                        cursor: isAvailable ? 'pointer' : 'not-allowed',
                      }}
                      onClick={() => isAvailable && handleColorChange(color)}
                      disabled={!isAvailable}
                    />
                    {!isAvailable && <span className="capacity-warning"></span>}
                  </div>
                );
              })}
              <div className="kartka-product-border"></div>
            </div>

            <div className="capacity-buttons">
              <h1 className="kartka-product-title">Select capacity</h1>
              {validCapacities.map(capacity => {
                const variant = accessories.find(
                  p =>
                    p.namespaceId === product.namespaceId &&
                    p.capacity === capacity &&
                    p.color === activeColor,
                );

                const isAvailable = variant && variant.availability !== 'no';

                return (
                  <div className="capacity-wrapper" key={capacity}>
                    <button
                      className={`capacity-button ${
                        activeCapacity === capacity ? 'active' : ''
                      } ${!isAvailable ? 'unavailable' : ''}`}
                      onClick={() =>
                        isAvailable && handleCapacityChange(capacity)
                      }
                      disabled={!isAvailable}
                    >
                      {capacity}
                    </button>
                    {!isAvailable && <span className="capacity-warning"></span>}
                  </div>
                );
              })}
            </div>

            <div className="kartka-product-border"></div>
            <div className="products_card_info">
              <div className="products_card_price_box">
                <p className="products_card_price">
                  ${product.priceDiscount}
                  {product.priceRegular && (
                    <span className="products_card_old_price">
                      ${product.priceRegular}
                    </span>
                  )}
                </p>
              </div>

              <div className="products_card_button">
                <button
                  className={`products_card_button_add ${added ? 'added' : ''}`}
                  onClick={handleAddToCart}
                  disabled={added}
                >
                  {added ? 'Added to cart' : 'Add to cart'}
                </button>

                <button
                  className={`products_card_button_icon ${
                    animating ? 'animate' : ''
                  }`}
                  onClick={toggleLike}
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

              <div className="products_card_text">
                <div className="products_card_info_text">
                  <span className="spec-labels">Screen</span>
                  <span className="spec-values">{product.screen}</span>
                </div>
                <div className="products_card_info_text">
                  <span className="spec-labels">Capacity</span>
                  <span className="spec-values">{activeCapacity}</span>
                </div>
                <div className="products_card_info_text">
                  <span className="spec-labels">RAM</span>
                  <span className="spec-values">{product.ram}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-id">
          <p>ID: {product.id}</p>
        </div>
      </div>

      <div className="products-information">
        {/* About Section */}
        <div className="about-section">
          <div className="about-section">
            <h2 className="section-title">About</h2>
            <div className="section-title-border"></div>
            {product.description.map((section, index) => (
              <div key={index} className="about-block">
                <h3 className="block-title">{section.title}</h3>
                {section.text.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Specs Section */}
        <div className="tech-specs">
          <h2 className="section-title">Tech specs</h2>
          <div className="section-title-border"></div>
          <div className="spec-list">
            <div className="spec-item">
              <span className="label">Screen</span>
              <span className="value">{product.screen}</span>
            </div>
            <div className="spec-item">
              <span className="label">Resolution</span>
              <span className="value">{product.resolution || '—'}</span>
            </div>
            <div className="spec-item">
              <span className="label">Processor</span>
              <span className="value">{product.processor || '—'}</span>
            </div>
            <div className="spec-item">
              <span className="label">RAM</span>
              <span className="value">{product.ram}</span>
            </div>
            <div className="spec-item">
              <span className="label">Built in memory</span>
              <span className="value">{product.capacity}</span>
            </div>
            <div className="spec-item">
              <span className="label">Camera</span>
              <span className="value">{product.camera || '—'}</span>
            </div>
            <div className="spec-item">
              <span className="label">Zoom</span>
              <span className="value">{product.zoom || '—'}</span>
            </div>
            <div className="spec-item">
              <span className="label">Cell</span>
              <span className="value">{product.cell}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="down-page">
        <DownPage products={randomProducts} />
      </div>
    </>
  );
}
