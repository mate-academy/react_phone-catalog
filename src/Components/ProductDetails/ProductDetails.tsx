import React, {
  useEffect, useState, useContext, useMemo,
} from 'react';
import {
  Link, NavLink, useLocation, useParams,
} from 'react-router-dom';
import cn from 'classnames';
import { getProductDetails, getSuggestedProducts } from '../../api/products';
import { ProductDetailsType } from '../../types/productDetailsType';
import { BackLink } from '../BackLink/BackLink';
import './ProductDetails.scss';
import { BASE_URL } from '../../utils/fetchClient';
import { ProductList } from '../ProductCard/ProductList';
import { Product } from '../../types/product';
import { ProductContext } from '../../contexts/ProductContext';
import { ActionButtonsDetail } from '../AddFavourite/ActionButtonsDetail';
import { Color, Colors } from './colors';

export const ProductDetails = () => {
  const location = useLocation();
  const { products } = useContext(ProductContext);
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState<ProductDetailsType>();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedCapacity, setSelectedCapacity] = useState<string>();

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
  };

  const handleSelectCapacity = (capacity: string) => {
    setSelectedCapacity(capacity);
  };

  const handleModalOpen = (image: string) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    getSuggestedProducts().then(setRandomProducts);
  }, []);

  const currentProduct: Product = useMemo(() => {
    return products.find(product => product.itemId === productId) as Product || {} as Product;
  }, [productId, products]);

  useEffect(() => {
    if (productId) {
      getProductDetails(productId)
        .then((response) => {
          setProductDetails(response);

          if (response && response.images && response.images.length > 0) {
            setSelectedImage(response.images[0]);
          }
        });
    }
  }, [productId]);

  return (
    <div className="product-details">
      <div className="product-details-container">
        <BackLink text="Phones" />
        <div className="product-details-arrow" />
        <h1 className="product-details__subtitle">{`${productDetails?.name} (iMT9G2FS/A)`}</h1>
      </div>
      <Link
        className="product-details-back"
        to="/"
      >
        Back
      </Link>
      <h1 className="product-details__name">{`${productDetails?.name} (iMT9G2FS/A)`}</h1>
      <div className="product-details__mobile-container">
        <div>
          <div className="product-details-images-container">
            {productDetails?.images && (
              <div className="product-details-images">
                {productDetails.images.map((image) => (
                  <img
                    className={cn('product-details-image',
                      { 'product-details-image-active': image === selectedImage })}
                    key={image}
                    src={`${BASE_URL}/${image}`}
                    alt="Product"
                    onClick={() => handleModalOpen(image)}
                  />
                ))}
              </div>
            )}
            <img className="product-details-image_selected" src={`${BASE_URL}/${selectedImage}`} alt={selectedImage} />
          </div>
        </div>
        <div>
          <div
            className="product-details-color-container"
          >
            <h1 className="product-details__subtitle">Available colors</h1>
            <div className="product-details__color-container">
              {productDetails?.colorsAvailable.map((color) => (
                <NavLink
                  to={{ pathname: location.pathname.replace(productDetails.color, color) }}
                  key={color}
                >
                  <span
                    className={cn('product-details__color-circle', {
                      'product-details__color-circle-active': color === selectedColor,
                    })}
                    style={{ backgroundColor: Colors[color as Color] }}
                    onClick={() => handleSelectColor(color)}
                  />
                </NavLink>
              ))}
            </div>
          </div>
          <div
            // className='product-details-color-container'
            className="product-details-capacity-container"
          >
            <h1 className="product-details__subtitle">
              Select capacity
            </h1>
            <div className="product-details__capacity-container">
              {productDetails?.capacityAvailable.map((capacity) => (
                <NavLink
                  // to={{pathname: location.pathname.replace(productDetails.capacity, capacity)}}
                  to={{
                    pathname: location.pathname.replace(
                      new RegExp(`${productDetails?.capacity}$`),
                      capacity,
                    ),
                  }}
                  key={capacity}
                  className={cn('product-details__capacity', {
                    'product-details__capacity-active': capacity === selectedCapacity,
                  })}
                  onClick={() => handleSelectCapacity(capacity)}
                >
                  <span>
                    {capacity}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="product-details__price-container">
            <h1 className="product-details__price">{`$${productDetails?.priceDiscount}`}</h1>
            <h1 className="product-details__price-regular">{`$${productDetails?.priceRegular}`}</h1>
          </div>
          <ActionButtonsDetail product={currentProduct} />
          <div className="product-details__specs-container">
            <div className="product-details__characteristic-container">
              <h2 className="product-details__characteristic_small">Screen</h2>
              <h2 className="product-details__value_small">
                {productDetails?.screen}
              </h2>
            </div>
            <div className="product-details__characteristic-container">
              <h2 className="product-details__characteristic_small">Resolution</h2>
              <h2 className="product-details__value_small">
                {productDetails?.resolution}
              </h2>
            </div>
            <div className="product-details__characteristic-container">
              <h2 className="product-details__characteristic_small">Processor</h2>
              <h2 className="product-details__value_small">
                {productDetails?.processor}
              </h2>
            </div>
            <div className="product-details__characteristic-container">
              <h2 className="product-details__characteristic_small">RAM</h2>
              <h2 className="product-details__value_small">{productDetails?.ram}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="product-details__main-container">
        <div>
          <h1 className="product-details__main-title">About</h1>
          <div className="product-details__paragraph-container">
            {productDetails?.description.map((detail, index) => (
              <React.Fragment key={index}>
                <h1 className="product-details__title">{detail.title}</h1>
                <p className="product-details__paragraph">
                  {detail.text}
                </p>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="product-details__characteristics-container">
          <h1 className="product-details__main-title">Tech specs</h1>
          <div
            className="
            product-details__paragraph-container
            product-details__paragraph-container_second"
          >
            <div className="product-details__characteristic-container">
              <h2 className="product-details__characteristic">Screen</h2>
              <h2 className="product-details__value">
                {productDetails?.screen}
              </h2>
            </div>
            <div className="product-details__characteristic-container">
              <h2 className="product-details__characteristic">Resolution</h2>
              <h2 className="product-details__value">
                {productDetails?.resolution}
              </h2>
            </div>
            <div className="product-details__characteristic-container">
              <h2 className="product-details__characteristic">Processor</h2>
              <h2 className="product-details__value">
                {productDetails?.processor}
              </h2>
            </div>
            <div className="product-details__characteristic-container">
              <h2 className="product-details__characteristic">RAM</h2>
              <h2 className="product-details__value">{productDetails?.ram}</h2>
            </div>
            <div className="product-details__characteristic-container">
              <h2 className="product-details__characteristic">
                Built in memory
              </h2>
              <h2 className="product-details__value">
                {productDetails?.capacityAvailable}
              </h2>
            </div>
            <div className="product-details__characteristic-container">
              <h2 className="product-details__characteristic">Camera</h2>
              <h2 className="product-details__value">{`${productDetails?.camera}`}</h2>
            </div>
            <div className="product-details__characteristic-container">
              <h2 className="product-details__characteristic">Zoom</h2>
              <h2 className="product-details__value">{productDetails?.zoom}</h2>
            </div>
            <div className="product-details__characteristic-container">
              <h2 className="product-details__characteristic">Cell</h2>
              <h2 className="product-details__value">
                {productDetails?.cell.join(', ')}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <ProductList products={randomProducts} title="You may also like" />
    </div>
  );
};
