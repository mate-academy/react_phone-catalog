import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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

// Уніфікована нормалізація рядків для URL, порівнянь та фільтрації
const normalizeStr = (str: string) =>
  str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[()]/g, '');

const capitalizeWords = (str: string) =>
  str
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

// Визначаємо колір та capacity з URL
const getColorAndCapacityFromUrl = (
  productId: string,
  product: ProductDetails,
) => {
  const segments = productId.toLowerCase().split('-');

  const capacity =
    product.capacityAvailable.find(cap =>
      segments.some(seg => normalizeStr(seg).includes(normalizeStr(cap))),
    ) || product.capacityAvailable[0];

  const color =
    product.colorsAvailable.find(c =>
      segments.some(seg => normalizeStr(seg).includes(normalizeStr(c))),
    ) || product.colorsAvailable[0];

  return { capacity, color };
};

// Генеруємо назву продукту з урахуванням активного кольору та capacity
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
  const navigate = useNavigate();

  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [activeCapacityIndex, setActiveCapacityIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [productName, setProductName] = useState('');

  const pathSegments = location.pathname.split('/');
  const category = location.state?.category || pathSegments[1];

  const { product, loading, error } = useProductDetails(productId, category);

  const handleColorChange = useCallback(
    (color: string) => {
      if (!product) {
        return;
      }

      const colorIndex = product.colorsAvailable.findIndex(
        c => normalizeStr(c) === normalizeStr(color),
      );

      if (colorIndex < 0) {
        return;
      }

      const colorKey = normalizeStr(color);
      const newImages = product.images.filter(img =>
        normalizeStr(img).includes(colorKey),
      ) || [product.images[0]];

      setActiveColorIndex(colorIndex);
      setImages(newImages);
      setProductName(
        buildProductName(product, activeCapacityIndex, colorIndex),
      );

      const newProductId = `${product.namespaceId}-${normalizeStr(
        product.capacityAvailable[activeCapacityIndex],
      )}-${colorKey}`;

      navigate(`/${category}/${newProductId}`, { replace: true });
    },
    [product, activeCapacityIndex, category, navigate],
  );

  const handleCapacitySelect = useCallback(
    (capacity: string) => {
      if (!product) {
        return;
      }

      const capacityIndex = product.capacityAvailable.findIndex(
        c => normalizeStr(c) === normalizeStr(capacity),
      );

      if (capacityIndex < 0) {
        return;
      }

      setActiveCapacityIndex(capacityIndex);
      setProductName(
        buildProductName(product, capacityIndex, activeColorIndex),
      );

      const newProductId = `${product.namespaceId}-${normalizeStr(
        capacity,
      )}-${normalizeStr(product.colorsAvailable[activeColorIndex])}`;

      navigate(`/${category}/${newProductId}`, { replace: true });
    },
    [product, activeColorIndex, category, navigate],
  );

  useEffect(() => {
    if (!product || !productId) {
      return;
    }

    const { capacity: initialCapacity, color: initialColor } =
      getColorAndCapacityFromUrl(productId, product);

    const capacityIndex = product.capacityAvailable.findIndex(
      c => normalizeStr(c) === normalizeStr(initialCapacity),
    );
    const colorIndex = product.colorsAvailable.findIndex(
      c => normalizeStr(c) === normalizeStr(initialColor),
    );

    const finalCapacityIndex = capacityIndex >= 0 ? capacityIndex : 0;
    const finalColorIndex = colorIndex >= 0 ? colorIndex : 0;

    setActiveCapacityIndex(finalCapacityIndex);
    setActiveColorIndex(finalColorIndex);

    const colorKey = normalizeStr(product.colorsAvailable[finalColorIndex]);
    const newImages = product.images.filter(img =>
      normalizeStr(img).includes(colorKey),
    ) || [product.images[0]];

    setImages(newImages);
    setProductName(
      buildProductName(product, finalCapacityIndex, finalColorIndex),
    );
  }, [product, productId]);

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
          activeIndex={activeColorIndex}
          setActiveIndex={setActiveColorIndex}
          onColorChange={handleColorChange}
          handleCapacitySelect={handleCapacitySelect}
          activeCapacityIndex={activeCapacityIndex}
          setActiveCapacityIndex={setActiveCapacityIndex}
        />
      </div>

      <ProductDescription details={product} />
      <RandomProducts />
    </div>
  );
};
