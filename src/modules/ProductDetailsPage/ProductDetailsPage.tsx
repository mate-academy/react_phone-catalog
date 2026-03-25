import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import cl from 'classnames';

import { getProductDetails } from '../../api/products';
import { Product, ProductDetail } from '../../types/Product';
import { ArrowLeftIcon } from '../../components/Icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../components/Icons/ArrowRightIcon';
import { useCart } from '../../hooks/useCart';
import { useFavourites } from '../../hooks/useFavourites';
import { Loader } from '../../components/Loader';
import { HomeIcon } from '../../components/Icons/HomeIcon';
import { ProductGallery } from './ProductGallery';
import { ProductAbout } from './ProductAbout';
import { ProductTechSpecs } from './ProductTechSpecs';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getSuggestedProducts } from '../../utils/shuffle';
import { ProductControls } from './ProductControls';

import styles from './ProductDetailsPage.module.scss';

type Props = {
  products: Product[];
};

export const ProductDetailsPage: React.FC<Props> = ({ products }) => {
  const { category, itemId } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isVariantLoading, setIsVariantLoading] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const { addToCart, isInCart, removeFromCart } = useCart();
  const { addToFavourites, removeFromFavourites, isFavourite } =
    useFavourites();

  useEffect(() => {
    if (!category || !itemId) {
      return;
    }

    if (!isVariantLoading) {
      setIsLoading(true);
    }

    setHasError(false);

    const randomProducts = getSuggestedProducts(products, 10);

    setSuggestedProducts(randomProducts);

    getProductDetails(category, itemId)
      .then(data => {
        setDevice(data);

        if (data) {
          setActiveImage(data.images[0]);
        }
      })
      .catch(() => setHasError(true))
      .finally(() => {
        setIsLoading(false);
        setIsVariantLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, itemId]);

  //#region Functions
  const handleAddToCart = () => {
    if (!device) {
      return;
    }

    const product = products.find(p => p.itemId === device.id);

    if (product) {
      if (isInCart(product.id)) {
        removeFromCart(product.id);
      } else {
        addToCart(product);
      }
    }
  };

  const handleAddToFav = () => {
    if (!device) {
      return;
    }

    const product = products.find(p => p.itemId === device.id);

    if (product) {
      if (isFavourite(product.id)) {
        removeFromFavourites(product.id);
      } else {
        addToFavourites(product);
      }
    }
  };

  const goBack = () => navigate(-1);

  const isLiked = () => {
    if (!device) {
      return null;
    }

    const product = products.find(p => p.itemId === device.id);

    return product ? isFavourite(product.id) : null;
  };

  const inCart = () => {
    if (!device) {
      return null;
    }

    const product = products.find(p => p.itemId === device.id);

    return product ? isInCart(product.id) : null;
  };

  const handleColorChange = (newColor: string) => {
    if (!device || device.color === newColor) {
      return;
    }

    setIsVariantLoading(true);

    const formattedColor = newColor.replace(/\s+/g, '-');
    const formattedCapacity = device.capacity
      .toLowerCase()
      .replace(/\s+/g, '-');

    const newPath = `/${category}/${device.namespaceId}-${formattedCapacity}-${formattedColor}`;

    navigate(newPath, { replace: true });
  };

  const handleCapacityChange = (newCapacity: string) => {
    if (!device || device.capacity === newCapacity) {
      return;
    }

    setIsVariantLoading(true);

    const formattedColor = device.color.replace(/\s+/g, '-');
    const formattedCapacity = newCapacity.toLowerCase().replace(/\s+/g, '-');

    const newPath = `/${category}/${device.namespaceId}-${formattedCapacity}-${formattedColor}`;

    navigate(newPath, { replace: true });
  };

  const getProductId = () => {
    if (!device) {
      return null;
    }

    const product = products.find(p => device.id === p.itemId);

    return product ? product.id : null;
  };

  //#endregion

  if (isLoading) {
    return <Loader />;
  }

  if (hasError || !device) {
    return (
      <div className={cl('container', styles.page)}>
        <h2>Product not found...</h2>
        <button onClick={goBack} className={styles.bigBack}>
          Go back
        </button>

        <img
          src="/img/product-not-found.png"
          alt="Not Found Banner"
          className={styles.img}
        />
      </div>
    );
  }

  return (
    <section className={cl('container', styles.section)}>
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbLink}>
          <HomeIcon />
        </Link>

        <span className={styles.breadcrumbArrow}>{<ArrowRightIcon />}</span>

        <Link to={`/${category}`} className={styles.breadcrumbLink}>
          {category}
        </Link>

        <span className={styles.breadcrumbArrow}>{<ArrowRightIcon />}</span>

        <span className={styles.breadcrumbCurrent}>{device.name}</span>
      </div>

      <button className={styles.backButton} onClick={goBack}>
        <span className={styles.backButtonIcon}>
          <ArrowLeftIcon />
        </span>

        <span>Back</span>
      </button>

      <h2 className={styles.title}>{device.name}</h2>

      <div
        className={cl(styles.mainContent, {
          [styles.softLoading]: isVariantLoading,
        })}
      >
        <ProductGallery
          name={device.name}
          images={device.images}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
        />

        <ProductControls
          device={device}
          productId={getProductId()}
          isInCart={inCart()}
          isLiked={isLiked()}
          onColorChange={handleColorChange}
          onCapacityChange={handleCapacityChange}
          onAddToCart={handleAddToCart}
          onAddToFav={handleAddToFav}
        />
      </div>

      <div className={styles.detailsContent}>
        <ProductAbout description={device.description} />

        <ProductTechSpecs device={device} />
      </div>

      <div className={styles.sliderWrapper}>
        <ProductsSlider
          products={suggestedProducts}
          title={'You may also like'}
          isLoading={isLoading}
          showDiscount={true}
        />
      </div>
    </section>
  );
};
