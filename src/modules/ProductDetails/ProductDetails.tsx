import { useEffect, useState } from 'react';

import {
  getProductById,
  getProductVariants,
  getSuggestedProducts,
} from '../../shared/api';
import { getAssetUrl } from '../../shared/asset';
import { useShop } from '../../shared/context/ShopContext';

import type { Product } from '../../shared/types';

import Breadcrumbs from '../../components/Breadcrumbs';
import EmptyState from '../../components/EmptyState';
import Loader from '../../components/Loader';
import ProductsSlider from '../../components/ProductsSlider';

import styles from './ProductDetails.module.scss';

type Props = {
  productId: string;
  navigate: (to: string) => void;
};

const categoryNames = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export default function ProductDetails({ productId, navigate }: Props) {
  const { addToCart, removeFromCart, isInCart, toggleFavorite, isFavorite } =
    useShop();

  const [product, setProduct] = useState<Product | null>(null);

  const [variants, setVariants] = useState<Product[]>([]);

  const [suggested, setSuggested] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  const params = new URLSearchParams(window.location.search);

  const fromHotPrices = params.get('from') === 'hot';

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);

      try {
        const current = await getProductById(productId);

        if (!current) {
          setProduct(null);

          return;
        }

        const [productVariants, recommendations] = await Promise.all([
          getProductVariants(
            current.namespaceId,
            current.category,
            current.year,
          ),
          getSuggestedProducts(productId),
        ]);

        setProduct(current);
        setVariants(productVariants);
        setSuggested(recommendations);
        setSelectedImage(0);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <EmptyState
        text="Product was not found"
        action="Back to home"
        onAction={() => navigate('/')}
      />
    );
  }

  const capacities = Array.from(
    new Set(variants.map(variant => variant.capacity)),
  );

  const colors = Array.from(new Set(variants.map(variant => variant.color)));

  const findVariant = (nextCapacity: string, nextColor: string) => {
    const exactVariant = variants.find(
      variant =>
        variant.capacity === nextCapacity &&
        variant.color.toLowerCase() === nextColor.toLowerCase(),
    );

    if (exactVariant) {
      return exactVariant;
    }

    const capacityVariant = variants.find(
      variant => variant.capacity === nextCapacity,
    );

    if (capacityVariant) {
      return capacityVariant;
    }

    const colorVariant = variants.find(
      variant => variant.color.toLowerCase() === nextColor.toLowerCase(),
    );

    if (colorVariant) {
      return colorVariant;
    }

    return product;
  };

  const changeVariant = (nextProduct: Product) => {
    if (nextProduct.id === product.id) {
      return;
    }

    setProduct(nextProduct);
    setSelectedImage(0);

    const hotQuery = fromHotPrices ? '?from=hot' : '';

    navigate(`/product/${nextProduct.id}${hotQuery}`);
  };

  const changeCapacity = (nextCapacity: string) => {
    const nextProduct = findVariant(nextCapacity, product.color);

    changeVariant(nextProduct);
  };

  const changeColor = (nextColor: string) => {
    const nextProduct = findVariant(product.capacity, nextColor);

    changeVariant(nextProduct);
  };

  const inCart = isInCart(product.id);
  const favorite = isFavorite(product.id);

  const handleCartClick = () => {
    if (inCart) {
      removeFromCart(product.id);

      return;
    }

    addToCart(product);
  };

  return (
    <section className={styles.page}>
      <Breadcrumbs
        items={[
          {
            label: 'Home',
            onClick: () => navigate('/'),
          },
          {
            label: categoryNames[product.category],
            onClick: () => navigate(`/${product.category}`),
          },
          {
            label: product.name,
          },
        ]}
      />

      <button
        type="button"
        className={styles.back}
        onClick={() => navigate(`/${product.category}`)}
      >
        ← Back
      </button>

      <div className={styles.details}>
        <div>
          <div className={styles.mainImage}>
            <img
              src={getAssetUrl(product.images[selectedImage])}
              alt={product.name}
            />
          </div>

          <div className={styles.thumbs}>
            {product.images.map((image, index) => (
              <button
                type="button"
                key={image}
                className={
                  index === selectedImage ? styles.thumbActive : styles.thumb
                }
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={getAssetUrl(image)}
                  alt={`${product.name} ${index + 1}`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.info}>
          <h1>{product.name}</h1>

          <div className={styles.price}>
            {fromHotPrices ? (
              <>
                <strong>${product.priceDiscount}</strong>

                {product.priceRegular > product.priceDiscount && (
                  <del>${product.priceRegular}</del>
                )}
              </>
            ) : (
              <strong>${product.priceRegular}</strong>
            )}
          </div>

          <div className={styles.option}>
            <strong>Capacity: {product.capacity}</strong>

            <div className={styles.radioRow}>
              {capacities.map(value => (
                <label key={value}>
                  <input
                    type="radio"
                    name="capacity"
                    checked={product.capacity === value}
                    onChange={() => changeCapacity(value)}
                  />

                  <span>{value}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.option}>
            <strong>Color: {product.color}</strong>

            <div className={styles.radioRow}>
              {colors.map(value => (
                <label key={value}>
                  <input
                    type="radio"
                    name="color"
                    checked={
                      product.color.toLowerCase() === value.toLowerCase()
                    }
                    onChange={() => changeColor(value)}
                  />

                  <span>{value}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.buttons}>
            <button
              type="button"
              className={`${styles.cartButton} ${
                inCart ? styles.cartButtonAdded : ''
              }`}
              onClick={handleCartClick}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              className={favorite ? styles.favoriteActive : styles.favorite}
              onClick={() => toggleFavorite(product.id)}
            >
              {favorite ? '♥' : '♡'}
            </button>
          </div>

          <div className={styles.specs}>
            <div>
              <span>Screen</span>
              <b>{product.screen}</b>
            </div>

            <div>
              <span>Resolution</span>
              <b>{product.resolution}</b>
            </div>

            <div>
              <span>Processor</span>
              <b>{product.processor}</b>
            </div>

            <div>
              <span>RAM</span>
              <b>{product.ram}</b>
            </div>

            <div>
              <span>Camera</span>
              <b>{product.camera}</b>
            </div>

            <div>
              <span>Zoom</span>
              <b>{product.zoom}</b>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.about}>
        <div>
          <h2>About</h2>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>

        <div>
          <h2>Tech specs</h2>

          {product.cell.map(item => (
            <div className={styles.techRow} key={item}>
              <span>•</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      <ProductsSlider
        title="You may also like"
        products={suggested}
        navigate={navigate}
        showDiscount={false}
      />
    </section>
  );
}
