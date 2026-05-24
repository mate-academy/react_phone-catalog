import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductById, getSuggestedProducts } from '../../utils/ServiceData';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { ProductDetails } from '../../types/ProductDetails';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsFavorite, toggleFavorites } from '../../features/favorites';
import {
  addToCart,
  removeFromCart,
  selectIsAddedToCart,
} from '../../features/cart';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductSlider/ProductSlider';

const colorMap: Record<string, string> = {
  black: '#201D24',
  green: '#364935',
  blue: '#215E7C',
  yellow: '#f3d060',
  white: '#FBF7F4',
  purple: '#B8AFE6',
  red: '#A50011',
  pink: '#FAE0D8',
  gold: '#F9E5C9',
  silver: '#F5F5F0',
  grey: '#535150',
  'space-gray': '#535150',
  spacegray: '#535150',
  'space gray': '#535150',
  midnightgreen: '#4e5851',
  midnight: '#171E27',
  starlight: '#F9F3EE',
  roseGold: '#fad7bd',
  coral: '#ee7762',
  deeppurple: '#594F63',
  'deep purple': '#594F63',
  'deep-purple': '#594F63',
  'space-black': '#403E3D',
  spaceblack: '#403E3D',
  'space black': '#403E3D',
  alpinegreen: '#505F4E',
  'alpine-green': '#505F4E',
  'alpine green': '#505F4E',
  sierrablue: '#9BB5CE',
  'sierra blue': '#9BB5CE',
  'sierra-blue': '#9BB5CE',
  graphite: '#5C5B57',
};

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<ProductDetails[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedCapacity, setSelectedCapacity] = useState<string>();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [productId]);

  const isFav = useAppSelector(state =>
    selectIsFavorite(state, product?.id || ''),
  );
  const isAddedToCart = useAppSelector(state =>
    selectIsAddedToCart(state, product?.id || ''),
  );

  const loadData = useCallback(async () => {
    if (!productId) {
      return;
    }

    setIsError(false);
    setIsLoading(true);

    try {
      const foundProduct = await getProductById(productId);

      if (foundProduct) {
        setProduct(foundProduct);

        setSelectedImage(foundProduct.images[0]);

        const suggested = await getSuggestedProducts(foundProduct.id);

        setSuggestedProducts(suggested);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.color);
      setSelectedCapacity(product.capacity);
    }
  }, [product]);

  const getProductsForRedux = (details: ProductDetails | null): Product => {
    return {
      id: 0,
      itemId: details?.id || '',
      category: details?.category as 'phones' | 'tablets' | 'accessories',
      name: details?.name || '',
      fullPrice: details?.priceRegular || 0,
      price: details?.priceDiscount || 0,
      screen: details?.screen || '',
      capacity: details?.capacity || '',
      color: details?.color || '',
      ram: details?.ram || '',
      year: 2023,
      image: details?.images[0] || '',
    };
  };

  const handleToggleFavorites = () => {
    dispatch(toggleFavorites(getProductsForRedux(product)));
  };

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      dispatch(addToCart(getProductsForRedux(product)));
    } else if (isAddedToCart) {
      dispatch(removeFromCart(getProductsForRedux(product).itemId));
    }
  };

  const handleTechSpecsChange = (newColor: string, newCapacity: string) => {
    const baseId =
      product?.namespaceId || product?.id.split('-').slice(0, -2).join('-');

    const normalizedColor = newColor.replace(/ /g, '-').toLowerCase();
    const normalizedCapacity = newCapacity.toLowerCase();

    const newId = `${baseId}-${normalizedCapacity}-${normalizedColor}`;

    navigate(`/${product?.category}/${newId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage onRetry={loadData} />;
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h1 className="product-not-found__title">Product not found</h1>
        <img
          src="/img/product-not-found.png"
          alt="product-not-found"
          className="product-not-found__image"
        />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="product-details">
        <div className="product-details__breadcrumbs">
          <Link to="/">
            <div className="home-icon"></div>
          </Link>

          <div className="arrow-icon"></div>

          <Link
            to={`/${product.category}`}
            className="product-details__breadcrumbs-link"
          >
            {product.category}
          </Link>

          <div className="arrow-icon"></div>

          <span className="product-details__breadcrumbs-text">
            {product.name}
          </span>
        </div>

        <div className="product-details__back-btn" onClick={() => navigate(-1)}>
          <div className="product-details__back-btn-icon"></div>
          <p className="product-details__back-btn-text">Back</p>
        </div>

        <h1 className="product-details__title">{product.name}</h1>

        <div className="product-details__top">
          <div className="product-details__gallery">
            <div className="product-details__main-image">
              <img
                src={`./${selectedImage}`}
                alt={product.name}
                className="product-details__main-image-img"
              />
            </div>

            <div className="product-details__thumbnails">
              {product.images.map(img => (
                <div
                  key={img}
                  className={cn('product-details__thumbnail', {
                    'is-active': selectedImage === img,
                  })}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={`./${img}`}
                    alt="thumbnail"
                    className="product-details__thumbnail-image"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="product-details__options">
            <div className="product-details__selector">
              <div className="product-details__label">Available colors</div>
              <div className="product-details__colors-list">
                {product.colorsAvailable.map(color => (
                  // eslint-disable-next-line jsx-a11y/label-has-associated-control
                  <label
                    key={color}
                    className={cn('product-details__color-btn', {
                      'is-active': color === selectedColor,
                    })}
                    style={{ backgroundColor: colorMap[color] || color }}
                    title={color}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      checked={color === selectedColor}
                      onChange={() => {
                        if (selectedCapacity) {
                          handleTechSpecsChange(color, selectedCapacity);
                        }
                      }}
                      className="product-details__radio-input"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="product-details__selector">
              <div className="product-details__label">Select capacity</div>
              <div className="product-details__capacity-list">
                {product.capacityAvailable.map(cap => (
                  <label
                    key={cap}
                    className={cn('product-details__capacity-btn', {
                      'is-active': cap === selectedCapacity,
                    })}
                  >
                    <input
                      type="radio"
                      name="capacity"
                      value={cap}
                      checked={cap === selectedCapacity}
                      onChange={() => {
                        if (selectedColor) {
                          handleTechSpecsChange(selectedColor, cap);
                        }
                      }}
                      className="product-details__radio-input"
                    />
                    {cap}
                  </label>
                ))}
              </div>
            </div>

            <div className="product-details__price-block">
              <span className="product-details__price-discount">
                ${product.priceDiscount}
              </span>
              <span className="product-details__price-regular">
                ${product.priceRegular}
              </span>
            </div>

            <div className="product-details__actions">
              <button
                className={cn('product-details__actions-btn-add', {
                  'product-details__actions-btn-add--active': isAddedToCart,
                })}
                onClick={handleAddToCart}
              >
                {isAddedToCart ? 'Added to cart' : 'To cart'}
              </button>

              <button
                className={cn('product-details__actions-btn-fav', {
                  'product-details__actions-btn-fav--active': isFav,
                })}
                onClick={handleToggleFavorites}
              />
            </div>

            <div className="product-details__specs-short">
              <div className="product-details__specs-short-spec-row">
                <span className="product-details__specs-short-spec-name">
                  Screen
                </span>
                <span className="product-details__specs-short-spec-value">
                  {product.screen}
                </span>
              </div>
              <div className="product-details__specs-short-spec-row">
                <span className="product-details__specs-short-spec-name">
                  Resolution
                </span>
                <span className="product-details__specs-short-spec-value">
                  {product.resolution}
                </span>
              </div>
              <div className="product-details__specs-short-spec-row">
                <span className="product-details__specs-short-spec-name">
                  Processor
                </span>
                <span className="product-details__specs-short-spec-value">
                  {product.processor}
                </span>
              </div>
              <div className="product-details__specs-short-spec-row">
                <span className="product-details__specs-short-spec-name">
                  RAM
                </span>
                <span className="product-details__specs-short-spec-value">
                  {product.ram}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details__bottom">
          <div className="product-details__about">
            <h2 className="section-title">About</h2>
            {product.description.map((section, i) => (
              <div key={i} className="product-details__about-section">
                <h3 className="product-details__about-title">
                  {section.title}
                </h3>
                <div className="product-details__about-description">
                  {section.text.map((desc, j) => (
                    <p
                      key={j}
                      className="product-details__about-description-text"
                    >
                      {desc}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="product-details__tech-specs">
            <h2 className="section-title">Tech specs</h2>
            <div className="product-details__tech-specs-spec-list">
              <div className="product-details__tech-specs-spec-row">
                <span className="product-details__tech-specs-spec-name">
                  Screen
                </span>
                <span className="product-details__tech-specs-spec-value">
                  {product.screen}
                </span>
              </div>
              <div className="product-details__tech-specs-spec-row">
                <span className="product-details__tech-specs-spec-name">
                  Resolution
                </span>
                <span className="product-details__tech-specs-spec-value">
                  {product.resolution}
                </span>
              </div>
              <div className="product-details__tech-specs-spec-row">
                <span className="product-details__tech-specs-spec-name">
                  Processor
                </span>
                <span className="product-details__tech-specs-spec-value">
                  {product.processor}
                </span>
              </div>
              <div className="product-details__tech-specs-spec-row">
                <span className="product-details__tech-specs-spec-name">
                  RAM
                </span>
                <span className="product-details__tech-specs-spec-value">
                  {product.ram}
                </span>
              </div>
              <div className="product-details__tech-specs-spec-row">
                <span className="product-details__tech-specs-spec-name">
                  Memory
                </span>
                <span className="product-details__tech-specs-spec-value">
                  {product.capacity}
                </span>
              </div>
              <div className="product-details__tech-specs-spec-row">
                <span className="product-details__tech-specs-spec-name">
                  Camera
                </span>
                <span className="product-details__tech-specs-spec-value">
                  {product.camera}
                </span>
              </div>
              <div className="product-details__tech-specs-spec-row">
                <span className="product-details__tech-specs-spec-name">
                  Zoom
                </span>
                <span className="product-details__tech-specs-spec-value">
                  {product.zoom}
                </span>
              </div>
              <div className="product-details__tech-specs-spec-row">
                <span className="product-details__tech-specs-spec-name">
                  Cell
                </span>
                <span className="product-details__tech-specs-spec-value">
                  {product.cell.join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <ProductsSlider
          products={suggestedProducts}
          title={'You may also like'}
        />
      </div>
    </div>
  );
};
