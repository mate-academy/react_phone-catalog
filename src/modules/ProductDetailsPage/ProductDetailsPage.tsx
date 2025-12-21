import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ProductSpec } from '../ProductSpec';
import { ProductPhotos } from '../ProductPhotos';
import { Loader } from '../shared/Loader';
import { NotFoundProduct } from '../NotFoundProduct';
import { BackBtn } from '../../components/BackBtn';
import { BreadCrumbs } from '../shared/BreadCrumbs';
import styles from './ProductDetailsPage.module.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductDescription } from '../shared/ProductDescription';

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

  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [productName, setProductName] = useState('');
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [activeCapacityIndex, setActiveCapacityIndex] = useState(0);

  const pathSegments = location.pathname.split('/');
  const category = location.state?.category || pathSegments[1];

  useEffect(() => {
    if (!category) {
      return;
    }

    fetch(`/react_phone-catalog/api/${category}.json`)
      .then(res => res.json())
      .then((data: ProductDetails[]) => setProducts(data));
  }, [category]);

  const updateProductName = (
    prod: ProductDetails,
    color: string,
    capacity: string,
  ) => {
    const baseName = getBaseName(prod.name, prod.capacityAvailable);
    const formattedCapacity = formatCapacity(capacity);

    return `${baseName} ${formattedCapacity} ${color}`
      .split(' ')
      .map(word =>
        /\d+(GB|TB)/i.test(word)
          ? word.toUpperCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
      )
      .join(' ');
  };

  useEffect(() => {
    if (!products.length || !productId) {
      return;
    }

    const found = products.find(p => p.id === productId);

    if (!found) {
      setProduct(null);

      return;
    }

    setProduct(found);

    const colorIdx = found.colorsAvailable.findIndex(
      c => c.toLowerCase() === found.color.toLowerCase(),
    );
    const capacityIdx = found.capacityAvailable.findIndex(
      c => c === found.capacity,
    );

    setActiveColorIndex(colorIdx >= 0 ? colorIdx : 0);
    setActiveCapacityIndex(capacityIdx >= 0 ? capacityIdx : 0);

    setImages(found.images);
    setProductName(updateProductName(found, found.color, found.capacity));
  }, [products, productId]);

  const handleColorChange = (color: string) => {
    if (!product || !products.length) {
      return;
    }

    const capacity =
      product.capacityAvailable[activeCapacityIndex] || product.capacity;

    const matchedProduct = products.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color.toLowerCase() === color.toLowerCase() &&
        p.capacity === capacity,
    );

    if (!matchedProduct) {
      return;
    }

    setProduct(matchedProduct);
    setImages(matchedProduct.images);
    setProductName(updateProductName(matchedProduct, color, capacity));
    setActiveColorIndex(
      matchedProduct.colorsAvailable.findIndex(
        c => c.toLowerCase() === color.toLowerCase(),
      ),
    );

    navigate(`/${category}/${matchedProduct.id}`, { replace: true });
  };

  const handleCapacitySelect = (capacity: string) => {
    if (!product || !products.length) {
      return;
    }

    const color = product.colorsAvailable[activeColorIndex] || product.color;

    const matchedProduct = products.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color.toLowerCase() === color.toLowerCase() &&
        p.capacity === capacity,
    );

    if (!matchedProduct) {
      return;
    }

    setProduct(matchedProduct);
    setImages(matchedProduct.images);
    setProductName(updateProductName(matchedProduct, color, capacity));
    setActiveCapacityIndex(
      matchedProduct.capacityAvailable.findIndex(c => c === capacity),
    );

    navigate(`/${category}/${matchedProduct.id}`, { replace: true });
  };

  useEffect(() => {
    if (!product) {
      return;
    }
  }, [product]);

  if (!products.length) {
    return <Loader />;
  }

  if (!product) {
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
    </div>
  );
};
