import React from 'react';
import styles from './ProductDetailsPage.module.scss'
import chevronIcon from '../../img/icons/ChevronIcon.svg';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useAppContext } from '../../context/AppContext';

export const ProductDetailsPage: React.FC = () => {
  const { clickedProductId } = useAppContext();
  return (
    <div className={styles.productDetailsPage}>
      <Header />
      <div className={styles.container}>
        {/* <Breadcrumbs product={productDetails} /> */}
        <button /* onClick={() => navigate(-1)} */ className={styles.goBackButton}>
          <img src={chevronIcon} alt="home" className={styles.chevronIcon} />
          <div className={styles.goBackText}>
            <div>Back</div>
          </div>
        </button>
        <h2 className={styles.title}>Cliked Product ID: {clickedProductId}</h2>
        <div className={styles.goBackText}>
          Component under construction
        </div>
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


