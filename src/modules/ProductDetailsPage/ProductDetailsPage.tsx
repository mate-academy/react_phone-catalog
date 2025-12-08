import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BreadCrumbs } from '../shared/BreadCrumbs';
import { BackBtn } from '../../components/BackBtn';
import styles from './ProductDetailsPage.module.scss';
import { useProductDetails } from '../shared/hooks/useProductDetails';
import { ProductPhotos } from '../ProductPhotos';
import { NotFoundProduct } from '../NotFoundProduct';
import { Loader } from '../shared/Loader';
import { useCallback, useEffect, useState } from 'react';
import { ProductSpec } from '../ProductSpec';

const useQuery = () => new URLSearchParams(useLocation().search);

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCapacityIndex, setActiveCapacityIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [productName, setProductName] = useState('');

  const colorFromQuery = query.get('color');
  const capacityFromQuery = query.get('capacity');

  const pathSegments = location.pathname.split('/');
  const category = location.state?.category || pathSegments[1];

  const { product, error, loading } = useProductDetails(productId, category);

  const getBaseName = (name: string, capacities: string[]) => {
    for (const cap of capacities) {
      const index = name.toLowerCase().indexOf(cap.toLowerCase());

      if (index !== -1) {
        return name.slice(0, index).trim();
      }
    }

    return name;
  };

  const formatCapacity = (capacity: string) => {
    return capacity.toUpperCase();
  };

  const updateProductName = useCallback(
    (color: string, capacity: string) => {
      if (!product) {
        return '';
      }

      const baseName = getBaseName(product.name, product.capacityAvailable);
      const formattedCapacity = formatCapacity(capacity);

      return `${baseName} ${formattedCapacity} ${color}`
        .split(' ')
        .map(w => {
          if (/\d+(GB|TB)/i.test(w)) {
            return w.toUpperCase();
          }

          return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
        })
        .join(' ');
    },
    [product],
  );

  const updateColor = useCallback(
    (color: string) => {
      if (!product) {
        return;
      }

      const normalizeColorForPath = (c: string) =>
        c.toLowerCase().replace(/\s+/g, '-');

      const newImages = product.images.map(img =>
        img.replace(
          normalizeColorForPath(product.color),
          normalizeColorForPath(color),
        ),
      );

      setImages(newImages);

      const capacity =
        product.capacityAvailable[activeCapacityIndex] || product.capacity;

      setProductName(updateProductName(color, capacity));

      const newIndex = product.colorsAvailable.findIndex(
        c => c.toLowerCase() === color.toLowerCase(),
      );

      setActiveIndex(newIndex);
    },
    [product, activeCapacityIndex, updateProductName],
  );

  const updateCapacity = useCallback(
    (capacity: string) => {
      if (!product) {
        return;
      }

      const color = product.colorsAvailable[activeIndex] || product.color;

      setProductName(updateProductName(color, capacity));

      const idx = product.capacityAvailable.findIndex(c => c === capacity);

      setActiveCapacityIndex(idx);
    },
    [product, activeIndex, updateProductName],
  );

  useEffect(() => {
    if (!product) {
      return;
    }

    const initialColor = colorFromQuery || product.color;
    const initialCapacity = capacityFromQuery || product.capacity;

    updateCapacity(initialCapacity);
    updateColor(initialColor);
  }, [product, colorFromQuery, capacityFromQuery, updateColor, updateCapacity]);

  const handleColorChange = (color: string) => {
    updateColor(color);
    const capacity =
      product?.capacityAvailable[activeCapacityIndex] || product?.capacity;

    navigate(
      {
        pathname: location.pathname,
        search: `?color=${color}&capacity=${capacity}`,
      },
      { replace: true },
    );
  };

  const handleCapacitySelect = (capacity: string) => {
    updateCapacity(capacity);
    const color = product?.colorsAvailable[activeIndex] ?? product?.color;

    navigate(
      {
        pathname: location.pathname,
        search: `?color=${color}&capacity=${capacity}`,
      },
      { replace: true },
    );
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return <NotFoundProduct />;
  }

  return (
    <div>
      <BreadCrumbs productName={productName} />
      <BackBtn />
      <h2 className={styles.productPage__title}>{productName}</h2>

      <div className={styles.productPage_spec}>
        <ProductPhotos images={images} />
        <ProductSpec
          product={product}
          showDiscount={false}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onColorChange={handleColorChange}
          handleCapacitySelect={handleCapacitySelect}
          activeCapacityIndex={activeCapacityIndex}
          setActiveCapacityIndex={setActiveCapacityIndex}
        />
      </div>
    </div>
  );
};
