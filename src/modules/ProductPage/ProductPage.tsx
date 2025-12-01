import React, { useEffect, useState } from 'react';
import PageHeader from '../shared/components/PageHeader/PageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '@/types/Product';
import styles from './ProductPage.module.scss';
import ProductGallery from './ProductGallery';
import { getProductDetails } from '@/api/api';
import { ProductDetails } from '@/types/ProductDetails';

const ProductPage: React.FC = () => {
  const { category, productSlug } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  // const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getProductDetails(category)
      .then(products => {
        console.log(products);

        const foundProduct = products.find(p => p.id === productSlug);
        setProduct(foundProduct || null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productSlug]);

  return (
    <>
      <PageHeader
        title={product ? product.name : ''}
        variant="productPage"
        extraContent={
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.4708 3.52864C10.2104 3.26829 9.78829 3.26829 9.52794 3.52864L5.52794 7.52864C5.26759 7.78899 5.26759 8.2111 5.52794 8.47145L9.52794 12.4714C9.78829 12.7318 10.2104 12.7318 10.4708 12.4714C10.7311 12.2111 10.7311 11.789 10.4708 11.5286L6.94216 8.00004L10.4708 4.47145C10.7311 4.2111 10.7311 3.78899 10.4708 3.52864Z"
                fill="#313237"
              />
            </svg>
            <span className={styles.backBtnText}>Back</span>
          </button>
        }
      />
      <section className="product-hero">
        <ProductGallery photos={product?.images} />
        {/* <ProductConfigurator /> */}
      </section>
    </>
  );
};

export default ProductPage;
