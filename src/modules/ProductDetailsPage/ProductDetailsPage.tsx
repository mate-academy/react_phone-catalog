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
  const [images, setImages] = useState<string[]>([]);
  const [productName, setProductName] = useState('');

  const colorFromQuery = query.get('color');
  const pathSegments = location.pathname.split('/');
  const category = location.state?.category || pathSegments[1];

  const { product, error, loading } = useProductDetails(productId, category);

  const updateProductState = useCallback(
    (color: string) => {
      if (!product) {
        return;
      }

      const newImages = product.images.map(img =>
        img.replace(
          product.color.toLowerCase().replace(' ', '-'),
          color.toLowerCase(),
        ),
      );

      setImages(newImages);

      const nameParts = product.name.split(' ');

      nameParts[nameParts.length - 1] =
        color.charAt(0).toUpperCase() + color.slice(1);
      setProductName(nameParts.join(' '));

      setActiveIndex(product.colorsAvailable.indexOf(color));
    },
    [product],
  );

  useEffect(() => {
    if (product) {
      const defaultColor = colorFromQuery || product.color;

      updateProductState(defaultColor);
    }
  }, [product, colorFromQuery, updateProductState]);

  const handleColorChange = (color: string) => {
    if (!product) {
      return;
    }

    updateProductState(color);
    navigate(
      {
        pathname: location.pathname,
        search: `?color=${color}`,
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
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onColorChange={handleColorChange}
        />
      </div>
    </div>
  );
};
