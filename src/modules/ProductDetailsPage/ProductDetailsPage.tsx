import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Product } from '../../types/Product';
import { Breadcrumbs } from '../../components/SheredNavigation/Breadcrumbs';
import { PageTitle } from '../../components/PageTitle';
import { ProductGallery } from './components/ProductGallery';
import { ProductColors } from './components/ProductColors';
import { ProductMemory } from './components/ProductMemory';
import { ProductDescription } from './components/ProductDescription';
import { ProductSpecs } from '../../components/ProductSpecs/ProductSpecs';
import { ProductPrice } from '../../components/ProductPrice/ProductPrice';
import { ProductActions } from '../../components/ProductActions';
import { BackButton } from '../../components/SheredNavigation/BackButton';
import { ProductId } from './components/ProductId';
import { SuggestedProducts } from './components/SuggestedProducts';

import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { category, productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`/api/${category}.json`)
      .then(res => res.json())
      .then((data: Product[]) => {
        setProductList(data);

        const foundProduct = data.find(item => item.id === productId);

        if (foundProduct) {
          setProduct(foundProduct);
        }
      })
      .catch(() => {});
  }, [category, productId]);

  if (!category || !productId) {
    return <p>Invalid URL</p>;
  }

  if (!product) {
    return <p>Loading product...</p>;
  }

  const handleColorChange = (newColor: string) => {
    const newProduct = productList.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === newColor &&
        p.capacity === product.capacity,
    );

    if (newProduct) {
      navigate(`/${category}/${newProduct.id}`);
    }
  };

  const handleCapacityChange = (newCapacity: string) => {
    const newProduct = productList.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.capacity === newCapacity &&
        p.color === product.color,
    );

    if (newProduct) {
      navigate(`/${category}/${newProduct.id}`);
    }
  };

  const price = product.priceDiscount ?? product.price ?? 0;
  const fullPrice = product.priceRegular ?? product.fullPrice ?? price;
  const { name } = product;

  return (
    <div className={styles.page}>
      <Breadcrumbs />
      <BackButton />
      <PageTitle title={name} />

      <div className={styles.top}>
        <div className={styles.gallery}>
          <ProductGallery images={product.images ?? []} />
        </div>

        <div className={styles.info}>
          <div className={styles.colorsRow}>
            <p className={styles.colorsLabel}>Available colors</p>
            <ProductId name={product.name} />
          </div>

          <ProductColors
            colorsAvailable={product.colorsAvailable ?? []}
            currentColor={product.color ?? ''}
            onColorChange={handleColorChange}
          />

          <ProductMemory
            capacities={product.capacityAvailable ?? []}
            currentCapacity={product.capacity ?? ''}
            onCapacityChange={handleCapacityChange}
          />

          <div className={styles.price}>
            <ProductPrice price={price} fullPrice={fullPrice} />
          </div>

          <ProductActions productId={Number(product.id)} />

          <div className={styles.specs}>
            <ProductSpecs product={product} view="card" />
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.description}>
          <ProductDescription description={product.description ?? []} />
        </div>

        <div className={styles.techSpecs}>
          <ProductSpecs product={product} view="details" />
        </div>
      </div>

      <SuggestedProducts currentProductName={product.name} />
    </div>
  );
};
