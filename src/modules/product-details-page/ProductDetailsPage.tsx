import { Product } from '../../types/Product';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import {
  getAccessories,
  getAllProducts,
  getPhones,
  getTablets,
} from '../../api/products';
import { ProductData } from '../../types/ProductData';
import { Breadcrumbs } from '../shared/components/breadcrumbs';
import { ProductsSlider } from '../shared/components/products-slider';
import {
  ProductFullDescription,
  ProductImageGallery,
  ProductPurchasePanel,
} from './components/components';
import { Loader } from '../shared/components/loader';
import { Back } from '../shared/components/back';

export const ProductDetailsPage = () => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<ProductData[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.pathname.slice(1).split('/')[0];

  useEffect(() => {
    getAllProducts().then(setAllProducts);

    let fetchCategoryProducts;

    switch (category) {
      case 'tablets':
        fetchCategoryProducts = getTablets();
        break;
      case 'accessories':
        fetchCategoryProducts = getAccessories();
        break;
      case 'phones':
      default:
        fetchCategoryProducts = getPhones();
        break;
    }

    fetchCategoryProducts.then(response => {
      const currentProduct = response.find(
        (item: ProductData) => item.id === productId,
      );

      if (currentProduct) {
        setProduct(currentProduct);
        setCategoryProducts(response);
        setMainImageIndex(0);
      } else {
        setNotFound(true);
      }

      setLoading(false);
    });
  }, [category, productId, navigate]);

  const mayLikeProducts = allProducts
    .map(x => ({ x, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(a => a.x)
    .slice(0, 16);

  if (notFound) {
    return (
      <div className={styles.notFound}>
        <h1>Product not found</h1>
        <img
          src="./img/page-not-found.png"
          alt="Product not found"
          className={styles.notFound__image}
        />
      </div>
    );
  }

  if (loading || !product) {
    return <Loader />;
  }

  return (
    <main className={styles.details}>
      <Breadcrumbs />
      <Back />
      <h2 className={styles['details__product-title']}>{product.name}</h2>
      <div className={styles['details__overview-section']}>
        <ProductImageGallery
          images={product.images}
          productName={product.name}
          mainImageIndex={mainImageIndex}
          onImageSelect={setMainImageIndex}
        />
        <ProductPurchasePanel
          product={product}
          allProducts={allProducts}
          categoryProducts={categoryProducts}
        />
      </div>

      <div className={styles['details__description-section']}>
        <ProductFullDescription product={product} />
      </div>

      <h2 className={styles['details__suggestions-title']}>
        You may also like
      </h2>
      <ProductsSlider products={mayLikeProducts} />
    </main>
  );
};
