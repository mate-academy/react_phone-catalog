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

const normalizeForUrlPart = (str: string) =>
  str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[()]/g, '');

const getColorAndCapacityFromUrl = (
  productId: string,
  product: ProductDetails,
) => {
  const segments = productId.toLowerCase().split('-');

  const capacity =
    product.capacityAvailable.find((cap: string) =>
      segments.some(seg => seg.includes(cap.toLowerCase())),
    ) || product.capacityAvailable[0];

  const color =
    product.colorsAvailable.find((c: string) =>
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
        c => c.toLowerCase() === color.toLowerCase(),
      );

      if (colorIndex < 0) {
        return;
      }

      setActiveColorIndex(colorIndex);

      const colorKey = color.toLowerCase().replace(/\s+/g, '-');
      const newImages = product.images.filter(img =>
        img.toLowerCase().includes(colorKey),
      );

      setImages(newImages.length > 0 ? newImages : product.images);

      setProductName(
        buildProductName(product, activeCapacityIndex, colorIndex),
      );

      const newProductId = `${product.namespaceId}-${normalizeForUrlPart(
        product.capacityAvailable[activeCapacityIndex],
      )}-${normalizeForUrlPart(color)}`;

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
      c => c === initialCapacity,
    );
    const colorIndex = product.colorsAvailable.findIndex(
      c => c.toLowerCase() === initialColor.toLowerCase(),
    );

    setActiveCapacityIndex(capacityIndex >= 0 ? capacityIndex : 0);
    setActiveColorIndex(colorIndex >= 0 ? colorIndex : 0);

    const colorKey = product.colorsAvailable[colorIndex >= 0 ? colorIndex : 0]
      .toLowerCase()
      .replace(/\s+/g, '-');
    const newImages = product.images.filter(img =>
      img.toLowerCase().includes(colorKey),
    );

    setImages(newImages.length > 0 ? newImages : product.images);

    setProductName(
      buildProductName(
        product,
        capacityIndex >= 0 ? capacityIndex : 0,
        colorIndex >= 0 ? colorIndex : 0,
      ),
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
          colors={product.colorsAvailable}
          activeColor={product.colorsAvailable[activeColorIndex]}
          setActiveColor={handleColorChange}
          activeCapacity={product.capacityAvailable[activeCapacityIndex]}
          setActiveCapacity={handleCapacitySelect}
          showDiscount={showDiscount}
        />
      </div>

      <ProductDescription details={product} />
      <RandomProducts />
    </div>
  );
};
