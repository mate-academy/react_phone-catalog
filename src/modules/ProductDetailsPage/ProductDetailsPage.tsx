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
import { Product } from '../../types/Product';

export const ProductDetailsPage: React.FC = () => {
  const category = useLocation().pathname.slice(1);
  const { clickedProduct, previousCurrentPage, setClickedProduct} = useAppContext();
  const [isLoading, setIsLoading] = useState<true | false>(true);
  const [fetchedCategory, setFetchedCategory] = useState<Product[]>()

  useEffect(() => {
    const savedProduct = localStorage.getItem('clickedProduct');
    if (savedProduct) {
      setClickedProduct(JSON.parse(savedProduct));
    }
    setIsLoading(false);
  }, [setClickedProduct]);

  useEffect(() => {
    if (clickedProduct !== undefined) {
      const fetchProductData = async () => {
        try {
          const response = await fetch(`https://meljaszuk.github.io/react_phone-catalog/api/${clickedProduct.category}.json`);
          const data = await response.json();
          setFetchedCategory(data);
          console.log(clickedProduct.category) /* string */
          console.log(fetchedCategory) /* array of objects PROBLEM IS HERE unfined*/
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };
      fetchProductData();
    }

  }, [clickedProduct]);


 let productDetails;

  useEffect(() => {
    console.log(clickedProduct)

    if (clickedProduct !== undefined && fetchedCategory !== undefined) {
      const callback = (a: {id: string}) => a.id === clickedProduct.itemId;
      productDetails = clickedProduct ? fetchedCategory.find(callback) : undefined;
      console.log('fetched details for product',productDetails)
    }
  },[clickedProduct])

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
            <MainControls productDetails={productDetails !== undefined ? productDetails : undefined} />
            <Description productDetails={productDetails !== undefined ? productDetails : undefined}/>
            <TechSpecs productDetails={productDetails !== undefined ? productDetails : undefined}/>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
