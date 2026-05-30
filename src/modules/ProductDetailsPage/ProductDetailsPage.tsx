import React, { useEffect, useMemo, useState } from 'react';
import { ProductDetails } from '../shared/types/ProductDetails';

import { getProductById, getProducts } from '../shared/utils/api';
import { Loader } from '../shared/components/Loader';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from './ProductDetails.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ButtonBack } from '../shared/components/ButtonBack';
import { ProductColors } from './ProductColors';
import { Product } from '../shared/types/Product';
import { ProductImages } from './ProductImages';
import { ProductCapacity } from './ProductCapacity/ProductCapacity';
import classNames from 'classnames';
import { useCart } from '../shared/contexts/CartContext';
import { Icon } from '../shared/components/Icon/Icon';
import { icons } from '../shared/constants/icons';
import { useFavorites } from '../shared/contexts/FavouritesContext';
import { ProductAbout } from './ProductAbout/ProductAbout';
import { ProductSpecs } from './ProductSpecs/ProductSpecs';
import { ProductsSlider } from '../shared/components/ProductsSlider';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{
    productId: string;
  }>();
  const location = useLocation();
  const currentCategory = useLocation().pathname.split('/')[1];
  const [products, setProducts] = useState<Product[]>([]);
  const [productDetails, setProductDetails] = useState<ProductDetails>();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [productIdNumber, setProductIdNumber] = useState<number | null>(null);

  const { cart, addToCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(String(productIdNumber));

  const navigate = useNavigate();

  const categoryProducts = useMemo(() => {
    return products.filter(product => product.category === currentCategory);
  }, [products, currentCategory]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId || !currentCategory) {
        return;
      }

      const fetchedProduct = await getProductById(productId, currentCategory);
      const allProducts = await getProducts();

      if (!fetchedProduct) {
        return;
      }

      const fixedProduct = {
        ...fetchedProduct,
        images: fetchedProduct.images.map(img => `./${img}`),
      };

      if (!fetchedProduct) {
        return;
      }

      const foundProduct = allProducts.find(item => item.itemId === productId);

      if (foundProduct) {
        setProductIdNumber(foundProduct.id);
      }

      setProducts(allProducts);
      setProductDetails(fixedProduct);
      setSelectedColor(fixedProduct.color);
      setSelectedCapacity(fixedProduct.capacity);
    };

    fetchProduct();
  }, [productId, currentCategory]);

  useEffect(() => {
    const isProductInCart = cart.some(
      item => item.id === String(productIdNumber),
    );

    setIsInCart(isProductInCart);
  }, [cart, productIdNumber]);

  const handleColorChange = (color: string) => {
    if (!productDetails || !selectedCapacity) {
      return;
    }

    const newProductId = `${productDetails.namespaceId}-${selectedCapacity.toLowerCase()}-${color.replace(/\s+/g, '-').toLowerCase()}`;

    navigate(`/${productDetails.category}/${newProductId}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleCapacityChange = (capacity: string) => {
    if (!productDetails || !selectedColor) {
      return;
    }

    const newProductId = `${productDetails.namespaceId}-${capacity.toLowerCase()}-${selectedColor.replace(/\s+/g, '-').toLowerCase()}`;

    navigate(`/${productDetails.category}/${newProductId}`);
  };

  const handleAddToCart = () => {
    if (productDetails) {
      const productToAdd = products.find(
        product => product.id === productIdNumber,
      );

      if (productToAdd) {
        addToCart(productToAdd);
      }
    }
  };

  if (!productDetails) {
    return <Loader />;
  }

  return (
    <div className={styles.detail}>
      <Breadcrumbs />
      <ButtonBack />
      <h2 className={styles.detail__title}>{productDetails.name}</h2>
      <div className={styles.detail__wrapper}>
        <ProductImages images={productDetails.images} />

        <div className={styles.detail__main}>
          <ProductColors
            onColorSelect={handleColorChange}
            productDetails={productDetails}
            selectedColor={selectedColor}
            productId={productIdNumber}
          />
          <span className={styles.detail__line} />
          <ProductCapacity
            productDetails={productDetails}
            onCapacitySelect={handleCapacityChange}
          />
          <span className={styles.detail__line} />
          <div className={styles.detail__info}>
            <div className={styles.detail__price}>
              <span className={styles['detail__price-regular']}>
                ${productDetails.priceDiscount}
              </span>
              <span className={styles['detail__price-discount']}>
                ${productDetails.priceRegular}
              </span>
            </div>
            <div className={styles.detail__buttons}>
              <button
                className={classNames(
                  styles.detail__button,
                  styles['detail__button-cart'],
                  { [styles['detail__button-cart--active']]: isInCart },
                )}
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                ) => {
                  event.preventDefault();
                  handleAddToCart();
                }}
              >
                {isInCart ? `Added to cart` : 'Add to cart'}
              </button>
              <button
                className={classNames(
                  styles.detail__button,
                  styles['detail__button-favorites'],
                  { [styles['detail__button-cart--active']]: isInCart },
                )}
                onClick={() => toggleFavorite(String(productIdNumber))}
              >
                {isFavorite ? (
                  <Icon icon={icons.favorites_filled} />
                ) : (
                  <Icon icon={icons.favorites} />
                )}
              </button>
            </div>
            <div className={styles.detail__characteristics}>
              <div className={styles['detail__characteristics-container']}>
                <span
                  className={styles['detail__characteristics-container__name']}
                >
                  Screen
                </span>
                <span
                  className={styles['detail__characteristics-container__info']}
                >
                  {productDetails.screen}
                </span>
              </div>
              <div className={styles['detail__characteristics-container']}>
                <span
                  className={styles['detail__characteristics-container__name']}
                >
                  Resolution
                </span>
                <span
                  className={styles['detail__characteristics-container__info']}
                >
                  {productDetails.resolution}
                </span>
              </div>
              <div className={styles['detail__characteristics-container']}>
                <span
                  className={styles['detail__characteristics-container__name']}
                >
                  Processor
                </span>
                <span
                  className={styles['detail__characteristics-container__info']}
                >
                  {productDetails.processor}
                </span>
              </div>
              <div className={styles['detail__characteristics-container']}>
                <span
                  className={styles['detail__characteristics-container__name']}
                >
                  RAM
                </span>
                <span
                  className={styles['detail__characteristics-container__info']}
                >
                  {productDetails.ram}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detail__about}>
        <ProductAbout productDetails={productDetails} />
        <ProductSpecs productDetails={productDetails} />
      </div>

      <ProductsSlider
        title="You may also like"
        products={categoryProducts}
        displayType={'discount'}
      />
    </div>
  );
};
