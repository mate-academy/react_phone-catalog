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
/* import { LimitedProduct } from '../../types/Product'; */


export const ProductDetailsPage: React.FC = () => {
  const category = useLocation().pathname.slice(1);
  const { clickedProduct, previousCurrentPage, setClickedProduct, productDetails, setProductDetails, fetchedCategory, setFetchedCategory/* , products */} = useAppContext();
  const [isLoading, setIsLoading] = useState<true | false>(true);

  const query = new URLSearchParams(useLocation().search);
  const productName = query.get('name');



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
          if (productName !== null) {
            const decodedProductName = decodeURIComponent(productName)
            console.log('ecodedProductName',decodedProductName)
          }
          const response = await fetch(`https://meljaszuk.github.io/react_phone-catalog/api/${clickedProduct.category}.json`);
          const data = await response.json();
          setFetchedCategory(data);
          console.log(clickedProduct.category);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };
      fetchProductData();
    }
  }, [clickedProduct]);



  useEffect(() => {
    if (fetchedCategory !== undefined && clickedProduct !== undefined) {
      const callback = (a: {id: string}) => a.id === clickedProduct.itemId;
      const details = fetchedCategory.find(callback);
      setProductDetails(details);
      console.log('fetched details for product', details);

    }
  }, [fetchedCategory, clickedProduct]);

  const [dynamicColor, setDynamicColor] = useState<string>('')
  const [dynamicCapacity, setDynamicCapacity] = useState<string>('')
 /*  const [baseURL, setBaseURL] = useState<string>(''); */


/*   console.log('BASE URL',baseURL) */

/*   useEffect (() => {
    if (productDetails !== undefined) {
      let baseURLx=''
      if (productDetails !== undefined) {
        const currentName = productDetails.id.toLowerCase();
        const currentCapacity = productDetails.capacity.toLowerCase()
        const cutIndex = currentName.indexOf(currentCapacity)
       baseURLx = currentName.slice(0, cutIndex).toLowerCase();

      }

      setDynamicCapacity(productDetails.capacity)
      setDynamicColor(productDetails.color)
      setBaseURL(baseURLx);
    }

  },[dynamicCapacity,dynamicColor]) */

/*   console.log('new item diepslayed:::::',baseURL+dynamicCapacity.toLowerCase()+'-'+dynamicColor)
  console.log(dynamicCapacity==='');
  console.log(dynamicColor===''); */

/*   useEffect(() => {
    if(products !== undefined && productDetails !== undefined) {
      const newClikedProduct = baseURL + (dynamicCapacity === '' ? productDetails.capacity : dynamicCapacity) + '-' + (dynamicColor === '' ? productDetails.color : dynamicColor)
      console.log('NEW CLIKED PRODUCt::::::::',newClikedProduct)
    }
  },[]) */

  return (
    <div className={styles.productDetailsPageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        {isLoading ? (
          <Loader />
        ) : clickedProduct === undefined ? (

          <div className={styles.noProductContainer}>
            <div className={styles.noProduct}>No products to display</div>
            <img src="img/product-not-found.png" className={styles.imageNotFound}/>
          </div>
        ) : (
          <div className={styles.container}>
            {productDetails !== undefined && (
              <Breadcrumbs category={productDetails.category} />
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
            <MainControls dynamicColor={dynamicColor} setDynamicColor={setDynamicColor} dynamicCapacity={dynamicCapacity} setDynamicCapacity={setDynamicCapacity} />
            <Description />
            <TechSpecs />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
