import React from 'react';
import styles from './ProductDetailsPage.module.scss'
import chevronIcon from '../../img/icons/ChevronIcon.svg';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export const ProductDetailsPage: React.FC = () => {
  return (
    <div className={styles.productDetailsPage}>
      <Header />
      <div className={styles.container}>
        {/* <Breadcrumbs product={productDetails} /> */}
        <button /* onClick={() => navigate(-1)} */ className={styles.goBackButton}>
          <img src={chevronIcon} alt="home" className={styles.chevronIcon} />
          <div className={styles.goBackText}>
            <p>Back</p>
          </div>
        </button>
        <h2 className={styles.title}>Product name</h2>
        {/* <ImageGallery
          images={productDetails.images}
          productName={productDetails.name}
        /> */}
        {/* <MainControls
          productDetails={productDetails}
          setProductDetails={setProductDetails}
          product={product}
        /> */}
        {/* <Description description={productDetails.description} />
        <TechSpecs productDetails={productDetails} /> */}
      </div>

      {/* <ProductsSlider title="You may also like" products={suggestedProducts} /> */}
      <Footer />
    </div>
  );
};


