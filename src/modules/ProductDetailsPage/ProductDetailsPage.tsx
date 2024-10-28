import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/ProductCard';
import { useState } from 'react';
import homeIcon from '../../../public/img/icons/Home.svg';
import arrowRight from '../../../public/img/icons/ArrowRight.svg';
import strokeLeft from '../../../public/img/icons/StrokeLeft.svg';
import strokeRight from '../../../public/img/icons/StrokeRight.svg';
import { ProductDescription } from '../../types/Accessories';
import styles from './ProductDetails.module.css';
import { Link } from 'react-router-dom';
import favouritesIcon from '../../../public/img/icons/Favourites.svg';

interface ProductDetailsPageProps {
  productDescription: ProductDescription;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [product, setProduct] = useState<ProductDescription | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');

  const [chooseColor, setChooseColor] = useState<string | null>(null);
  const [chooseCapacity, setChooseCapacity] = useState('');
  const activeColor = searchParams.get('color') || 'gold';
  const activeCapacity = searchParams.get('capacity') || '';
  const navigate = useNavigate();

  console.log('product', product);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/accessories.json');
      const data = await response.json();
      const selectedProduct = data.find(
        (item: ProductDescription) => item.id === itemId,
      );

      if (selectedProduct) {
        setProduct(selectedProduct);

        setSelectedImage(selectedProduct.images[0]);

        setChooseColor(selectedProduct.color);
      } else {
        setError('Product not found');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (product) {
  //     const newImage = product.images.find(img => img.colorsAvailable === activeColor) || product.images[0];
  //     setSelectedImage(newImage);
  //   }
  // }, [product, activeColor]);

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchProducts();
  }, [itemId]);

  const handleReload = () => {
    fetchProducts();
  };

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCapacityChange = (capacity: string) => {
    setChooseCapacity(capacity);
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.set('capacity', capacity);

      return newParams;
    });
  };

  const handleColorChange = (color: string) => {
    setChooseColor(color);
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.set('color', color);
      newParams.set('capacity', activeCapacity);

      return newParams;
    });
  };

  const baseImagePath = `img/${product?.category}/${product?.namespaceId}/${chooseColor}`;
  const imageFiles = ['00.webp', '01.webp', '02.webp'];
  // "img/accessories/apple-watch-series-6/silver/00.webp",

  return (
    <div className="section section--product-details">
      <nav className="breadcrumbs">
        <a href="/">
          <img
            src={homeIcon}
            alt="Home"
            className="breadcrumbs__item breadcrumbs__item--home"
          />
        </a>
        <span className="breadcrumbs__separator">/</span>
        <a href="/accessories" className="breadcrumbs__item">
          Accessories
        </a>
        <span className="breadcrumbs__separator">/</span>
        <span className="breadcrumbs__item breadcrumbs__item--current">
          {product?.name}
        </span>
      </nav>

      <Link to="#" onClick={handleBackClick} aria-label="Go back">
        <img
          src={arrowRight}
          alt="Arrow Right"
          className="breadcrumbs__item breadcrumbs__item--home"
        />
        Back
      </Link>

      <main>
        <h1 className="section__title">{product?.name}</h1>

        <div className="product-page">
          <div className="product-content">
            <div className="product-gallery">
              <div className="product-gallery product-gallery__thumbnails">
                {/* {product?.images?.map((image: string, index: number) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(image)}>
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </div>
                ))} */}

                {imageFiles.map((fileName, index) => (
                  <img
                    key={index}
                    src={`${baseImagePath}/${fileName}`}
                    className={`thumbnail ${selectedImage === fileName ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(fileName)}
                    alt={`${product?.name} ${chooseColor} ${index + 1}`}
                  />
                ))}
              </div>
              <div className="product-gallery product-gallery__main-image">
                <img src={selectedImage || ''} alt="Product main view" />
              </div>
            </div>
          </div>

          <div className="product-info">
            <div className="color-picker">
              <h3 className="color-picker__title picker-title">
                Available colors
              </h3>
              <div className="color-picker__options">
                {/* {product?.colorsAvailable.map((colorsAvailable: string, index: number) => (
                    <Link
                    key={colorsAvailable}
                    to={`?color=${colorsAvailable}->capacity=${activeCapacity}`}
                    onClick={() => handleColorChange(colorsAvailable)}
                    aria-label={`Select ${colorsAvailable}`}
                  >
                    <button
                      className={`color-picker__option color-picker__option--${colorsAvailable.replace(' ', '-')} ${activeColor === colorsAvailable ? 'active' : ''}`}
                    >
                      {colorsAvailable}
                    </button>
                  </Link>
                ))} */}

                {product?.colorsAvailable.map(color => {
                  const isCurrColor = color === product?.color;

                  return (
                    <Link
                      key={color}
                      to={`/${baseImagePath}/${product?.namespaceId}-${color}-${product?.capacity}`}
                      onClick={() => handleColorChange(color)}
                      className={`color-picker__option color-picker__option--${color.replace(' ', '-')} ${isCurrColor ? 'active' : ''}`}
                    >
                      {color}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="capacity-picker">
              <h3 className="capacity-picker__title picker-title">
                Select capacity
              </h3>
              <div className="capacity-picker__options">
                {product?.capacityAvailable.map(
                  (capacity: string, index: number) => (
                    <button
                      key={index}
                      className={`capacity-picker__option ${activeCapacity === capacity ? 'active' : ''}`}
                      aria-label={`Select ${capacity}`}
                      onClick={() => handleCapacityChange(capacity)}
                    >
                      {capacity}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="product-price">
              <span className="product-price__current">
                {product?.priceDiscount}$
              </span>
              <span className="product-price__old">
                {product?.priceRegular}$
              </span>
            </div>

            <div className="product-actions">
              <button className="product-actions__button">Add to cart</button>
              <a href="#">
                <img
                  src={favouritesIcon}
                  alt="Favourites"
                  className="product-actions__icon"
                />
              </a>
            </div>

            <div className="specs">
              <div className="specs__details">
                <span className="specs__property">Screen</span>
                <span className="specs__value">{product?.screen}</span>
              </div>
              <div className="specs__details">
                <span className="specs__property">Resolution</span>
                <span className="specs__value">{product?.resolution}</span>
              </div>
              <div className="specs__details">
                <span className="specs__property">Processor</span>
                <span className="specs__value">{product?.processor}</span>
              </div>
              <div className="specs__details">
                <span className="specs__property">RAM</span>
                <span className="specs__value">{product?.ram}</span>
              </div>
            </div>
          </div>
          <div className="product-id">
            <div className="product-info__id">ID: BD3390</div>
          </div>
        </div>

        <section className="products-details">
          <div className="about">
            <h2 className="products-details__title">About</h2>
            <div className="section-first">
              <h3 className="section-title">And then there was Pro</h3>
              <p className="about__text">
                A transformative triple-camera system that adds tons of
                capability without complexity.
              </p>
            </div>
            <div className="section-second">
              <h3 className="section-title">Camera</h3>
              <p className="about__text">
                A transformative triple-camera system that adds tons of
                capability without complexity.
              </p>
            </div>
            <div className="section-third">
              <h3 className="products-details__title section-title">
                Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
                Love it.
              </h3>
              <p className="about__text">
                iPhone 11 Pro lets you capture videos that are beautifully true
                to life, with greater detail and smoother motion. Epic
                processing power means it can shoot 4K video with extended
                dynamic range and cinematic video stabilization — all at 60 fps.
                You get more creative control, too, with four times more scene
                and powerful new editing tools to play with.
              </p>
            </div>
          </div>
          <div className="tech-specs">
            <h2 className="specs__title">Tech specs</h2>
            <div className="specs">
              <div className="specs__details">
                <span className="specs__property">Screen</span>
                <span className="specs__value">{product?.screen}</span>
              </div>
              <div className="specs__details">
                <span className="specs__property">Resolution</span>
                <span className="specs__value">{product?.resolution}</span>
              </div>
              <div className="specs__details">
                <span className="specs__property">Processor</span>
                <span className="specs__value">{product?.processor}</span>
              </div>
              <div className="specs__details">
                <span className="specs__property">RAM</span>
                <span className="specs__value">{product?.ram}</span>
              </div>
              <div className="specs__details">
                <span className="specs__property">Built in memory</span>
                <span className="specs__value">64 GB</span>
              </div>
              <div className="specs__details">
                <span className="specs__property">Camera</span>
                <span className="specs__value">
                  12 Mp + 12 Mp + 12 Mp (Triple)
                </span>
              </div>
              <div className="specs__details">
                <span className="specs__name">Zoom</span>
                <span className="specs__value">Optical, 2x</span>
              </div>
              <div className="specs__details">
                <span className="specs__name">Cell</span>
                <span className="specs__value">GSM, LTE, UMTS</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="additionally">
        <div className="section__header">
          <h1 className="section__title">Hot prices</h1>
          <a href="#">
            <img src={strokeLeft} alt="Previous"></img>
          </a>
          <a href="#">
            <img src={strokeRight} alt="Next"></img>
          </a>
        </div>
      </section>
    </div>
  );
};
