import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ProductDetailsPage.scss';

import productsData from '../../public/api/products.json';
import phonesDetailsData from '../../public/api/phones.json';
import tabletsDetailsData from '../../public/api/tablets.json';
import accessoriesDetailsData from '../../public/api/accessories.json';

import { Footer } from '../components/Footer/Footer';
import { Slider } from './Slider';
import { AddToCartButton } from '../components/addToCart';
import { useFavourites } from './FavouritesContext';

export interface ProductDetails {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: { title: string; text: string[] }[];
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[] | string;
}

const COLOR_HEX_MAP: Record<string, string> = {
  black: '#1f2020',
  green: '#aee1cd',
  yellow: '#ffe889',
  white: '#f8f9ec',
  purple: '#e5dbea',
  red: '#e3000f',
  spacegray: '#535150',
  midnight: '#2c3038',
  gold: '#fcdbc1',
  silver: '#e2e4e1',
  'rose-gold': '#e6c7c2',
  rosegold: '#e6c7c2',
  coral: '#ff6e5b',
  sierrablue: '#9bb5ce',
  graphite: '#5c5b57',
  blue: '#215e7c',
  starlight: '#f0eec9',
};

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { isFavourite, toggleFavourite } = useFavourites();

  const productSummary = productsData.find(item => item.itemId === productId);

  const getDetailsData = (): ProductDetails[] | null => {
    if (!productSummary) {
      return null;
    }

    switch (productSummary.category) {
      case 'phones':
        return phonesDetailsData;
      case 'tablets':
        return tabletsDetailsData;
      case 'accessories':
        return accessoriesDetailsData;
      default:
        return [];
    }
  };

  const currentDetailsData = getDetailsData();

  const productDetails = currentDetailsData?.find(
    item => item.id === productId,
  );

  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (productDetails && productDetails.images?.length > 0) {
      setSelectedImage(productDetails.images[0]);
    } else if (productSummary?.image) {
      setSelectedImage(productSummary.image);
    }
  }, [productId, productDetails, productSummary]);

  const imagesList =
    productDetails?.images ||
    (productSummary?.image ? [productSummary.image] : []);

  const handleBack = (): void => {
    navigate(-1);
  };

  const getTargetProductId = (newCapacity?: string, newColor?: string) => {
    if (!productDetails) {
      return '';
    }

    const targetCapacity = (
      newCapacity || productDetails.capacity
    ).toLowerCase();
    const targetColor = (newColor || productDetails.color).toLowerCase();

    return `${productDetails.namespaceId}-${targetCapacity}-${targetColor}`;
  };

  if (!productSummary) {
    return <h2 className="product-page__not-found">Product not found</h2>;
  }

  const isFav = isFavourite(productSummary.itemId);

  const cellTech = Array.isArray(productDetails?.cell)
    ? productDetails.cell.join(', ')
    : productDetails?.cell || '-';

  const suggestedProducts = productsData.filter(
    item =>
      item.category === productSummary.category && item.itemId !== productId,
  );

  const spliceSuggestedProducts = suggestedProducts.slice(0, 12);

  const finalProducts = spliceSuggestedProducts.sort((a, b) => b.year - a.year);

  return (
    <>
      <div className="product-page">
        <div className="product-page__nav-chain">
          <Link
            to="/"
            className="product-page__nav-link product-page__nav-link--icon"
          >
            <img
              src="./img/Home.svg"
              alt="Home"
              className="product-page__nav-icon"
            />
          </Link>

          <img
            src="./img/VectorNext.svg"
            alt=">"
            className="product-page__nav-arrow"
          />

          <Link
            to={`/${productSummary.category}`}
            className="product-page__nav-link"
          >
            {productSummary.category === 'phones' && 'Phones'}
            {productSummary.category === 'tablets' && 'Tablets'}
            {productSummary.category === 'accessories' && 'Accessories'}
          </Link>

          <img
            src="./img/VectorNext.svg"
            alt=">"
            className="product-page__nav-arrow"
          />

          <span className="product-page__nav-text">{productSummary.name}</span>
        </div>

        <div className="product-page__back-btn" onClick={handleBack}>
          <img
            src="./img/VectorBack.svg"
            alt="Back"
            className="product-page__back-icon"
          />
          <span className="product-page__back-text">Back</span>
        </div>

        <h1 className="product-page__title">{productSummary.name}</h1>

        <div className="product-page__gallery">
          <div className="product-page__main-image-container">
            {selectedImage && (
              <img
                src={`./${selectedImage}`}
                alt={productSummary.name}
                className="product-page__main-image"
              />
            )}
          </div>

          <div className="product-page__thumbnails">
            {imagesList.map((imgUrl, index) => (
              <button
                key={index}
                type="button"
                className={`product-page__thumbnail-btn ${
                  selectedImage === imgUrl
                    ? 'product-page__thumbnail-btn--active'
                    : ''
                }`}
                onClick={() => setSelectedImage(imgUrl)}
              >
                <img
                  src={`./${imgUrl}`}
                  alt={`${productSummary.name} view ${index + 1}`}
                  className="product-page__thumbnail-img"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="product-page__actions">
          <div className="product-page__colors">
            <div className="product-page__colors-header">
              <span className="product-page__label">Available colors</span>
              <span className="product-page__id">ID: {productDetails?.id}</span>
            </div>

            <div className="product-page__colors-list">
              {productDetails?.colorsAvailable?.map(color => {
                const isSelected = productDetails.color === color;
                const targetId = getTargetProductId(undefined, color);

                return (
                  <Link
                    key={color}
                    to={`/${productSummary.category}/${targetId}`}
                    preventScrollReset
                    className={`product-page__color-btn ${
                      isSelected ? 'product-page__color-btn--active' : ''
                    }`}
                    style={{
                      backgroundColor:
                        COLOR_HEX_MAP[color.toLowerCase()] || color,
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="product-page__divider" />

          <div className="product-page__capacity">
            <span className="product-page__label">Select capacity</span>
            <div className="product-page__capacity-list">
              {productDetails?.capacityAvailable?.map(cap => {
                const isSelected = productDetails.capacity === cap;
                const targetId = getTargetProductId(cap, undefined);

                return (
                  <Link
                    key={cap}
                    to={`/${productSummary.category}/${targetId}`}
                    preventScrollReset
                    className={`product-page__capacity-btn ${
                      isSelected ? 'product-page__capacity-btn--active' : ''
                    }`}
                  >
                    {cap}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="product-page__divider" />

          <div className="product-page__price-block">
            <span
              className={
                'product-page__price ' + 'product-page__price--discount'
              }
            >
              ${productSummary.price}
            </span>
            {productSummary.fullPrice && (
              <span
                className={
                  'product-page__price ' + 'product-page__price--regular'
                }
              >
                ${productSummary.fullPrice}
              </span>
            )}
          </div>

          <div className="product-page__buttons">
            <AddToCartButton
              productSummary={productSummary}
              productDetails={productDetails}
              selectedImage={selectedImage}
            />
            <button
              type="button"
              className={`product-page__favorite-btn ${
                isFav ? 'product-page__favorite-btn--active' : ''
              }`}
              aria-label="Add to favorites"
              onClick={() => toggleFavourite(productSummary.itemId)}
            >
              <img
                src={isFav ? './img/FavouritesFilled.svg' : './img/love.svg'}
                alt="Favorites"
                className="product-card__love-icon"
              />
            </button>
          </div>

          <ul className="product-page__quick-specs">
            <li className="product-page__quick-spec-item">
              <span className="product-page__quick-spec-name">Screen</span>
              <span className="product-page__quick-spec-value">
                {productDetails?.screen || productSummary.screen}
              </span>
            </li>
            <li className="product-page__quick-spec-item">
              <span className="product-page__quick-spec-name">Resolution</span>
              <span className="product-page__quick-spec-value">
                {productDetails?.resolution || '-'}
              </span>
            </li>
            <li className="product-page__quick-spec-item">
              <span className="product-page__quick-spec-name">Processor</span>
              <span className="product-page__quick-spec-value">
                {productDetails?.processor || '-'}
              </span>
            </li>
            <li className="product-page__quick-spec-item">
              <span className="product-page__quick-spec-name">RAM</span>
              <span className="product-page__quick-spec-value">
                {productDetails?.ram || productSummary.ram}
              </span>
            </li>
          </ul>
        </div>

        <div className="product-page__description">
          <h2 className="product-page__description-title1">About</h2>

          <div className="product-page__divider-tech" />

          <div className="product-page__description-content">
            {productDetails?.description?.map((item, index) => (
              <div key={index} className="product-page__description-block">
                <p className="product-page__description-title2">{item.title}</p>
                {item.text.map((paragraph, textIndex) => (
                  <p key={textIndex} className="product-page__description-text">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="product-page__tech-specs">
          <h2 className="product-page__description-title1">Tech specs</h2>

          <div className="product-page__divider-tech" />

          <ul className="product-page__quick-specs">
            <li className="product-page__quick-spec-item">
              <span className="product-page__quick-spec-name">Screen</span>
              <span className="product-page__quick-spec-value">
                {productDetails?.screen || productSummary.screen}
              </span>
            </li>
            <li className="product-page__quick-spec-item">
              <span className="product-page__quick-spec-name">Resolution</span>
              <span className="product-page__quick-spec-value">
                {productDetails?.resolution || '-'}
              </span>
            </li>
            <li className="product-page__quick-spec-item">
              <span className="product-page__quick-spec-name">Processor</span>
              <span className="product-page__quick-spec-value">
                {productDetails?.processor || '-'}
              </span>
            </li>
            <li className="product-page__quick-spec-item">
              <span className="product-page__quick-spec-name">RAM</span>
              <span className="product-page__quick-spec-value">
                {productDetails?.ram || productSummary.ram}
              </span>
            </li>
            <li className="product-page__quick-spec-item">
              <span className="product-page__quick-spec-name">Camera</span>
              <span className="product-page__quick-spec-value">
                {productDetails?.camera || '-'}
              </span>
            </li>
            <li className="product-page__quick-spec-item">
              <span className="product-page__quick-spec-name">Zoom</span>
              <span className="product-page__quick-spec-value">
                {productDetails?.zoom || '-'}
              </span>
            </li>
            <li className="product-page__quick-spec-item">
              <span className="product-page__quick-spec-name">Cell</span>
              <span className="product-page__quick-spec-value">{cellTech}</span>
            </li>
          </ul>
        </div>

        <Slider
          products={finalProducts}
          className="product-page__hotSlider"
          title="You may also like"
        />
      </div>
      <Footer className="product-page__footer" />
    </>
  );
};
