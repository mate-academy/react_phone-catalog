import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../shared/componets/Loader/Loader';
import styles from './ProductDetailsPage.module.scss';
import { useProducts } from '../shared/Utills/ProductContext/ProductContext';
import { BreadCrumbs } from '../shared/componets/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../shared/componets/BackButton/BackButton';

import { ImageSlider } from './components/ImageSlider/ImageSlider';
import { About } from './components/About/About';
import { ProductOptions } from './components/ProductOptions/ProductOptions';
import { TechSpec } from './components/TechSpec/TechSpec';
import { ProductFullInfo } from '../shared/Utills/types';
import { AlsoLike } from './components/AlsoLike/AlsoLike';

export const ProductDetailsPage = () => {
  const { products, isLoad } = useProducts();

  const { productId, category } = useParams();

  const selectedProduct = useMemo(() => {
    if (category === 'phones') {
      return products.phones?.find(product => product.id === productId) ?? null;
    }

    if (category === 'accessories') {
      return (
        products.accessories?.find(product => product.id === productId) ?? null
      );
    }

    if (category === 'tablets') {
      return (
        products.tablets?.find(product => product.id === productId) ?? null
      );
    }

    return null;
  }, [products, productId, category]);

  const addToRecomended = (product: ProductFullInfo) => {
    const recomendedProducts = JSON.parse(
      localStorage.getItem('recomendedProducts') || '[]',
    );

    const isProductInRecomended = recomendedProducts.includes(product.id);

    if (!isProductInRecomended) {
      recomendedProducts.push(product.id);

      if (recomendedProducts.length > 10) {
        recomendedProducts.shift();
      }

      localStorage.setItem(
        'recomendedProducts',
        JSON.stringify(recomendedProducts),
      );
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      addToRecomended(selectedProduct);
    }
  }, [selectedProduct]);

  if (isLoad) {
    return <Loader />;
  }

  if (!selectedProduct) {
    return (
      <div className={styles.product_not_found}>
        <h1>Product was not found</h1>

        <div>
          <img
            src="img/product-not-found.png"
            alt="product_not_found_page"
            className={styles.product_not_found_img}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.product__details}>
      <BreadCrumbs />

      <div className={styles.content}>
        <div className={styles.wrapper1}>
          <BackButton />
          <h2>{selectedProduct?.name}</h2>

          <ImageSlider images={selectedProduct?.images} />

          <ProductOptions product={selectedProduct} />
        </div>

        <div className={styles.div}>
          <About selectedProduct={selectedProduct} />

          <TechSpec selectedProduct={selectedProduct} />
        </div>

        <AlsoLike />
      </div>
    </div>
  );
};
