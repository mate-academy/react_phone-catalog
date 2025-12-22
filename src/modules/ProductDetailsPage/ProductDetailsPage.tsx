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

const getBaseName = (name: string, capacities: string[]) => {
  for (const cap of capacities) {
    const index = name.toLowerCase().indexOf(cap.toLowerCase());

    if (index !== -1) {
      return name.slice(0, index).trim();
    }
  }

  return name;
};

const formatCapacity = (capacity: string) => capacity.toUpperCase();

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

  const updateProductName = useCallback(
    (color: string, capacity: string) => {
      if (!product) {
        return '';
      }

      const baseName = getBaseName(product.name, product.capacityAvailable);
      const formattedCapacity = formatCapacity(capacity);

      return `${baseName} ${formattedCapacity} ${color}`
        .split(' ')
        .map(word =>
          /\d+(GB|TB)/i.test(word)
            ? word.toUpperCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' ');
    },
    [product],
  );

  const updateColor = useCallback(
    (color: string) => {
      if (!product) {
        return;
      }

      const normalizeColor = (c: string) =>
        c.toLowerCase().replace(/\s+/g, '-');
      const colorKey = normalizeColor(color);

      const newImages = product.images.filter(img =>
        img.toLowerCase().includes(colorKey),
      );

      setImages(newImages.length > 0 ? newImages : product.images);

      const capacity =
        product.capacityAvailable[activeCapacityIndex] || product.capacity;

      setProductName(updateProductName(color, capacity));

      const newColorIndex = product.colorsAvailable.findIndex(
        c => c.toLowerCase() === color.toLowerCase(),
      );

      setActiveColorIndex(newColorIndex >= 0 ? newColorIndex : 0);
    },
    [product, activeCapacityIndex, updateProductName],
  );

  const updateCapacity = useCallback(
    (capacity: string) => {
      if (!product) {
        return;
      }

      const color = product.colorsAvailable[activeColorIndex] || product.color;

      setProductName(updateProductName(color, capacity));

      const capacityIdx = product.capacityAvailable.findIndex(
        c => c === capacity,
      );

      setActiveCapacityIndex(capacityIdx >= 0 ? capacityIdx : 0);
    },
    [product, activeColorIndex, updateProductName],
  );

  useEffect(() => {
    if (!product || !productId) {
      return;
    }

    const { capacity: initialCapacity, color: initialColor } =
      getColorAndCapacityFromUrl(productId, product);

    updateCapacity(initialCapacity);
    updateColor(initialColor);
  }, [product, productId, updateColor, updateCapacity]);

  const handleColorChange = (color: string) => {
    if (!product) {
      return;
    }

    updateColor(color);

    const capacity =
      product.capacityAvailable[activeCapacityIndex] || product.capacity;
    const baseName = getBaseName(product.name, product.capacityAvailable);

    const newProductId = `${normalizeForUrlPart(baseName)}-${normalizeForUrlPart(capacity)}-${normalizeForUrlPart(color)}`;

    navigate(`/${category}/${newProductId}`, { replace: true });
  };

  const handleCapacitySelect = (capacity: string) => {
    if (!product) {
      return;
    }

    updateCapacity(capacity);

    const color = product.colorsAvailable[activeColorIndex] || product.color;
    const baseName = getBaseName(product.name, product.capacityAvailable);

    const newProductId = `${normalizeForUrlPart(baseName)}-${normalizeForUrlPart(capacity)}-${normalizeForUrlPart(color)}`;

    navigate(`/${category}/${newProductId}`, { replace: true });
  };

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
