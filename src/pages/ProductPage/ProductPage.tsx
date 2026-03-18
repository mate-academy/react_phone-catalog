import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Product, Phone, Tablet, Accessory } from '../../../public/types';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useCart } from '../../components/CartContext/CartContext';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToFavorites, removeFromFavorites } from '../../features/favorites/favoritesSlice';
import { colorMap } from '../../../public/utils/colorMap';
import './ProductPage.scss';

type ProductType = Phone | Tablet | Accessory;

interface ProductPageProps {
  products: ProductType[];
}

const ProductPage = ({ products }: ProductPageProps) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); // Ініціалізація dispatch

  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Отримуємо актуальний стан з Redux
  const favorites = useAppSelector((state) => state.favorites.items);
  // Перевірка, чи лайкнутий товар (безпечна перевірка через опціональний ланцюжок)
  const isLiked = favorites.some(item => item.id === product?.id);

  const { addToCart } = useCart();

  useEffect(() => {
    if (!productId || products.length === 0) return;

    const foundProduct = products.find(p => p.id === productId);
    setProduct(foundProduct || null);
    setLoading(false);
    setSelectedImage(0); // Скидаємо картинку при зміні продукту
  }, [productId, products]);

  // Обробка кліку на сердечко
  const handleLikeClick = () => {
    if (!product) return;

    if (isLiked) {
      dispatch(removeFromFavorites(product.id));
    } else {
      // Приводимо до типу Product для збереження в стор
      dispatch(addToFavorites(product as unknown as Product));
    }
  };

  if (loading) {
    return <div className="product-page product-page--loading"><p>Loading product...</p></div>;
  }

  if (!product) {
    return (
      <div className="product-page product-page--error">
        <Breadcrumbs />
        <h1>Product not found</h1>
        <p>We couldn't find product with id: {productId}</p>
      </div>
    );
  }

  // Розрахунок варіантів
  const colorVariants = products.filter(p =>
    p.namespaceId === product.namespaceId && p.capacity === product.capacity
  );
  const capacityVariants = products.filter(p =>
    p.namespaceId === product.namespaceId && p.color === product.color
  );

  return (
    <div className="product-page">
      <Breadcrumbs productName={product.name} />
      <div className="back-button" onClick={() => navigate(-1)}>
        <img src="/img/Arrow_Left.svg" alt="Arrow" className="breadcrumbs__arrow" />
        Back
      </div>

      <h1 className="product-title">{product.name}</h1>

      <div className="product-content">
        <div className="product-gallery">
          <div className="gallery-thumbnails">
            {product.images.map((img, index) => (
              <button
                key={img}
                className={`thumbnail ${selectedImage === index ? 'thumbnail--active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} ${index}`} />
              </button>
            ))}
          </div>
          <div className="gallery-main">
            <img src={product.images[selectedImage]} alt={product.name} className="product-main-image" />
          </div>
        </div>

        <div className="product-info">
          <div className="product-colors">
            <span className="color-label">Available colors</span>
            <div className="color-dots">
              {colorVariants.map(variant => (
                <span
                  key={variant.id}
                  className={`color-dot ${variant.color === product.color ? 'color-dot--active' : ''}`}
                  style={{ backgroundColor: colorMap[variant.color] || '#ccc' }}
                  onClick={() => navigate(`/products/${variant.id}`)}
                />
              ))}
            </div>
          </div>
          <hr className="divider" />

          <div className="product-capacity">
            <span className="capacity-label">Select capacity</span>
            <div className="capacity-buttons">
              {capacityVariants.map(variant => (
                <span
                  key={variant.id}
                  className={`capacity-item ${variant.capacity === product.capacity ? 'capacity-item--active' : ''}`}
                  onClick={() => navigate(`/products/${variant.id}`)}
                >
                  {variant.capacity}
                </span>
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
              className="action-button"
              onClick={() => addToCart({
                id: product.id,
                name: product.name,
                price: product.priceDiscount,
                image: product.images[0],
                quantity: 1,
              })}
            >
              Add to cart
            </button>
            <button
              className={`favorite-button ${isLiked ? 'is-liked' : ''}`}
              onClick={handleLikeClick}
            >
              <img
                src={isLiked ? '/img/HeartFilled.svg' : '/img/Like.svg'}
                alt="Like"
              />
            </button>
          </div>

          <div className="product-specs">
            {/* ... твій код специфікацій */}
            <div className="spec-row">
              <span className="spec-name">Screen</span>
              <span className="spec-value">{product.screen}</span>
            </div>
            <div className="spec-row">
              <span className="spec-name">RAM</span>
              <span className="spec-value">{product.ram}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description sections */}
      <div className="product-description">
        <section className="about-section">
          <div className="about-title">About</div>
          <hr className="divider" />
          {product.description.map(section => (
            <div key={section.title} className="about-section-content">
              <h2>{section.title}</h2>
              {section.text.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          ))}
        </section>

        <section className="about-section">
          <div className="about-title">Tech specs</div>
          <hr className="divider" />
          <div className="product-specs2">
             <div className="spec-row">
                <span className="spec-name">Screen</span>
                <span className="spec-value">{product.screen}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Built in memory</span>
                <span className="spec-value">{product.capacity}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Camera</span>
                <span className="spec-value">{'camera' in product ? product.camera : 'N/A'}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Cell</span>
                <span className="spec-value">{'cell' in product ? product.cell.join(', ') : 'N/A'}</span>
              </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;
