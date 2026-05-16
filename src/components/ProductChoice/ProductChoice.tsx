import React, { useCallback, useMemo, useState } from 'react';
import styles from './ProductChoice.module.scss';
import '../../styles/App.scss';
import ColorButton from '../ColorButton';
import PrimaryButton from '../PrimaryButton';
import FavoriteButton from '../FavoriteButton';
import PriceBig from '../PriceBig';
import { ProductDetails } from '../../store/slices/productSlice';
import { Product } from '../../types/products';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

type ProductChoiceProps = {
  product: ProductDetails;
  currentProduct: Product;
};

const ProductChoice: React.FC<ProductChoiceProps> = ({
  product,
  currentProduct,
}) => {
  const { products } = useSelector((state: RootState) => state.product);
  const [currentCapacity, setCurrentCapacity] = useState<string>(
    product.capacity,
  );
  const [currentColor, setCurrentColor] = useState<string>(product.color);

  const initialImage =
    product && product.images && product.images.length > 0
      ? product.images[0]
      : '';
  const [mainProductImage, setMainProductImage] = useState(initialImage);

  const productId = useMemo(() => {
    return currentProduct.id.toString().padStart(6, '0');
  }, [currentProduct.id]);

  function handleImageClick(image: string) {
    setMainProductImage(image);
  }

  const productChosen = useMemo(() => {
    return products?.filter(item => {
      return item.namespaceId === product?.namespaceId;
    });
  }, [product, products]);

  const getLinkForCapacity = useCallback(
    (capacity: string) => {
      return productChosen?.find(
        item => item.capacity === capacity && item.color === currentColor,
      );
    },
    [productChosen, currentColor],
  );

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }

  const getLinkForColor = useCallback(
    (color: string) => {
      return productChosen?.find(
        item => item.color === color && item.capacity === currentCapacity,
      );
    },
    [productChosen, currentCapacity],
  );

  return (
    <section className={`${styles['product-choice']}`}>
      <div className={styles['product-choice__photos']}>
        <img
          key={mainProductImage}
          src={`./${mainProductImage}`}
          alt=""
          className={styles['product-choice__main-photo']}
        />
        <div className={styles['product-choice__nav']}>
          {product.images.map(image => {
            return (
              <img
                key={image}
                src={`./${image}`}
                alt=""
                className={classNames(styles['product-choice__nav-photo'], {
                  [styles['product-choice__nav-photo--active']]:
                    image === mainProductImage,
                })}
                onClick={() => handleImageClick(image)}
              />
            );
          })}
        </div>
      </div>
      <div className={styles['product-choice__details']}>
        <div className={styles['product-choice__details-top']}>
          <div className={styles['product-choice__details-top-colors']}>
            <p className={styles['product-choice__details-top-title']}>
              Available colors
            </p>
            <div className={styles['product-choice__details-top-list']}>
              {product.colorsAvailable.map(item => {
                return (
                  <NavLink
                    to={`/${product.category}/${getLinkForColor(item)?.id}`}
                    key={item}
                    onClick={() => {
                      setCurrentColor(item);
                      handleScrollToTop();
                    }}
                  >
                    <ColorButton color={item} currentColor={product.color} />
                  </NavLink>
                );
              })}
            </div>
          </div>
          <p className={styles['product-choice__details-top-id']}>
            ID: {productId}
          </p>
        </div>
        <div className={styles['product-choice__details-capacity']}>
          <p className={styles['product-choice__details-capacity-title']}>
            Select capacity
          </p>
          <div className={styles['product-choice__details-capacity-buttons']}>
            {product.capacityAvailable.map(capacity => {
              return (
                <NavLink
                  to={`/${product.category}/${getLinkForCapacity(capacity)?.id}`}
                  key={capacity}
                  className={classNames(
                    styles['product-choice__details-capacity-button'],
                    {
                      [styles[
                        'product-choice__details-capacity-button--active'
                      ]]: capacity === product.capacity,
                    },
                  )}
                  onClick={() => {
                    setCurrentCapacity(capacity);
                    handleScrollToTop();
                  }}
                >
                  {capacity}
                </NavLink>
              );
            })}
          </div>
        </div>

        <div className={styles['product-choice__details-order']}>
          <div className={styles['product-choice__details-price']}>
            <PriceBig> ${product.priceDiscount}</PriceBig>
            <h3 className={styles['product-choice__details-price-old']}>
              ${product.priceRegular}
            </h3>
          </div>

          <div className={styles['product-choice__details-buttons']}>
            <PrimaryButton product={currentProduct}>Add to cart</PrimaryButton>
            <FavoriteButton product={currentProduct} productId={product.id} />
          </div>
        </div>

        <div className={styles['product-choice__details-bottom']}>
          <div className={styles['product-choice__details-info']}>
            <div className={`${styles['product-choice__details-info-row']} `}>
              <span className={styles['product-choice__details-info-title']}>
                Screen
              </span>
              <span
                className={styles['product-choice__details-info-description']}
              >
                {product.screen}
              </span>
            </div>
            <div className={`${styles['product-choice__details-info-row']} `}>
              <span className={styles['product-choice__details-info-title']}>
                Resolution
              </span>
              <span
                className={styles['product-choice__details-info-description']}
              >
                {product.resolution}
              </span>
            </div>
            <div className={`${styles['product-choice__details-info-row']} `}>
              <span className={styles['product-choice__details-info-title']}>
                Processor
              </span>
              <span
                className={styles['product-choice__details-info-description']}
              >
                {product.processor}
              </span>
            </div>
            <div className={`${styles['product-choice__details-info-row']} `}>
              <span className={styles['product-choice__details-info-title']}>
                RAM
              </span>
              <span
                className={styles['product-choice__details-info-description']}
              >
                {product.ram}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductChoice;
