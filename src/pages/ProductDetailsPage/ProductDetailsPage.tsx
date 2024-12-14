import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../../state/state';
import { getProductById } from '../../api/api';
import {
  AddToCartButton,
  AddToFavButton,
  BackButton,
  Breadcrumbs,
  HeartFilledIcon,
  HeartIcon,
  Loader,
} from '../../components';
import { ProductDetails } from '../../types';
import './ProductDetailsPage.scss';
import classNames from 'classnames';
import { colorMap } from './helpers';

type Params = {
  productId: string;
};

export const ProductDetailsPage: React.FC = () => {
  const { state } = useStateContext();
  const { productId } = useParams<Params>();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

  const product = state.products.find(item => item.itemId === productId);

  const isInCart = state.cart.find(item => item.itemId === product?.itemId);
  const isFavourite = state.favourites.find(
    fav => fav.itemId === product?.itemId,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) {
      setError('Product ID is missing');
      setLoading(false);

      return;
    }

    const productCategory = state.products.find(
      item => item.itemId === productId,
    )?.category;

    if (!productCategory) {
      setError('Category is missing');
      setLoading(false);

      return;
    }

    const loadProduct = async () => {
      try {
        const data = await getProductById(productId, productCategory);

        setProductDetails(data);
        setSelectedImage(data.images[0]);
        setSelectedColor(data.color);
        setSelectedCapacity(data.capacity.toLowerCase());
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [state.products, productId]);

  const handleColorChange = async (color: string) => {
    if (!productDetails) {
      return;
    }

    const newProductId = `${productDetails.namespaceId}-${selectedCapacity}-${color.replace(/\s+/g, '-')}`;

    navigate(`/${productDetails.category}/${newProductId}`);
  };

  const handleCapacityChange = async (capacity: string) => {
    if (!productDetails) {
      return;
    }

    const newProductId = `${productDetails.namespaceId}-${capacity}-${selectedColor?.replace(/\s+/g, '-').toLowerCase()}`;

    navigate(`/${productDetails.category}/${newProductId}`);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!productDetails) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details">
      <Breadcrumbs
        productName={productDetails.name}
        className="product-details__breadcrumbs"
      />
      <BackButton className="product-details__back-button" />
      <h1 className="product-details__title typography__h2">
        {productDetails.name}
      </h1>

      {/* #region main */}
      <div className="product-details__main">
        <div className="product-details__photos">
          <div className="product-details__photos-preview">
            <ul className="product-details__photos-preview-list">
              {productDetails.images.map(image => (
                <li
                  key={image}
                  className={classNames(
                    'product-details__photos-preview-item ',
                    { selected: selectedImage === image },
                  )}
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image} alt={productDetails.name} />
                </li>
              ))}
            </ul>
          </div>
          <div className="product-details__photos-main">
            <img
              src={selectedImage || productDetails.images[0]}
              alt={productDetails.name}
            />
          </div>
        </div>

        <div className="product-details__info">
          {/* 1. colors */}
          <div className="product-details__colors">
            <div className="product-details__colors-wrapper">
              <span
                className={classNames(
                  'product-details__colors-title typography__small-text',
                )}
              >
                Available colors
              </span>
              <span className="product-details__product-id">
                {`ID: ${product?.id}`}
              </span>
            </div>
            <ul className="product-details__colors-list">
              {productDetails.colorsAvailable.map(color => (
                <li key={color} className="product-details__colors-item">
                  <button
                    className={`product-details__colors-button ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => handleColorChange(color)}
                  >
                    <div
                      className="product-details__colors-inner"
                      style={{ backgroundColor: colorMap[color] }}
                    ></div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* 2. capacity */}
          <div className="product-details__capacity">
            <p
              className={classNames(
                'product-details__capacity-title typography__small-text',
              )}
            >
              Select capacity
            </p>
            <ul className="product-details__capacity-list">
              {productDetails.capacityAvailable.map(capacity => (
                <li key={capacity} className="product-details__capacity-item">
                  <button
                    className={classNames(
                      'product-details__capacity-button typography__body',
                      { selected: capacity === productDetails.capacity },
                    )}
                    onClick={() => handleCapacityChange(capacity.toLowerCase())}
                  >
                    {capacity}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* 3. price */}
          <div className="product-details__price">
            <h2 className="product-details__price--discount">
              ${productDetails.priceDiscount}
            </h2>
            <h2 className="product-details__price--regular">
              ${productDetails.priceRegular}
            </h2>
          </div>
          {/* 4. buttons */}
          <div className="product-details__actions">
            {product && (
              <AddToCartButton product={product} isInCart={!!isInCart}>
                {isInCart ? 'Added to cart' : 'Add to cart'}
              </AddToCartButton>
            )}
            {product && (
              <AddToFavButton product={product} isFavourite={!!isFavourite}>
                {isFavourite ? <HeartFilledIcon /> : <HeartIcon />}
              </AddToFavButton>
            )}
          </div>
          {/* 5. main tech specs */}
          <div className="product-details__specs--main">
            <ul className="product-details__specs-list">
              <li className="product-details__specs-item">
                <span
                  className={classNames(
                    'product-details__specs-property typography__small-text',
                  )}
                >
                  Screen
                </span>
                <span className="product-details__specs-value">
                  {productDetails.screen}
                </span>
              </li>
              <li className="product-details__specs-item">
                <span
                  className={classNames(
                    'product-details__specs-property typography__small-text',
                  )}
                >
                  Resolution
                </span>
                <span className="product-details__specs-value">
                  {productDetails.resolution}
                </span>
              </li>
              <li className="product-details__specs-item">
                <span
                  className={classNames(
                    'product-details__specs-property typography__small-text',
                  )}
                >
                  Processor
                </span>
                <span className="product-details__specs-value">
                  {productDetails.processor}
                </span>
              </li>
              <li className="product-details__specs-item">
                <span
                  className={classNames(
                    'product-details__specs-property typography__small-text',
                  )}
                >
                  RAM
                </span>
                <span className="product-details__specs-value">
                  {productDetails.ram}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* #endregion main */}

      {/* #region additional */}
      <div className="product-details__additional">
        <div className="product-details__about">
          <h3 className="product-details__about-title typography__h3">About</h3>
          <div className="product-details__about-description">
            <ul className="product-details__about-list">
              {productDetails.description.map(item => (
                <li key={item.title} className="product-details__about-item">
                  <h4
                    className={classNames(
                      'product-details__about-item-title typography__h4',
                    )}
                  >
                    {item.title}
                  </h4>
                  <p
                    className={classNames(
                      'product-details__about-item-content typography__body',
                    )}
                  >
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="product-details__tech-specs">
          <h3 className="product-details__tech-specs-title typography__h3">
            Tech specs
          </h3>
          <ul className="product-details__tech-specs-list">
            {productDetails.screen && (
              <li className="product-details__tech-specs-item">
                <span
                  className={classNames('product-details__tech-specs-property')}
                >
                  Screen
                </span>
                <span className="product-details__tech-specs-value">
                  {productDetails.screen}
                </span>
              </li>
            )}
            {productDetails.resolution && (
              <li className="product-details__tech-specs-item">
                <span
                  className={classNames(
                    'product-details__tech-specs-property',
                    'typography__small-text',
                  )}
                >
                  Resolution
                </span>
                <span className="product-details__tech-specs-value">
                  {productDetails.resolution}
                </span>
              </li>
            )}
            {productDetails.processor && (
              <li className="product-details__tech-specs-item">
                <span
                  className={classNames(
                    'product-details__tech-specs-property',
                    'typography__small-text',
                  )}
                >
                  Processor
                </span>
                <span className="product-details__tech-specs-value">
                  {productDetails.processor}
                </span>
              </li>
            )}
            {productDetails.ram && (
              <li className="product-details__tech-specs-item">
                <span
                  className={classNames(
                    'product-details__tech-specs-property',
                    'typography__small-text',
                  )}
                >
                  RAM
                </span>
                <span className="product-details__tech-specs-value">
                  {productDetails.ram}
                </span>
              </li>
            )}
            {productDetails.camera && (
              <li className="product-details__tech-specs-item">
                <span
                  className={classNames(
                    'product-details__tech-specs-property',
                    'typography__small-text',
                  )}
                >
                  Camera
                </span>
                <span className="product-details__tech-specs-value">
                  {productDetails.camera}
                </span>
              </li>
            )}
            {productDetails.zoom && (
              <li className="product-details__tech-specs-item">
                <span
                  className={classNames(
                    'product-details__tech-specs-property',
                    'typography__small-text',
                  )}
                >
                  Zoom
                </span>
                <span className="product-details__tech-specs-value">
                  {productDetails.zoom}
                </span>
              </li>
            )}
            {productDetails.cell && (
              <li className="product-details__tech-specs-item">
                <span
                  className={classNames(
                    'product-details__tech-specs-property',
                    'typography__small-text',
                  )}
                >
                  Cell
                </span>
                <span className="product-details__tech-specs-value cell">
                  {productDetails.cell.join(', ')}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* #endregion additional */}
    </div>
  );
};
