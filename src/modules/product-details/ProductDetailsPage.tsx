import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getAccessories,
  getPhones,
  getTablets,
} from '../../services/product.api';
import { Phone } from '../../types/phone';
import { Tablet } from '../../types/tablet';
import { Accessorie } from '../../types/accessorie';
import styles from './ProductDetailsPage.module.scss';
import { Loader } from '../shared/components/UI/Loader';
import { ProductDetailsList } from './components/ProductDetailsList';
import { ProductSlider } from '../home/components/ProductsSlider';
import { Product } from '../../types/product';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';

type AnyProduct = Phone | Tablet | Accessorie;

const mapToProduct = (item: AnyProduct): Product => {
  return {
    id: item.id,
    category: item.category,
    itemId: item.id,
    name: item.name,
    fullPrice: item.priceRegular,
    price: item.priceDiscount,
    screen: item.screen,
    capacity: item.capacity,
    color: item.color,
    ram: item.ram,
    year: 'year' in item ? item.year : 0,
    image: item.images[0] || '',
  };
};

export const ProductDetailsPage = () => {
  const { productId } = useParams<{
    productId: string;
  }>();
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [productDetail, setProductDetail] = useState<AnyProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      return;
    }

    let isMounted = true;

    setLoading(true);

    const fetchData = async () => {
      try {
        const [phones, tablets, accessories] = await Promise.all([
          getPhones(),
          getTablets(),
          getAccessories(),
        ]);

        if (!isMounted) {
          return;
        }

        const allProducts: AnyProduct[] = [
          ...phones,
          ...tablets,
          ...accessories,
        ];
        const foundProduct = allProducts.find(
          product => product.id === productId,
        );

        if (foundProduct) {
          setProductDetail(foundProduct);

          const filteredProducts = allProducts.filter(
            product => product.id !== productId,
          );

          const shuffled = [...filteredProducts].sort(
            () => Math.random() - 0.5,
          );
          const randomCards = shuffled.slice(0, 8).map(mapToProduct);

          setRandomProducts(randomCards);
        } else {
          setProductDetail(null);
          setRandomProducts([]);
        }
      } catch (error) {
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!productDetail) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  return (
    <div className={styles.productDetailsPage}>
      <div className={styles.container}>
        <Breadcrumbs />

        <ProductDetailsList
          products={[productDetail]}
          title={productId || productDetail?.name}
        />
        {randomProducts.length > 0 && (
          <div className={styles.sliderWrapper}>
            <ProductSlider
              products={randomProducts}
              title="You may also like"
            />
          </div>
        )}
      </div>
    </div>
  );
};
