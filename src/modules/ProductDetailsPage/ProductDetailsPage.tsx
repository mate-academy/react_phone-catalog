import React, { useEffect, useMemo, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { useParams, useLocation } from 'react-router-dom';
import { ProductDetails } from '../../modules/shared/types/ProductDetails';
import productsData from '../../api/products.json';
import { getRandomProducts } from '../../modules/shared/utils/products';
import { RawProductFromApi } from '../../modules/shared/types/Product';
import { ProductBreadcrumbs } from './components/ProductBreadcrumbs';
import { ProductGallery } from './components/ProductGallery';
import { ProductActions } from './components/ProductActions';
import { ProductDescription } from './components/ProductDescription';
import { TechSpecs } from './components/TechSpecs';
import { BackButton } from '../../components/BackButton';
import { ProductSlider } from '../HomePage/components/ProductSlider';
import { Loader } from '../../components/Loader';
import productNotFound from '/img/product-not-found.png';
import { EmptyState } from '../../components/EmptyState';
import { getPublicPath } from '../shared/utils/pathHelper';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { pathname } = useLocation();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const category = product?.category || pathname.split('/')[1];
  const randomProducts = useMemo(() => {
    return getRandomProducts(
      (productsData as RawProductFromApi[]).map(item => ({
        ...item,
        id: item.itemId,
      })),
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(getPublicPath(`/api/${category}.json`))
      .then(response => response.json())
      .then((data: ProductDetails[]) => {
        const foundProduct = data.find(p => p.id === productId);

        if (foundProduct) {
          const normalizedProduct = {
            ...foundProduct,
            id: String(foundProduct.id),
          };

          setProduct(normalizedProduct);
          setSelectedImage(foundProduct.images?.[0] || null);
        } else {
          setProduct(null);
        }
      })
      .catch(() => {
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [productId, category]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="container">
        <BackButton />
        <EmptyState image={productNotFound} message="Product was not found" />
      </div>
    );
  }

  return (
    <div className="container">
      <ProductBreadcrumbs category={category} name={product.name} />

      <BackButton to={`/${product.category}`} />

      <div className="grid">
        <h2 className={styles.mainLable}>{product.name}</h2>

        <ProductGallery
          product={product}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
        />

        <ProductActions product={product} />

        <ProductDescription product={product} />

        <TechSpecs product={product} />

        <div className={styles.recomendationSection}>
          <ProductSlider
            title="You may also like"
            products={randomProducts}
            isDiscountHidden={false}
          />
        </div>
      </div>
    </div>
  );
};
