import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './ProductDetails.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProductDetails } from '../../redux/thunks/product.thunk';
import { CDN_URL } from '../../http/api';
import { ENDPOINT_GET_PRODUCT_IMAGES } from '../../http/endpoints';
import { ProductCardActions } from '../productCardActions/ProductCardActions';
import { Loader } from '../loader/Loader';
import { setSelectedProduct } from '../../redux/reducers/productsReducer';
import { Error } from '../error/Error';

export const ProductDetails = () => {
  const { isLoading, isError } = useAppSelector(
    (state) => state.productDetails,
  );
  const product = useAppSelector((state) => state.products.selectedProduct);
  const colorHexCodes = {
    black: '#E2E6E9',
    rosegold: '#b76e79',
    gold: '#FCDBC1',
    silver: '#E2E6E9',
    yellow: '#fed45b',
    green: '#006400',
    midnightgreen: '#45625c',
    spacegray: '#717378',
    white: '#fff',
    purple: '#d5d1dc',
    coral: '#FF7F50',
    red: '#8d0010',
  };

  const infoObject = {
    screen: 'Screen',
    resolution: 'Resolution',
    processor: 'Processor',
    ram: 'RAM',
    camera: 'Camera',
    zoom: 'Zoom',
    cell: 'Cell',
  };

  type ColorName = keyof typeof colorHexCodes;

  const { productId } = useParams<string>();
  const dispatch = useAppDispatch();
  const productDetails = useAppSelector((state) => state.productDetails.data);

  const images = productDetails?.images;

  const [selectedImage, setSelectedImage] = useState<string | null>(
    images && images.length > 0 ? images[0] : null,
  );

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    dispatch(getProductDetails(productId as string));
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(setSelectedProduct(productId));
  }, [productId]);

  useEffect(() => {
    if (images && images.length > 0 && !selectedImage) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  useEffect(() => {
    setSelectedImage(null);
  }, [productId]);

  const handleColorClick = (color: string) => {
    const newProductId = productId?.replace(/-[a-z]+$/, `-${color}`);

    return `/phones/${newProductId}`;
  };

  const handleCapacityClick = (capacity: string) => {
    const newProductId = productId?.replace(
      /-[0-9]+gb/,
      `-${capacity.toLowerCase()}`,
    );

    return `/phones/${newProductId}`;
  };

  const getLinkClassCapacity = (
    { isActive }: { isActive: boolean },
  ) => classNames('productDetails__capacity', {
    'productDetails__capacity--active': isActive,
  });

  const getLinkClassColor = (
    { isActive }: { isActive: boolean },
  ) => classNames('productDetails__color-circle', {
    'productDetails__color-circle--active': isActive,
  });

  const renderCharacteristics = (name: string, value?: string) => (
    <div className="productDetails__characteristics-block">
      <span className="productDetails__characteristics-element">{name}</span>
      <span className="productDetails__characteristics-value">{value}</span>
    </div>
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="productDetails">
      <h1 className="productDetails__title">{productDetails?.name}</h1>
      <div className="productDetails__container">
        <div className="productDetails__carousel">
          <div className="productDetails__allPhotos-container">
            {images?.map((imageUrl, index) => (
              <button
                type="button"
                className="productDetails__border"
                onClick={() => handleImageClick(imageUrl)}
                key={imageUrl}
              >
                <img
                  src={`${CDN_URL}/${ENDPOINT_GET_PRODUCT_IMAGES}${imageUrl}`}
                  alt={`${index + 1}`}
                  className="productDetails__image"
                />
              </button>
            ))}
          </div>
          <div>
            {selectedImage && (
              <div className="productDetails__larger-image-container">
                <img
                  src={`${CDN_URL}/${ENDPOINT_GET_PRODUCT_IMAGES}${selectedImage}`}
                  alt="Selected"
                  className="productDetails__larger-image"
                  key={selectedImage}
                />
              </div>
            )}
          </div>
        </div>

        <div className="productDetails__main-information">
          <div className="productDetails__block">
            <p className="productDetails__text">Available colors</p>
            <div className="productDetails__block-container">
              {productDetails?.colorsAvailable?.map((color) => {
                const hexCode = colorHexCodes[color as ColorName];

                return (
                  <NavLink
                    to={handleColorClick(color)}
                    key={color}
                    className={getLinkClassColor}
                    style={{ backgroundColor: hexCode }}
                  />
                );
              })}
            </div>
            <div className="productDetails__line" />
          </div>
          <div className="productDetails__block">
            <p className="productDetails__text">Select capacity</p>
            <div className="productDetails__block-container">
              {productDetails?.capacityAvailable.map((capacity) => (
                <NavLink
                  to={handleCapacityClick(capacity)}
                  key={capacity}
                  className={getLinkClassCapacity}
                >
                  {capacity}
                </NavLink>
              ))}
            </div>
            <div className="productDetails__line" />
          </div>
          <div className="productDetails__action-block">
            <div className="productDetails__price-info">
              <h1 className="productDetails__price">
                $
                {productDetails?.priceDiscount}
              </h1>
              <p className="productDetails__price-regular">
                $
                {productDetails?.priceRegular}
              </p>
            </div>
            <ProductCardActions product={product} />
            <div className="productDetails__characteristics">
              {renderCharacteristics('Screen', productDetails?.screen)}
              {renderCharacteristics('Resolution', productDetails?.resolution)}
              {renderCharacteristics('Processor', productDetails?.processor)}
              {renderCharacteristics('RAM', productDetails?.ram)}
            </div>
          </div>
        </div>
      </div>
      <div className="productDetails__aditional">
        <div
          className="productDetails__about"
          data-cy="productDescription"
        >
          <h2 className="productDetails__aditional-title">About</h2>
          <div className="productDetails__line" />
          <div className="productDetails__description">
            {productDetails?.description.map((section, sectionIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`section-${sectionIndex}`}>
                <h3 className="productDetails__description-title">
                  {section.title}
                </h3>
                {section.text.map((text) => (
                  <p className="productDetails__description-text" key={text}>
                    {text}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="productDetails__tech">
          <h2 className="productDetails__aditional-title">Tech specs</h2>
          <div className="productDetails__line" />
          {(Object.keys(infoObject) as (keyof typeof infoObject)[]).map(
            (key) => (
              <div key={key} className="productDetails__info-item">
                <span className="productDetails__info-key">
                  {infoObject[key]}
                </span>
                <span className="productDetails__info-value">
                  {key === 'cell'
                    ? productDetails?.cell?.join(', ')
                    : productDetails?.[key]}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};
