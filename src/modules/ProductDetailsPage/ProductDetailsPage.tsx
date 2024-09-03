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
import { LimitedProduct } from '../../types/Product';

export const ProductDetailsPage: React.FC = () => {
  const category = useLocation().pathname.slice(1);
  console.log('CATEGORY DLA PREVIOUS PAGE', category);

  const {
    clickedProduct,
    previousCurrentPage,
    setClickedProduct,
    productDetails,
    setProductDetails,
    fetchedCategory,
    setFetchedCategory,
    products,
    setProducts
  } = useAppContext();

  const [isLoading, setIsLoading] = useState<true | false>(true);

  const query = new URLSearchParams(useLocation().search);
  const productName = query.get('name');

  useEffect(() => {
    if (products.length === 0) {
      const fetchProductData = async () => {
        try {
          const response = await fetch(`https://meljaszuk.github.io/react_phone-catalog/api/products.json`);
          const data = await response.json();
          setProducts(data);
          console.log('FETCHED PRODUCTS', data);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };

      fetchProductData();
    }
  }, [products, setProducts]);

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
            const decodedProductName = decodeURIComponent(productName);
            console.log('decodedProductName', decodedProductName);
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
  }, [clickedProduct, productName, setFetchedCategory]);

  useEffect(() => {
    console.log(clickedProduct); // tu jest problem na CLIKED PRODUCTS = undefined
    if (fetchedCategory !== undefined && clickedProduct !== undefined) {
      const callback = (a: { id: string }) => a.id === clickedProduct.itemId;
      const details = fetchedCategory.find(callback);
      setProductDetails(details);
      console.log('fetched details for product', details);
    }
  }, [fetchedCategory, clickedProduct, setProductDetails]);

  const [dynamicColor, setDynamicColor] = useState<string>('');
  const [dynamicCapacity, setDynamicCapacity] = useState<string>('');

  const location = useLocation();

  useEffect(() => {
    let currentUrl = `${location.pathname}`;
    console.log('XXXXXXXXXXXXXXXX', clickedProduct, currentUrl);

    if (clickedProduct === undefined) {
      let currentUrl = `${location.pathname}`;
      console.log(currentUrl);

      const newClickedProductId = currentUrl.slice(9, currentUrl.length);
      const newClickedProduct = products.find((item: LimitedProduct) => item.itemId.toLowerCase() === newClickedProductId);

      console.log(newClickedProductId, newClickedProduct, products);
    }
  }, [location, clickedProduct, products]);

  return (
    <div className={styles.productDetailsPageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        {isLoading ? (
          <Loader />
        ) : clickedProduct === undefined ? (
          <div className={styles.noProductContainer}>
            <div className={styles.noProduct}>No products to display</div>
            <img src="img/product-not-found.png" className={styles.imageNotFound} />
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
