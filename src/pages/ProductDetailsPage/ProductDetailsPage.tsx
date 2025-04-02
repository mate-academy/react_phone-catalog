import { useEffect, useState } from 'react';
import { getProductById } from '@api/productsApi';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductImageCarousel } from '@components/ProductImageCarousel';
import { ProductDetailsType } from 'types/productInfoTypes';
import { ProductColors } from '@components/ProductColors';
import { ProductAbout } from '@components/ProductAbout';
import { ProductTechSpecs } from '@components/ProductTechSpecs';
import { ProductCapacity } from '@components/ProductCapacity';
import { getProducts } from '@api/productsApi';
import { BackButton } from '@components/Buttons/BackButton';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { PrimaryButton } from '@components/Buttons/PrimaryButton';
import { HeartIcon } from '@components/Icons/HeartIcon';
import { ProductSmallSpecs } from '@components/ProductSmallSpecs';
import { Loader } from '@components/Loader';
import { YouMayLike } from '@components/YouMayLike';
import { useFavorites } from '@context/FavoritesContext';
import { HeartActiveIcon } from '@components/Icons/HeartActiveIcon';
import { useCart } from '@context/CartContext';
import { ProductType } from 'types/productTypes';

import styles from './ProductDetailsPage.module.scss';
import cn from 'classnames';

export const ProductDetailsPage = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productDetails, setProductDetails] =
    useState<ProductDetailsType | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [productIdNumber, setProductIdNumber] = useState<number | null>(null);
  const navigate = useNavigate();

  const { cart, addToCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(String(productIdNumber));

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId || !category) {
        return;
      }

      const fetchedProduct = await getProductById(productId, category);
      const allProducts = await getProducts();

      if (!fetchedProduct) {
        return;
      }

      const fixedProduct = {
        ...fetchedProduct,
        images: fetchedProduct.images.map(img => `/${img}`),
      };

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
  }, [productId, category]);

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

    const newProductId = `${productDetails.namespaceId}-${selectedCapacity}-${color.replace(/\s+/g, '-').toLowerCase()}`;

    navigate(`/${productDetails.category}/${newProductId}`);
  };

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
    <section className={styles.product_detail}>
      <Breadcrumbs />
      <BackButton />
      <h2 className={cn(styles.product_detail__title, 'secondary-title')}>
        {productDetails.name}
      </h2>

      <div className={styles.product_detail__wrapper}>
        <div className={styles.product_detail__main}>
          <ProductImageCarousel images={productDetails.images} />

          <div className={styles.product_detail__options}>
            <ProductColors
              onColorSelect={handleColorChange}
              selectedColor={selectedColor}
              productDetails={productDetails}
              productId={productIdNumber}
            />
            <ProductCapacity
              onCapacitySelect={handleCapacityChange}
              productDetails={productDetails}
            />
            <div className={styles.product_detail__price}>
              <h2 className="secondary-title">
                ${productDetails.priceDiscount}
              </h2>
              <span className={styles.product_detail__price_regular}>
                ${productDetails.priceRegular}
              </span>
            </div>

            <div className={styles.product_detail__actions}>
              <PrimaryButton
                mainText="Add to cart"
                selectedText="Added"
                onClick={handleAddToCart}
                isSelected={isInCart}
              />
              <button
                className={cn(
                  styles.product_detail__actions_heart,
                  'button-icon',
                )}
                onClick={() => toggleFavorite(String(productIdNumber))}
              >
                {isFavorite ? <HeartActiveIcon /> : <HeartIcon />}
              </button>
            </div>

            <ProductSmallSpecs productDetails={productDetails} />
          </div>
        </div>

        <div className={styles.product_detail__info}>
          <ProductAbout productDetails={productDetails} />
          <ProductTechSpecs productDetails={productDetails} />
        </div>

        <YouMayLike />
      </div>
    </section>
  );
};
