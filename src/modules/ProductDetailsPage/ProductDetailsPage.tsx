import { useEffect, useState } from 'react';
import { ProductDetails } from '../../types/Product';
import { ProductGallery } from './components/ProductGallery';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import styles from './ProductDetailsPage.module.scss';
import { ProductInfo } from './components/ProductInfo';
import { ProductAbout } from './components/ProductAbout';
import { ProductTechSpecs } from './components/ProductTechSpecs';
import { ProductSection } from '../HomePage/components/ProductSection';
import { getSuggestedProducts } from '../../utils/products';
import { useShop } from '../../store/shop/ShopContext';
import { Loader } from '../shared/components/Loader';

export const ProductDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [categoryProducts, setCategoryProducts] = useState<ProductDetails[]>(
    [],
  );
  const { products } = useShop();
  const { productId } = useParams();
  const currentProduct = products.find(product => product.itemId === productId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentProduct) {
      return;
    }

    const loadDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/${currentProduct.category}.json`);
        const data: ProductDetails[] = await response.json();

        setCategoryProducts(data);
        const foundDetails = data.find(
          item => item.id === currentProduct.itemId,
        );

        setProductDetails(foundDetails || null);
      } finally {
        setIsLoading(false);
      }
    };

    loadDetails();
  }, [currentProduct]);

  if (products.length === 0 || isLoading) {
    return <Loader />;
  }

  if (!currentProduct || !productDetails) {
    return <p>Product was not found</p>;
  }

  const breadcrumb =
    currentProduct.category.charAt(0).toUpperCase() +
    currentProduct.category.slice(1);

  const handleColorChange = (newColor: string) => {
    if (!productDetails) {
      return;
    }

    const matchedProduct = categoryProducts.find(
      item =>
        item.namespaceId === productDetails.namespaceId &&
        item.capacity === productDetails.capacity &&
        item.color === newColor,
    );

    if (matchedProduct) {
      navigate(`/product/${matchedProduct.id}`);
    }
  };

  const handleCapacityChange = (newCapacity: string) => {
    if (!productDetails) {
      return;
    }

    const matchedProduct = categoryProducts.find(
      item =>
        item.namespaceId === productDetails.namespaceId &&
        item.capacity === newCapacity &&
        item.color === productDetails.color,
    );

    if (matchedProduct) {
      navigate(`/product/${matchedProduct.id}`);
    }
  };

  const suggestedProducts = currentProduct
    ? getSuggestedProducts(products, currentProduct.itemId)
    : [];

  return (
    <main className={styles.main}>
      <div className="container">
        <Breadcrumbs breadcrumb={breadcrumb} currentProduct={currentProduct} />
        <div className={styles.back}>
          <img
            src="img/icon/chevron-arrow-left.svg"
            alt="Arrow Left"
            className={styles.image}
          />
          <Link to={`/${currentProduct.category}`} className={styles.backLink}>
            Back
          </Link>
        </div>
        <h1 className={styles.title}>{currentProduct.name}</h1>

        <div className={styles.content}>
          <ProductGallery productDetails={productDetails} />

          <ProductInfo
            currentProduct={currentProduct}
            productDetails={productDetails}
            onColorChange={handleColorChange}
            onCapacityChange={handleCapacityChange}
          />
        </div>
        <div className={styles.detailsSection}>
          <ProductAbout productDetails={productDetails} />
          <ProductTechSpecs productDetails={productDetails} />
        </div>
      </div>

      <ProductSection
        title="You may also like"
        products={suggestedProducts}
        showDiscount
      />
    </main>
  );
};
