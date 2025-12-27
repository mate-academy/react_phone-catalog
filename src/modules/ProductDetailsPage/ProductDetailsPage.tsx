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

const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '-');

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

  const {
    product: fetchedProduct,
    loading,
    error,
  } = useProductDetails(productId, category);

  const getColorAndCapacityFromUrl = useCallback(
    (id: string, productData: ProductDetails) => {
      const normalizedId = id.toLowerCase();

      const capacity =
        productData.capacityAvailable.find(cap =>
          normalizedId.includes(normalize(cap)),
        ) || productData.capacityAvailable[0];

      const color =
        productData.colorsAvailable.find(clr =>
          normalizedId.includes(normalize(clr)),
        ) || productData.colorsAvailable[0];

      return { capacity, color };
    },
    [],
  );

  const buildProductName = useCallback(
    (
      productData: ProductDetails,
      capacityIndex: number,
      colorIndex: number,
    ) => {
      let name = productData.name;

      const capacity =
        productData.capacityAvailable[capacityIndex].toUpperCase();
      const color = productData.colorsAvailable[colorIndex]
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');

      if (!name.toLowerCase().includes(capacity.toLowerCase())) {
        name += ` ${capacity}`;
      }

      if (!name.toLowerCase().includes(color.toLowerCase())) {
        name += ` ${color}`;
      }

      return name;
    },
    [],
  );

  const handleColorChange = useCallback(
    (selectedColor: string) => {
      if (!fetchedProduct) {
        return;
      }

      const colorIndex = fetchedProduct.colorsAvailable.findIndex(
        c => c === selectedColor,
      );

      if (colorIndex === -1) {
        return;
      }

      setActiveColorIndex(colorIndex);

      const colorKey = normalize(selectedColor);
      const filteredImages = fetchedProduct.images.filter(img =>
        img.toLowerCase().includes(colorKey),
      );

      setImages(
        filteredImages.length > 0 ? filteredImages : fetchedProduct.images,
      );
      setProductName(
        buildProductName(fetchedProduct, activeCapacityIndex, colorIndex),
      );

      const newProductId = `${fetchedProduct.namespaceId}-${normalize(fetchedProduct.capacityAvailable[activeCapacityIndex])}-${normalize(selectedColor)}`;

      navigate(`/${category}/${newProductId}`, { replace: true });
    },
    [fetchedProduct, activeCapacityIndex, category, navigate, buildProductName],
  );

  const handleCapacitySelect = useCallback(
    (selectedCapacity: string) => {
      if (!fetchedProduct) {
        return;
      }

      const capacityIndex = fetchedProduct.capacityAvailable.findIndex(
        c => c === selectedCapacity,
      );

      if (capacityIndex === -1) {
        return;
      }

      setActiveCapacityIndex(capacityIndex);
      setProductName(
        buildProductName(fetchedProduct, capacityIndex, activeColorIndex),
      );

      const newProductId = `${fetchedProduct.namespaceId}-${normalize(selectedCapacity)}-${normalize(fetchedProduct.colorsAvailable[activeColorIndex])}`;

      navigate(`/${category}/${newProductId}`, { replace: true });
    },
    [fetchedProduct, activeColorIndex, category, navigate, buildProductName],
  );

  useEffect(() => {
    if (!fetchedProduct || !productId) {
      return;
    }

    const { capacity: initialCapacity, color: initialColor } =
      getColorAndCapacityFromUrl(productId, fetchedProduct);

    const capacityIndex = fetchedProduct.capacityAvailable.findIndex(
      c => c === initialCapacity,
    );
    const colorIndex = fetchedProduct.colorsAvailable.findIndex(
      c => c === initialColor,
    );

    setActiveCapacityIndex(capacityIndex >= 0 ? capacityIndex : 0);
    setActiveColorIndex(colorIndex >= 0 ? colorIndex : 0);

    const colorKey = normalize(initialColor);
    const filteredImages = fetchedProduct.images.filter(img =>
      img.toLowerCase().includes(colorKey),
    );

    setImages(
      filteredImages.length > 0 ? filteredImages : fetchedProduct.images,
    );
    setProductName(
      buildProductName(
        fetchedProduct,
        capacityIndex >= 0 ? capacityIndex : 0,
        colorIndex >= 0 ? colorIndex : 0,
      ),
    );
  }, [fetchedProduct, productId, getColorAndCapacityFromUrl, buildProductName]);

  if (loading) {
    return <Loader />;
  }

  if (error || !fetchedProduct) {
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
          product={fetchedProduct}
          showDiscount={showDiscount}
          activeIndex={activeColorIndex}
          setActiveIndex={setActiveColorIndex}
          onColorChange={handleColorChange}
          activeCapacityIndex={activeCapacityIndex}
          setActiveCapacityIndex={setActiveCapacityIndex}
          handleCapacitySelect={handleCapacitySelect}
        />
      </div>

      <ProductDescription details={fetchedProduct} />
      <RandomProducts />
    </div>
  );
};
