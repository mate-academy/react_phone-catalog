import { Breadcrumbs } from '../../../../components/Breadcrumbs';
import styles from './ProductStructure.module.scss';
import { BackBtn } from '../../../../components/BackBtn';
import { ProductPageSlider } from '../ProductPageSlider';
import { ProductConfig } from '../ProductConfig';
import { AboutProduct } from '../AboutProduct';
import { ProductTechSpec } from '../ProductTechSpec';
import { Product } from '../../../../types/Product';
import React from 'react';

interface Props {
  productList: Product[];
  path: string;
  prevPath: string;
  search: string;
  id: string;
  product: Product;
}

export const ProductStructure: React.FC<Props> = ({
  productList,
  path,
  prevPath,
  search,
  id,
  product,
}) => {
  const { name, images, description } = product;

  return (
    <>
      <Breadcrumbs productList={productList} />
      <section className={styles.container}>
        <BackBtn path={path} prevPath={prevPath} search={search} />
        <h2 className={styles.productTitle}>{name}</h2>
        <ProductPageSlider productName={name} images={images} />
        <ProductConfig
          id={id}
          product={product}
          productList={productList}
          search={search}
          prevPath={prevPath}
        />

        <AboutProduct description={description} />
        <ProductTechSpec product={product} />
      </section>
    </>
  );
};
