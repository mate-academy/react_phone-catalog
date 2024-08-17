import React, { useState, useEffect } from 'react';
import styles from './ProductDetailsPage.module.scss'
import chevronIcon from '../../img/icons/ChevronIcon.svg';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useAppContext } from '../../context/AppContext';
import { useLocation } from 'react-router-dom';
import { PreviousPage } from '../../components/PreviousPage';
import { Link } from 'react-router-dom';
import { ImageGallery } from './components/ImageGallery';
import { TechSpecs } from './components/TechSpecs';
import { Description } from './components/Description';
import { MainControls } from './components/MainControls';
import { Loader } from '../../components/Loader';
import { ProductPhone, ProductTablet, ProductAccessory } from '../../types/Product';



export const ProductDetailsPage: React.FC = () => {
  const category = useLocation().pathname.slice(1)
  const { clickedProductId, previousCurrentPage } = useAppContext();
  console.log('PAGE CLICKED',category)
  const [isLoading, setIsLoading] = useState(true);
  const[fetchedProducts,setFetchedProducts] = useState<(ProductPhone | ProductTablet | ProductAccessory)[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`https://meljaszuk.github.io/react_phone-catalog/api/products.json`);
        const data = await response.json();
        setFetchedProducts(data);
        console.log('FETCHED PRODUCTS', data)
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };


    fetchProductData();
    setIsLoading(false);
    console.log(fetchedProducts)
  }, [category]);

  return (
    <div>
       {isLoading ? (
        <Loader />
      ) : (
      <div className={styles.productDetailsPage}>
        <PreviousPage category= {category}/>
        <Header />
        <div className={styles.container}>
          {/* <Breadcrumbs product={productDetails} /> */}
        <button /* onClick={() => navigate(-1)} */ className={styles.goBackButton}>
          <img src={chevronIcon} alt="home" className={styles.chevronIcon} />
          <div className={styles.goBackText}>
            <Link to={`/${previousCurrentPage[0]}`}>
              <div>Back</div>
            </Link>
          </div>
        </button>

        <h2 className={styles.title}>Cliked Product ID: {clickedProductId}</h2>
        <div className={styles.goBackText}>
          Component under construction
        </div>
        <ImageGallery />
        <MainControls />
        <Description  />
        <TechSpecs />
      </div>

      {/* <ProductsSlider title="You may also like" products={suggestedProducts} /> */}
      <Footer />
    </div>

      )}
    </div>

  );
};


