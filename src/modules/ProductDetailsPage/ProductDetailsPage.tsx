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
import { getHotPriceProducts } from '../../utils/products';
import { useShop } from '../../store/ShopContext';

export const ProductDetailsPage = () => {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [categoryProducts, setCategoryProducts] = useState<ProductDetails[]>(
    [],
  );
  const { products } = useShop();
  const { productId } = useParams();
  const currentProduct = products.find(product => product.itemId === productId);
  const hotPriceProducts = getHotPriceProducts(products);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentProduct) {
      return;
    }

    const loadDetails = async () => {
      const response = await fetch(`/api/${currentProduct.category}.json`);
      const data: ProductDetails[] = await response.json();

      setCategoryProducts(data);

      const foundDetails = data.find(item => item.id === currentProduct.itemId);

      setProductDetails(foundDetails || null);
    };

    loadDetails();
  }, [currentProduct]);

  if (!currentProduct) {
    return;
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

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Breadcrumbs breadcrumb={breadcrumb} currentProduct={currentProduct} />
        <div className={styles.back}>
          <img
            src="/img/icon/chevron-arrow-left.svg"
            alt="Arrow Left"
            className={styles.image}
          />
          <Link to={`/${currentProduct.category}`} className={styles.backLink}>
            Back
          </Link>
        </div>
        <h1 className={styles.title}>{currentProduct.name}</h1>

        <div className={styles.content}>
          {productDetails && <ProductGallery productDetails={productDetails} />}

          {productDetails && (
            <ProductInfo
              productDetails={productDetails}
              onColorChange={handleColorChange}
              onCapacityChange={handleCapacityChange}
            />
          )}
        </div>
        <div className={styles.detailsSection}>
          {productDetails && <ProductAbout productDetails={productDetails} />}
          {productDetails && (
            <ProductTechSpecs productDetails={productDetails} />
          )}
        </div>
        <ProductSection
          title="You may also like"
          products={hotPriceProducts}
          showDiscount
        />
      </div>
    </main>
  );
};
