import React, { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './ProductDetailsHeroSection.module.scss';
import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import { ProductDetailsContext } from '@/context/ProductDetailsContext';

export const ProductDetailsHeroSection: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const category = useLocation().pathname.split('/')[1];
  const context = useContext(ProductDetailsContext);

  if (!context) {
    throw new Error(
      'ProductDetailsHeroSection must be used within a ProductDetailsProvider',
    );
  }

  const { getProduct } = context;
  const product = getProduct(category, itemId!);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.page}>
      {/* <Breadcrumbs /> */}
      <h1>{product.name}</h1>
      <img src={product.images[0]} alt={product.name} />
      <p>Price: {product.priceDiscount} $</p>
      <p>Full Price: {product.priceRegular} $</p>
      <p>Color: {product.color}</p>
      <p>Capacity: {product.capacity}</p>

      {/* Специфичные характеристики */}
      {category === 'phones' && (
        <div>
          <p>Screen: {product.screen}</p>
          <p>Resolution: {product.resolution}</p>
          <p>Processor: {product.processor}</p>
          <p>RAM: {product.ram}</p>
          <p>Camera: {product.camera}</p>
          <p>Zoom: {product.zoom}</p>
          <p>Cell: {product.cell?.join(', ')}</p>
        </div>
      )}
      {category === 'tablets' && (
        <div>
          <p>Screen: {product.screen}</p>
          <p>Resolution: {product.resolution}</p>
          <p>Processor: {product.processor}</p>
          <p>RAM: {product.ram}</p>
          <p>Camera: {product.camera}</p>
          <p>Zoom: {product.zoom}</p>
        </div>
      )}
      {category === 'accessories' && (
        <div>
          <p>Screen: {product.screen || 'N/A'}</p>
          <p>Capacity: {product.capacity}</p>
        </div>
      )}

      <section>
        <h2>About</h2>
        {product.description.map(
          (desc: { title: string; text: string[] }, index: number) => (
            <div key={index}>
              <h3>{desc.title}</h3>
              {desc.text.map((text: string, i: number) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          ),
        )}
      </section>
    </div>
  );
};
