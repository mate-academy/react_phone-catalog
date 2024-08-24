import React, { useState, useEffect } from 'react';
import styles from './ProductDetailsPage.module.scss';
import chevronIcon from '../../img/icons/ChevronIcon.svg';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useAppContext } from '../../context/AppContext';
import { useLocation, Link } from 'react-router-dom';
import { PreviousPage } from '../../components/PreviousPage';
import { ImageGallery } from './components/ImageGallery';
import { TechSpecs } from './components/TechSpecs';
import { Description } from './components/Description';
import { MainControls } from './components/MainControls';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const ProductDetailsPage: React.FC = () => {
  const category = useLocation().pathname.slice(1);
  const { clickedProduct, previousCurrentPage, setClickedProduct } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedProduct = localStorage.getItem('clickedProduct');
    if (savedProduct) {
      setClickedProduct(JSON.parse(savedProduct));
    }
    setIsLoading(false);
  }, [setClickedProduct]);

  return (
    <div className={styles.productDetailsPageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        {isLoading ? (
          <Loader />
        ) : clickedProduct === undefined ? (
          <div>No products to display</div>
        ) : (
          <div className={styles.container}>
            {clickedProduct !== undefined && (
              <Breadcrumbs category={clickedProduct.category} />
            )}

            <PreviousPage category={category} />

            <button className={styles.goBackButton}>
              <img src={chevronIcon} alt="home" className={styles.chevronIcon} />
              <div className={styles.goBackText}>
                <Link to={`/${previousCurrentPage[0]}`}>
                  <div className={styles.label}>Back</div>
                </Link>
              </div>
            </button>

            <h2 className={styles.title}>{clickedProduct.name}</h2>

            <div className={styles.goBackText}>Component under construction</div> {/* / REMOVE LATER */}

            <ImageGallery />
            <MainControls clickedProduct={clickedProduct}/>
            <Description />
            <TechSpecs />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
