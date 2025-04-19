import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { ProductDetailed } from '../../types/Product';
import favoriteIcon from '../../assets/img/Icons/favorite.png';
import favoriteFilledIcon from '../../assets/img/Icons/favorite-filed.svg';
import { ProductCard } from '../ProductCard/ProductCard';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import './ProductDetailsPage.scss';

// Import shared gallery images
import sharedImage1 from '../../assets/img/main_card/main.png';
import sharedImage2 from '../../assets/img/main_card/2.png';
import sharedImage3 from '../../assets/img/main_card/3.png';
import sharedImage4 from '../../assets/img/main_card/4.png';
import sharedImage6 from '../../assets/img/main_card/6.png';

// Import phone images
import iphone10Silver from '../../assets/img/phones/10_Silver.png';
import iphone11Purple from '../../assets/img/phones/11_Purple.png';
import iphone11ProMaxGold from '../../assets/img/phones/11pro_max_Gold.png';
import iphone14ProSilver from '../../assets/img/phones/14pro_Silver.png';

// These shared images will be used for all products
const sharedProductImages = [
  sharedImage1,
  sharedImage2,
  sharedImage3,
  sharedImage4,
  sharedImage6,
];

// Standard product options for all products
const standardColors = ['#f0d9b5', '#4a5b5d', '#39373b', '#ffffff'];
const colorNames = ['gold', 'green', 'black', 'white'];
const standardCapacities = ['64 GB', '256 GB', '512 GB'];

// Інтерфейс для базових даних продукту
interface ProductBase {
  id: number;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  capacity: string;
  camera: string;
  zoom: string;
  cell: string[];
  itemId?: string;
}

// Зразки реальних продуктів
const sampleProducts: ProductBase[] = [
  {
    id: 1,
    name: 'Apple iPhone X 256GB Silver',
    price: 859,
    fullPrice: 899,
    screen: '5.8" OLED',
    resolution: '2436x1125',
    processor: 'Apple A11 Bionic',
    ram: '3 GB',
    capacity: '256 GB',
    camera: '12 MP + 12 MP (Dual)',
    zoom: 'Digital, 5x',
    cell: ['GSM', 'LTE', 'UMTS'],
    itemId: 'iphone-x-256gb-silver',
  },
  {
    id: 2,
    name: 'Apple iPhone 11 Pro Max 64GB Gold',
    price: 799,
    fullPrice: 1199,
    screen: '6.5" OLED',
    resolution: '2688x1242',
    processor: 'Apple A13 Bionic',
    ram: '3 GB',
    capacity: '64 GB',
    camera: '12 MP + 12 MP + 12 MP (Triple)',
    zoom: 'Optical, 2x',
    cell: ['GSM', 'LTE', 'UMTS'],
    itemId: 'iphone-11-pro-max-64gb-gold',
  },
  {
    id: 3,
    name: 'Apple iPhone 11 128GB Purple',
    price: 799,
    fullPrice: 899,
    screen: '6.1" IPS',
    resolution: '1792x828',
    processor: 'Apple A13 Bionic',
    ram: '4 GB',
    capacity: '128 GB',
    camera: '12 MP + 12 MP (Dual)',
    zoom: 'Digital, 5x',
    cell: ['GSM', 'LTE', 'UMTS'],
    itemId: 'iphone-11-128gb-purple',
  },
  {
    id: 4,
    name: 'Apple iPhone Xs 64GB Silver',
    price: 799,
    fullPrice: 899,
    screen: '5.8" OLED',
    resolution: '2436x1125',
    processor: 'Apple A12 Bionic',
    ram: '4 GB',
    capacity: '64 GB',
    camera: '12 MP + 12 MP (Dual)',
    zoom: 'Digital, 5x',
    cell: ['GSM', 'LTE', 'UMTS'],
    itemId: 'iphone-xs-64gb-silver',
  },
];

// Опис для всіх продуктів
const productDescription = [
  'A transformative triple-camera system that adds tons of capability ' +
    'without complexity.',
  'An unprecedented leap in battery life. And a mind-blowing chip that ' +
    'doubles down on machine learning and pushes the boundaries of what ' +
    'a smartphone can do.',
  'Welcome to the first iPhone powerful enough to be called Pro.',
];

// Опис камери для всіх продуктів
const cameraDescription = `
Meet the first triple-camera system to combine cutting-edge technology with
the legendary simplicity of iPhone. Capture up to four times more scene. Get
beautiful images in drastically lower light. Shoot the highest-quality video in a
smartphone — then edit with the same tools you love for photos. You've never
shot with anything like it.
`;
const shootIt = `
iPhone 11 Pro lets you capture videos that are beautifully true to life,
with greater detail and smoother motion. Epic processing power means it can
shoot 4K video with extended dynamic range and cinematic video stabilization —
all at 60 fps. You get more creative control, too, with four times more scene
and powerful new editing tools to play with.
`;

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetailed | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(sharedProductImages[0]);
  const [selectedColor, setSelectedColor] = useState(0); // index of color
  const [selectedCapacity, setSelectedCapacity] = useState(0); // index of capacity
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { isInCart, addToCart, removeFromCart } = useCart();

  const isProductFavorite = productId ? isFavorite(productId) : false;
  const isProductInCart = productId ? isInCart(productId) : false;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);

        // Extract the product details from the URL
        const urlPath = productId?.toLowerCase() || '';

        // Try to find by numeric ID first
        let foundProduct = null;
        const numericId = parseInt(urlPath, 10);

        if (!isNaN(numericId)) {
          foundProduct = sampleProducts.find(p => p.id === numericId);
        }

        // If no match by ID, try to find by itemId
        if (!foundProduct) {
          foundProduct = sampleProducts.find(p => {
            const productItemId = p.itemId?.toLowerCase() || '';

            return productItemId === urlPath;
          });
        }

        // If still no match, use the first product as fallback
        if (!foundProduct) {
          foundProduct = sampleProducts[0];
        }

        // Create the full product object with shared images and options
        const mockProduct: ProductDetailed = {
          ...foundProduct,
          image: sharedProductImages[0],
          category: 'phones',
          phoneId: productId || `phone-${foundProduct.id}`,
          color: colorNames[0],
          images: sharedProductImages,
          colors: colorNames,
          capacities: standardCapacities,
          description: productDescription,
          oldPrice: foundProduct.fullPrice,
        };

        setProduct(mockProduct);
      } catch (error) {
        // Error handling
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId, navigate]);

  // Handler for the "Add to Cart" button
  const handleAddToCart = () => {
    if (productId) {
      if (isProductInCart) {
        removeFromCart(productId);
      } else {
        addToCart(productId);
      }
    }
  };

  // Handler for the "Add to Favorites" button
  const handleAddToFavorites = () => {
    if (productId) {
      if (isProductFavorite) {
        removeFromFavorites(productId);
      } else {
        addToFavorites(productId);
      }
    }
  };

  // Handler for thumbnail image click
  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const handleColorSelect = (index: number) => {
    setSelectedColor(index);

    if (product) {
      const newName = product.name.replace(
        /(.*?)\s+\w+(?=\s+\d+GB)/,
        `$1 ${colorNames[index]}`,
      );

      setProduct({
        ...product,
        name: newName,
        color: colorNames[index],
        colors: product.colors,
      });
    }
  };

  const handleCapacitySelect = (index: number) => {
    setSelectedCapacity(index);

    if (product) {
      const newName = product.name.replace(/\d+GB/, standardCapacities[index]);

      setProduct({
        ...product,
        name: newName,
        capacity: standardCapacities[index],
        capacities: product.capacities,
      });
    }
  };

  if (loading) {
    return (
      <div className="product-details-page">
        <Header />
        <main className="product-details-page__content">
          <div className="product-details-page__loading">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <Header />
        <main className="product-details-page__content">
          <div className="product-details-page__error">Product not found</div>
        </main>
        <Footer />
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Phones', link: '/phones' },
    { label: product.name },
  ];

  return (
    <div className="product-details-page">
      <Header />

      <main className="product-details-page__content">
        <div className="product-details-page__breadcrumbs">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="product-details-page__back">
          <button
            className="product-details-page__back-button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>

        <h1 className="product-details-page__product-title">{product.name}</h1>

        <div className="product-details-page__main-content">
          <div className="product-details-page__images">
            <div className="product-details-page__thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`product-details-page__thumbnail-btn ${
                    mainImage === image
                      ? 'product-details-page__thumbnail-btn--active'
                      : ''
                  }`}
                  onClick={() => handleThumbnailClick(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="product-details-page__thumbnail-img"
                  />
                </button>
              ))}
            </div>

            <div className="product-details-page__main-image-container">
              <img
                src={mainImage}
                alt={product.name}
                className="product-details-page__main-image"
              />
            </div>
          </div>

          <div className="product-details-page__info">
            <div className="product-details-page__id">ID: 802390</div>

            <div className="product-details-page__colors">
              <div className="product-details-page__colors-title">
                Available colors
              </div>
              <div className="product-details-page__colors-list">
                {standardColors.map((color, index) => (
                  <button
                    key={index}
                    className={`product-details-page__colors-option ${
                      selectedColor === index
                        ? 'product-details-page__colors-option--active'
                        : ''
                    }`}
                    onClick={() => handleColorSelect(index)}
                  >
                    <span
                      className="product-details-page__colors-option-inner"
                      style={{ backgroundColor: color }}
                    ></span>
                  </button>
                ))}
              </div>
            </div>

            <div className="product-details-page__capacity">
              <div className="product-details-page__capacity-title">
                Select capacity
              </div>
              <div className="product-details-page__capacity-list">
                {standardCapacities.map((capacity, index) => (
                  <button
                    key={index}
                    className={`product-details-page__capacity-option ${
                      selectedCapacity === index
                        ? 'product-details-page__capacity-option--active'
                        : ''
                    }`}
                    onClick={() => handleCapacitySelect(index)}
                  >
                    {capacity}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-details-page__price">
              <span className="product-details-page__price-current">
                ${product.price}
              </span>
              <span className="product-details-page__price-old">
                ${product.oldPrice}
              </span>
            </div>

            <div className="product-details-page__actions">
              <button
                className={`product-details-page__add-to-cart ${
                  isProductInCart
                    ? 'product-details-page__add-to-cart--added'
                    : ''
                }`}
                onClick={handleAddToCart}
              >
                {isProductInCart ? 'Remove from cart' : 'Add to cart'}
              </button>
              <button
                className={`product-details-page__favorite ${
                  isProductFavorite
                    ? 'product-details-page__favorite--added'
                    : ''
                }`}
                onClick={handleAddToFavorites}
              >
                <img
                  src={isProductFavorite ? favoriteFilledIcon : favoriteIcon}
                  alt="Add to favorites"
                  className="product-details-page__favorite-icon"
                />
              </button>
            </div>

            <div className="product-details-page__quick-specs">
              <div className="product-details-page__quick-specs-row">
                <div className="product-details-page__quick-specs-label">
                  Screen
                </div>
                <div className="product-details-page__quick-specs-value">
                  6.5&quot; OLED
                </div>
              </div>
              <div className="product-details-page__quick-specs-row">
                <div className="product-details-page__quick-specs-label">
                  Resolution
                </div>
                <div className="product-details-page__quick-specs-value">
                  2688x1242
                </div>
              </div>
              <div className="product-details-page__quick-specs-row">
                <div className="product-details-page__quick-specs-label">
                  Processor
                </div>
                <div className="product-details-page__quick-specs-value">
                  Apple A12 Bionic
                </div>
              </div>
              <div className="product-details-page__quick-specs-row">
                <div className="product-details-page__quick-specs-label">
                  RAM
                </div>
                <div className="product-details-page__quick-specs-value">
                  3 GB
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details-page__sections">
          <div className="product-details-page__about-section">
            <h2 className="product-details-page__section-title">About</h2>
            <div className="product-details-page__about-content">
              <h3>And then there was Pro</h3>
              <p className="product-details-page__about-text">
                {productDescription[0]}
              </p>
              <p className="product-details-page__about-text">
                {productDescription[1]}
              </p>
              <p className="product-details-page__about-text">
                {productDescription[2]}
              </p>

              <h3>Camera</h3>
              <p className="product-details-page__about-text">
                {cameraDescription}
              </p>

              <h3>
                Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
                Love it.
              </h3>
              <p className="product-details-page__about-text">{shootIt}</p>
            </div>
          </div>

          <div className="product-details-page__tech-specs-section">
            <h2 className="product-details-page__section-title">Tech specs</h2>
            <div className="product-details-page__tech-specs-content">
              <div className="product-details-page__specs-item">
                <span className="product-details-page__specs-name">Screen</span>
                <span className="product-details-page__specs-value">
                  {product.screen}
                </span>
              </div>
              <div className="product-details-page__specs-item">
                <span className="product-details-page__specs-name">
                  Resolution
                </span>
                <span className="product-details-page__specs-value">
                  {product.resolution}
                </span>
              </div>
              <div className="product-details-page__specs-item">
                <span className="product-details-page__specs-name">
                  Processor
                </span>
                <span className="product-details-page__specs-value">
                  {product.processor}
                </span>
              </div>
              <div className="product-details-page__specs-item">
                <span className="product-details-page__specs-name">RAM</span>
                <span className="product-details-page__specs-value">
                  {product.ram}
                </span>
              </div>
              <div className="product-details-page__specs-item">
                <span className="product-details-page__specs-name">
                  Built in memory
                </span>
                <span className="product-details-page__specs-value">
                  {product.capacity}
                </span>
              </div>
              <div className="product-details-page__specs-item">
                <span className="product-details-page__specs-name">Camera</span>
                <span className="product-details-page__specs-value">
                  {product.camera}
                </span>
              </div>
              <div className="product-details-page__specs-item">
                <span className="product-details-page__specs-name">Zoom</span>
                <span className="product-details-page__specs-value">
                  {product.zoom}
                </span>
              </div>
              <div className="product-details-page__specs-item">
                <span className="product-details-page__specs-name">Cell</span>
                <span className="product-details-page__specs-value">
                  {product.cell.join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details-page__suggestions">
          <h2 className="product-details-page__suggestions-title">
            You may also like
          </h2>
          <div className="product-details-page__suggestions-list">
            <ProductCard
              id={1}
              name="Apple iPhone X 256GB Silver"
              price={859}
              oldPrice={899}
              image={iphone10Silver}
              screen='5.8" OLED'
              capacity="256 GB"
              ram="3 GB"
            />
            <ProductCard
              id={2}
              name="Apple iPhone 11 Pro Max 64GB Gold"
              price={799}
              oldPrice={1199}
              image={iphone11ProMaxGold}
              screen='6.5" OLED'
              capacity="64 GB"
              ram="3 GB"
            />
            <ProductCard
              id={3}
              name="Apple iPhone 11 128GB Purple"
              price={799}
              oldPrice={899}
              image={iphone11Purple}
              screen='6.1" IPS'
              capacity="128 GB"
              ram="4 GB"
            />
            <ProductCard
              id={4}
              name="Apple iPhone Xs 64GB Silver"
              price={799}
              oldPrice={899}
              image={iphone14ProSilver}
              screen='5.8" OLED'
              capacity="64 GB"
              ram="4 GB"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Explicit default export to ensure it's recognized
// export default ProductDetailsPage;
