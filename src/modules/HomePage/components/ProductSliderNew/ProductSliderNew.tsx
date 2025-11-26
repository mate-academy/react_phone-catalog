import React, { useState, useEffect } from 'react';
import AddToCartButton from '../AddToCart/AddToCart'; 
import { useCart } from '../../../CartPage/CartContext';
import { Product } from '../../../../types/ProductTypes/Product'; 
import { Link } from 'react-router-dom';
import styles from './ProductSliderNew.module.scss'; 
import AddToFavoritesButton from '../AddToFavorite/AddToFavorite';


interface ProductWithDetails extends Product {
  screen?: string;
  capacity?: string;
  ram?: string;
}

const ProductsSliderNew: React.FC = () => {
  const [products, setProducts] = useState<ProductWithDetails[]>([]);
  const { addToCart } = useCart(); 

  useEffect(() => {
    fetch('/api/products.json')
      .then((res) => res.json())
      .then((data: ProductWithDetails[]) => {

        const sorted = data.sort((a, b) => b.year - a.year).slice(0, 4);
        setProducts(sorted);
      });
  }, []);

  if (products.length === 0) return <p>Carregando produtos...</p>;

  const prev = () => {
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      newProducts.unshift(newProducts.pop()!);
      return newProducts;
    });
  };

  const next = () => {
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      newProducts.push(newProducts.shift()!);
      return newProducts;
    });
  };

  return (
    <div className={styles.productSliderContainer}>
      <div className={styles.sliderHeader}>
        <h2>Brand new models</h2> 
        <div className={styles.navigationButtons}>
          <button className={styles.navButton} onClick={prev}>
           
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1L1 7L7 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={styles.navButton} onClick={next}>
            
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 13L7 7L1 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.productCardsWrapper}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            
            <img src={product.image} alt={product.name} className={styles.productImage} />
            <Link to={`/product/${product.itemId}`} className={styles.productName}>
  {product.name}
</Link>


            <p className={styles.productPrice}>${product.price}</p>

           
            <div className={styles.productDetails}>
                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Screen</span>
                    <span className={styles.detailValue}>{product.screen || '6.7" OLED'}</span> 
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Capacity</span>
                    <span className={styles.detailValue}>{product.capacity || '128 GB'}</span> 
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>RAM</span>
                    <span className={styles.detailValue}>{product.ram || '6 GB'}</span> 
                </div>
            </div>

            
            <div className={styles.actions}>
              <AddToCartButton product={product} /> 
              <AddToFavoritesButton productId={product.itemId} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsSliderNew;