import styles from './productDetailsPage.module.scss';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductGallery } from '../../components/ProductGallery';
import { ColorSelector } from '../../components/ColorSelector';
import { CapacitySelector } from '../../components/CapacitySelector';
import { AddToCartButton } from '../../components/AddToCartButton';
import { FavouriteButton } from '../../components/FavouriteButton';
import { ProductTechInfo } from '../../components/ProductTechInfo';
import { ProductsSlider } from '../../components/ProductsSlider';
import { BackButton } from '../../components/BackButton';
import { ProductNotFound } from '../../components/ProductNotFound';
import { Loader } from '../../components/Loader';
import { useSuggestions } from '../../hooks/useSuggestions';
import { ProductDetails } from '../../types/ProductDetails';
import { useProducts } from '../../context/useProducts';

const getProductDetails = async (
  category: string,
  productId: string,
): Promise<ProductDetails> => {
  const response = await fetch(`./api/${category}.json`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const products: ProductDetails[] = await response.json();

  const product = products.find(p => p.id === productId);

  if (!product) {
    throw new Error('Product not found in the details file');
  }

  return product;
};

export const ProductDetailsPage: React.FC = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const { products: shortProducts } = useProducts();

  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category || !productId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    getProductDetails(category, productId)
      .then(data => {
        setProductDetails(data);
      })
      .catch(() => setError('Failed to load product details.'))
      .finally(() => setIsLoading(false));
  }, [category, productId]);

  const shortProductInfo = useMemo(() => {
    if (!shortProducts.length || !productId) {
      return null;
    }

    return shortProducts.find(p => p.itemId === productId);
  }, [shortProducts, productId]);

  const suggestedProducts = useSuggestions(productId, 10);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !productDetails) {
    return <ProductNotFound />;
  }

  const {
    name,
    images,
    priceDiscount,
    priceRegular,
    description,
    namespaceId,
    colorsAvailable,
    capacityAvailable,
    capacity,
    color,
  } = productDetails;

  const numericId = shortProductInfo?.id;

  return (
    <div className={styles.productDetailsPage}>
      <div className={styles.productDetailsPage__container}>
        <div className={styles.productDetailsPage__breadcrumbs}>
          <Breadcrumbs />
        </div>
        <div className={styles.productDetailsPage__backButton}>
          <BackButton />
        </div>

        <h1 className={styles.productDetailsPage__heading}>{name}</h1>
        <div className={styles.productDetailsPage__galery}>
          <ProductGallery images={images} altText={name} />
        </div>
        <div className={styles.productDetailsPage__colorSelector}>
          <ColorSelector
            namespaceId={namespaceId}
            colorsAvailable={colorsAvailable}
            currentCapacity={capacity}
          />
          <span className={styles.productDetailsPage__id}>ID: {numericId}</span>
        </div>
        <div className={styles.productDetailsPage__capacitySelector}>
          <CapacitySelector
            namespaceId={namespaceId}
            capacityAvailable={capacityAvailable}
            currentColor={color}
          />
        </div>
        <div className={styles.productDetailsPage__price}>
          <span className={styles.productDetailsPage__priceDiscount}>
            ${priceDiscount}
          </span>
          <span className={styles.productDetailsPage__priceRegular}>
            ${priceRegular}
          </span>
        </div>
        <div className={styles.productDetailsPage__buttons}>
          <AddToCartButton productData={productDetails} />
          <FavouriteButton productData={productDetails} />
        </div>

        <div className={styles.productDetailsPage__productInfo}>
          <ProductTechInfo product={productDetails} variant="mid" />
        </div>

        <div className={styles.productDetailsPage__description}>
          <h3 className={styles.productDetailsPage__descriptionHeading}>
            About
          </h3>

          {description.map(part => (
            <article
              className={styles.productDetailsPage__descriptionItem}
              key={part.title}
            >
              <h4 className={styles.productDetailsPage__descriptionItemTitle}>
                {part.title}
              </h4>
              {part.text.map((p, i) => (
                <p
                  className={styles.productDetailsPage__descriptionItemText}
                  key={i}
                >
                  {p}
                </p>
              ))}
            </article>
          ))}
        </div>

        <div className={styles.productDetailsPage__productTech}>
          <ProductTechInfo product={productDetails} variant="full" />
        </div>
      </div>

      <div className={styles.productDetailsPage__productsSlider}>
        <ProductsSlider
          heading={'You may also like'}
          products={suggestedProducts}
          hasDiscount={true}
        />
      </div>
    </div>
  );
};
