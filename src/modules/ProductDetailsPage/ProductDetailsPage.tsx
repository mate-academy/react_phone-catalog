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
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

const buildProductName = (
  product: ProductDetails,
  capacity: string,
  color: string,
) => {
  let name = product.name;

  name = name.replace(new RegExp(product.capacity, 'i'), capacity);
  name = name.replace(
    new RegExp(product.color.replace(/\s+/g, '\\s+'), 'i'),
    capitalizeWords(color),
  );

  return name;
};

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeColor, setActiveColor] = useState('');
  const [activeCapacity, setActiveCapacity] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [productName, setProductName] = useState('');

  const pathSegments = location.pathname.split('/');
  const category = location.state?.category || pathSegments[1];

  const { product, loading, error } = useProductDetails(productId, category);

  const updateUrl = useCallback(
    (color: string, capacity: string) => {
      if (!product) {
        return;
      }

      const newProductId = `${product.namespaceId}-${normalizeForUrlPart(
        capacity,
      )}-${normalizeForUrlPart(color)}`;

      navigate(`/${category}/${newProductId}`, { replace: true });
    },
    [product, category, navigate],
  );

  const handleColorChange = useCallback(
    (color: string) => {
      if (!product) {
        return;
      }

      setActiveColor(color);

      const colorKey = color.toLowerCase().replace(/\s+/g, '-');
      const filteredImages = product.images.filter(img =>
        img.toLowerCase().includes(colorKey),
      );

      setImages(filteredImages.length ? filteredImages : product.images);
      setProductName(buildProductName(product, activeCapacity, color));

      updateUrl(color, activeCapacity);
    },
    [product, activeCapacity, updateUrl],
  );

  const handleCapacityChange = useCallback(
    (capacity: string) => {
      if (!product) {
        return;
      }

      setActiveCapacity(capacity);
      setProductName(buildProductName(product, capacity, activeColor));
      updateUrl(activeColor, capacity);
    },
    [product, activeColor, updateUrl],
  );

  useEffect(() => {
    if (!product || !productId) {
      return;
    }

    const { capacity, color } = getColorAndCapacityFromUrl(productId, product);

    setActiveCapacity(capacity);
    setActiveColor(color);

    const colorKey = color.toLowerCase().replace(/\s+/g, '-');
    const filteredImages = product.images.filter(img =>
      img.toLowerCase().includes(colorKey),
    );

    setImages(filteredImages.length ? filteredImages : product.images);
    setProductName(buildProductName(product, capacity, color));
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
          activeColor={activeColor}
          setActiveColor={handleColorChange}
          activeCapacity={activeCapacity}
          setActiveCapacity={handleCapacityChange}
          showDiscount={showDiscount}
        />
      </div>

      <ProductDescription details={product} />
      <RandomProducts />
    </div>
  );
};
