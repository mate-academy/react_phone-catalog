import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductPictureGallery } from '@components/ProductPictureGallery';
import { ProductPurchasePanel } from '@components/ProductPurchasePanel';
import { ProductDescription } from '@components/ProductDescription';
import { ProductTechSpecs } from '@components/ProductTechSpecs';
import { ProductsSlider } from '@components/ProductsSlider';
import { BackButton } from '@components/BackButton';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { Loader } from '@components/Loader';
import { Product } from '@models/Product';
import { ProductData } from '@models/ProductData';
import { ErrorMessage } from '@models/ErrorMessage';
import { useLoading } from '@context/LoadingContext';
import {
  getAccessories,
  getAllProducts,
  getPhones,
  getTablets,
} from '@api/products';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './ProductDetail.module.scss';

type Props = {
  isLightMode: boolean;
};

export const ProductDetail: React.FC<Props> = ({ isLightMode }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { itemId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<ProductData[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const navigate = useNavigate();
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);

  useEffect(() => {
    if (!itemId) {
      setErrorMessage(ErrorMessage.Other_problems);

      return;
    }

    setProduct(null);
    startLoading();
    const fetchProductDetails = async () => {
      try {
        const allProducts: Product[] = await getAllProducts();

        if (!allProducts || allProducts.length === 0) {
          setErrorMessage(ErrorMessage.No_product_on_server);

          return;
        }

        setProducts(allProducts);

        const shortProduct = allProducts.find(
          (p: Product) => p.itemId === itemId,
        );

        if (!shortProduct) {
          setErrorMessage(ErrorMessage.No_product_on_server);

          return;
        }

        let details: ProductData[] = [];

        switch (shortProduct.category) {
          case 'phones':
            details = await getPhones();
            break;
          case 'tablets':
            details = await getTablets();
            break;
          case 'accessories':
            details = await getAccessories();
            break;
          default:
            setErrorMessage(ErrorMessage.Other_problems);

            return;
        }

        setCategoryProducts(details);
        const fullProduct = details.find(p => p.id === itemId);

        if (!fullProduct) {
          setErrorMessage(ErrorMessage.No_product_on_server);
        } else {
          setProduct(fullProduct);
        }
      } catch (e) {
        setErrorMessage(ErrorMessage.Other_problems);
      } finally {
        stopLoading();
      }
    };

    fetchProductDetails();
  }, [itemId]);

  const handlerSetMainImage = (index: number) => {
    setMainImageIndex(index);
  };

  const getSuggestedProducts = (allProducts: Product[]) => {
    const suggestProduct = allProducts
      .map(x => ({ x, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(a => a.x)
      .slice(0, 16);

    return suggestProduct;
  };

  if (isLoading || (!product && !errorMessage)) {
    return (
      <div className={styles.product}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.product}>
      {!isLoading && !errorMessage && (
        <>
          <Breadcrumbs product={product} isLightMode={isLightMode} />
          <BackButton product={product} navigate={navigate} />
          <h1 className={styles.product__details__title}>{product?.name}</h1>
          <div className={styles.product__details}>
            {product && product.images && (
              <ProductPictureGallery
                images={product?.images}
                mainImageIndex={mainImageIndex}
                setMainImage={handlerSetMainImage}
              />
            )}
            {product && (
              <ProductPurchasePanel
                product={product}
                allProducts={products}
                categoryProducts={categoryProducts}
                isLightMode={isLightMode}
              />
            )}
          </div>
          <div className={styles.product__specification}>
            <ProductDescription product={product} />
            <ProductTechSpecs product={product} />
          </div>
          <div className={styles.product__details__suggests}>
            <h1 className={styles.product__details__title}>
              You may also like
            </h1>
            <ProductsSlider
              products={getSuggestedProducts(products)}
              isLightMode={isLightMode}
            />
          </div>
        </>
      )}
    </div>
  );
};
