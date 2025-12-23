import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ProductSpec } from '../ProductSpec';
import { ProductPhotos } from '../ProductPhotos';
import { Loader } from '../shared/Loader';
import { NotFoundProduct } from '../NotFoundProduct';
import { BackBtn } from '../../components/BackBtn';
import { BreadCrumbs } from '../shared/BreadCrumbs';
import styles from './ProductDetailsPage.module.scss';
import { useProductDetails } from '../shared/hooks/useProductDetails';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductDescription } from '../shared/ProductDescription';
import { RandomProducts } from '../shared/RandomProducts';

const normalizeForUrlPart = (str: string) =>
  str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[()]/g, '');

const getColorAndCapacityFromUrl = (
  productId: string,
  product: ProductDetails,
) => {
  const segments = productId.toLowerCase().split('-');

  const capacity =
    product.capacityAvailable.find(cap =>
      segments.some(seg => seg.includes(cap.toLowerCase())),
    ) || product.capacityAvailable[0];

  const color =
    product.colorsAvailable.find(c =>
      segments.some(seg => seg.includes(c.toLowerCase().replace(/\s+/g, '-'))),
    ) || product.colorsAvailable[0];

  return { capacity, color };
};

const capitalizeWords = (str: string) =>
  str
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

const buildProductName = (
  product: ProductDetails,
  activeCapacityIndex: number,
  activeColorIndex: number,
) => {
  const currentCapacity =
    product.capacityAvailable[activeCapacityIndex].toUpperCase();
  const currentColor = capitalizeWords(
    product.colorsAvailable[activeColorIndex],
  );
  let name = product.name;

  name = name.replace(new RegExp(product.capacity, 'i'), currentCapacity);
  name = name.replace(
    new RegExp(product.color.replace(/\s+/g, '\\s+'), 'i'),
    currentColor,
  );

  return name;
};

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const location = useLocation();

  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [activeCapacityIndex, setActiveCapacityIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [productName, setProductName] = useState('');

  const pathSegments = location.pathname.split('/');
  const category = location.state?.category || pathSegments[1];

  const { product, loading, error } = useProductDetails(productId, category);

  const getImagesByColor = useCallback(
    (color: string) => {
      if (!product) {
        return [];
      }

      const normalizedColor = color.toLowerCase().replace(/\s+/g, '-');
      const filtered = product.images.filter(img =>
        img.toLowerCase().includes(`/${normalizedColor}/`),
      );

      return filtered.length > 0 ? filtered : product.images;
    },
    [product],
  );

  const handleColorChange = useCallback(
    (color: string) => {
      if (!product) {
        return;
      }

      const colorIndex = product.colorsAvailable.findIndex(
        c => c.toLowerCase() === color.toLowerCase(),
      );

      if (colorIndex < 0) {
        return;
      }

      setActiveColorIndex(colorIndex);
      setImages(getImagesByColor(color));

      setProductName(
        buildProductName(product, activeCapacityIndex, colorIndex),
      );

      const newProductId = `${product.namespaceId}-${normalizeForUrlPart(
        product.capacityAvailable[activeCapacityIndex],
      )}-${normalizeForUrlPart(color)}`;

      window.history.replaceState({}, '', `/${category}/${newProductId}`);
    },
    [product, activeCapacityIndex, category, getImagesByColor],
  );

  const handleCapacitySelect = useCallback(
    (capacity: string) => {
      if (!product) {
        return;
      }

      const capacityIndex = product.capacityAvailable.findIndex(
        c => c === capacity,
      );

      if (capacityIndex < 0) {
        return;
      }

      setActiveCapacityIndex(capacityIndex);

      setProductName(
        buildProductName(product, capacityIndex, activeColorIndex),
      );

      const newProductId = `${product.namespaceId}-${normalizeForUrlPart(
        capacity,
      )}-${normalizeForUrlPart(product.colorsAvailable[activeColorIndex])}`;

      window.history.replaceState({}, '', `/${category}/${newProductId}`);
    },
    [product, activeColorIndex, category],
  );

  useEffect(() => {
    if (!product || !productId) {
      return;
    }

    const { capacity: initialCapacity, color: initialColor } =
      getColorAndCapacityFromUrl(productId, product);

    const capacityIndex = product.capacityAvailable.findIndex(
      c => c === initialCapacity,
    );
    const colorIndex = product.colorsAvailable.findIndex(
      c => c.toLowerCase() === initialColor.toLowerCase(),
    );

    const finalCapacityIndex = capacityIndex >= 0 ? capacityIndex : 0;
    const finalColorIndex = colorIndex >= 0 ? colorIndex : 0;

    setActiveCapacityIndex(finalCapacityIndex);
    setActiveColorIndex(finalColorIndex);
    setImages(getImagesByColor(product.colorsAvailable[finalColorIndex]));
    setProductName(
      buildProductName(product, finalCapacityIndex, finalColorIndex),
    );
  }, [product, productId, getImagesByColor]);

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return <NotFoundProduct />;
  }

  const showDiscount = location.state?.showDiscount ?? false;

  return (
    <div>
      <BreadCrumbs productName={productName} />
      <BackBtn />
      <h2 className={styles.productPage__title}>{productName}</h2>

      <div className={styles.productPage_spec}>
        <ProductPhotos images={images} />
        <ProductSpec
          product={product}
          showDiscount={showDiscount}
          activeColorIndex={activeColorIndex}
          setActiveColorIndex={setActiveColorIndex}
          onColorChange={handleColorChange}
          activeCapacityIndex={activeCapacityIndex}
          setActiveCapacityIndex={setActiveCapacityIndex}
          handleCapacitySelect={handleCapacitySelect}
        />
      </div>

      <ProductDescription details={product} />
      <RandomProducts />
    </div>
  );
};
