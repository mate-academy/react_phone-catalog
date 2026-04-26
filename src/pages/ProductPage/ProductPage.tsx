import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import {
  CatalogProduct,
  Phone,
  Tablet,
  Accessory,
} from '../../../public/types';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../features/favorites/favoritesSlice';
import { addToCart, removeFromCart } from '../../features/cart/cartSlice';
import { colorMap } from '../../../public/utils/colorMap';
import './ProductPage.scss';

type ProductType = Phone | Tablet | Accessory;

const ProductPage = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  const products = useAppSelector(
    state => state.products.items,
  ) as ProductType[];
  const favorites = useAppSelector(state => state.favorites.items);
  const cartItems = useAppSelector(state => state.cart.items);

  const sortedProducts: CatalogProduct[] = useMemo(() => {
    return [...(products as unknown as CatalogProduct[])]
      .sort((a, b) => b.year - a.year)
      .slice(0, 10);
  }, [products]);

  const visibleCount = 4;
  const isLiked = favorites.some(item => item.id === product?.id);
  const isInCart = cartItems.some(item => item.id === product?.id);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!productId || products.length === 0) {
      return;
    }

    const foundProduct = products.find(p => p.id === productId);

    if (foundProduct) {
      setProduct(foundProduct);
      setLoading(false);
      setSelectedImage(0);
      setStartIndex(0);
    } else {
      setLoading(false);
    }
  }, [productId, products]);

  const handleLikeClick = () => {
    if (!product) {
      return;
    }

    if (isLiked) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product as unknown as CatalogProduct));
    }
  };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.priceDiscount,
          image: product.images[0],
        }),
      );
    }
  };

  const handlePrev = () => setStartIndex(prev => Math.max(prev - 1, 0));
  const handleNext = () =>
    setStartIndex(prev =>
      Math.min(prev + 1, Math.max(0, sortedProducts.length - visibleCount)),
    );

  const visibleProducts = sortedProducts.slice(
    startIndex,
    startIndex + visibleCount,
  );

  if (loading) {
    return (
      <div className="product-page product-page--loading">
        <div className="loader">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page product-page--error">
        <Breadcrumbs />
        <h1>Product not found</h1>
        <button onClick={() => navigate('/')} className="back-button">
          Go Home
        </button>
      </div>
    );
  }

  const colorVariants = products.filter(
    p =>
      p.namespaceId === product.namespaceId && p.capacity === product.capacity,
  );
  const capacityVariants = products.filter(
    p => p.namespaceId === product.namespaceId && p.color === product.color,
  );

  return (
    <div className="product-page">
      <Breadcrumbs productName={product.name} />

      <div className="back-button" onClick={() => navigate(-1)}>
        <img src="./img/Arrow_Left.svg" alt="Arrow" />
        <span>Back</span>
      </div>

      <h1 className="product-title">{product.name}</h1>

      <div className="product-two-columns">
        {/* ЛІВА КОЛОНКА */}
        <div className="left-side">
          <div className="product-gallery">
            <div className="gallery-thumbnails">
              {product.images.map((img, index) => (
                <button
                  key={`${img}-${index}`}
                  className={`thumbnail ${selectedImage === index ? 'thumbnail--active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={`/${img}`} alt={`${product.name} ${index}`} />
                </button>
              ))}
            </div>
            <div className="gallery-main">
              <img
                src={`/${product.images[selectedImage]}`}
                alt={product.name}
                className="product-main-image"
              />
            </div>
          </div>

          <section className="about-section">
            <h2 className="about-title">About</h2>
            <hr className="divider" />
            {product.description.map(section => (
              <div key={section.title} className="about-section-content">
                <h3 className="section-title">{section.title}</h3>
                {section.text.map((paragraph, i) => (
                  <p className="paragraph" key={i}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </section>
        </div>

        {/* ПРАВА КОЛОНКА */}
        <div className="right-side">
          <div className="product-info-card">
            <div className="product-colors">
              <div className="top-container">
                <span className="label">Available colors</span>
                <span className="product-id">ID: {product.id}</span>
              </div>
              <div className="color-dots">
                {colorVariants.map(variant => (
                  <button
                    key={variant.id}
                    className={`color-dot ${variant.color === product.color ? 'color-dot--active' : ''}`}
                    style={{
                      backgroundColor: colorMap[variant.color] || '#ccc',
                    }}
                    onClick={() => navigate(`/${category}/${variant.id}`)}
                  />
                ))}
              </div>
            </div>

            <hr className="divider" />

            <div className="product-capacity">
              <span className="label">Select capacity</span>
              <div className="capacity-buttons">
                {capacityVariants.map(variant => (
                  <button
                    key={variant.id}
                    className={`capacity-item ${variant.capacity === product.capacity ? 'capacity-item--active' : ''}`}
                    onClick={() => navigate(`/${category}/${variant.id}`)}
                  >
                    {variant.capacity}
                  </button>
                ))}
              </div>
            </div>

            <hr className="divider" />

            <div className="product-pricing">
              <span className="current-price">${product.priceDiscount}</span>
              {product.priceRegular !== product.priceDiscount && (
                <span className="original-price">${product.priceRegular}</span>
              )}
            </div>

            <div className="product-actions">
              <button
                className={`action-button ${isInCart ? 'action-button--added-to-cart' : ''}`}
                onClick={handleAddToCart}
              >
                {isInCart ? 'Added to cart' : 'Add to cart'}
              </button>

              <button
                className={`favorite-button ${isLiked ? 'liked' : ''}`}
                onClick={handleLikeClick}
              >
                <img
                  src={isLiked ? './img/HeartFilled.svg' : '/img/Like.svg'}
                  alt="Like"
                />
              </button>
            </div>

            <div className="product-specs-short">
              <div className="spec-row">
                <span className="spec-name">Screen</span>
                <span className="spec-value">{product.screen}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Resolution</span>
                <span className="spec-value">{product.resolution}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Processor</span>
                <span className="spec-value">{product.processor}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">RAM</span>
                <span className="spec-value">{product.ram}</span>
              </div>
            </div>
          </div>

          <section className="tech-specs-section">
            <h2 className="about-title">Tech specs</h2>
            <hr className="divider" />
            <div className="product-specs-full">
              <div className="spec-row">
                <span className="spec-name">Screen</span>
                <span className="spec-value">{product.screen}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Resolution</span>
                <span className="spec-value">{product.resolution}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Processor</span>
                <span className="spec-value">{product.processor}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">RAM</span>
                <span className="spec-value">{product.ram}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Built in memory</span>
                <span className="spec-value">{product.capacity}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Camera</span>
                <span className="spec-value">
                  {'camera' in product ? product.camera : 'N/A'}
                </span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Zoom</span>
                <span className="spec-value">
                  {'zoom' in product ? product.zoom : 'N/A'}
                </span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Cell</span>
                <span className="spec-value">
                  {'cell' in product ? product.cell.join(', ') : 'N/A'}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="brand-new-models">
        <div className="container-products">
          <h2>You may also like</h2>
          <div className="carousel-buttons">
            <button
              className="carousel-arrow left"
              onClick={handlePrev}
              disabled={startIndex === 0}
            >
              <img src="./img/Arrow_Left.svg" alt="Left" />
            </button>
            <button
              className="carousel-arrow right"
              onClick={handleNext}
              disabled={startIndex + visibleCount >= sortedProducts.length}
            >
              <img src="./img/Arrow_Right.svg" alt="Right" />
            </button>
          </div>
        </div>
        <div className="products-grid">
          {visibleProducts.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
