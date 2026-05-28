/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { routes } from '../../router/routes';

import styles from './ItemCard.module.scss';
import { ProductCatalogAPI } from '../../types/api.types';
import { ItemCardGallery } from '../../components/ItemCardGallery';
import { ItemCardShortDetail } from '../../components/ItemCardShortDetail';

import ChevronRight from '/img/ChevronRight.png';
import { ItemCardDescription } from '../../components/ItemCardDescription';
import { ProductСarousel } from '../../components/ProductСarousel';
import { useSuggestedProducts } from '../../hooks/useSuggestedProducts';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

const ItemCard = () => {
  const [allProducts, setAllProducts] = useState<ProductCatalogAPI[]>([]);
  const [product, setProduct] = useState<ProductCatalogAPI | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { state } = useLocation();
  const { category, id } = useParams<{
    category: 'phones' | 'accessories' | 'tablets';
    id: string;
  }>();

  const from =
    state?.from ||
    (() => {
      switch (category) {
        case 'phones':
          return routes.phones;
        case 'accessories':
          return routes.accessories;
        case 'tablets':
          return routes.tablets;
        default:
          return routes.home;
      }
    })();

  const apiRequest = ` ${import.meta.env.BASE_URL}api/${category}.json`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    setIsLoading(true);

    fetch(apiRequest)
      .then(res => res.json())
      .then((data: ProductCatalogAPI[]) => {
        setAllProducts(data);
        const foundProduct = data.find(item => item.id === id);

        setProduct(foundProduct || null);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [apiRequest, id]);

  useEffect(() => {
    const foundProduct = allProducts.find(item => item.id === id);

    setProduct(foundProduct || null);
  }, [allProducts, id]);

  const suggestedProducts = useSuggestedProducts(
    allProducts,
    product?.id || '',
    25,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <div className={styles.itemCard}>
      <Breadcrumbs category={category} productName={product.name} from={from} />

      <Link to={from} className={styles.itemCard__back}>
        <img
          src={ChevronRight}
          alt="Back"
          className={styles.itemCard__back_icon}
        />
        Back
      </Link>

      <h1 className={styles.itemCard__title}>
        {product?.name || 'Product not found'}
      </h1>

      <div className={styles.itemCard__content}>
        <div className={styles.itemCard__main}>
          <ItemCardGallery productImg={product.images} />
          <ItemCardShortDetail
            product={product}
            allProducts={allProducts}
            setProduct={setProduct}
          />
        </div>
        <ItemCardDescription product={product} />
        <ProductСarousel
          title="You may also like"
          products={suggestedProducts}
        />
      </div>
    </div>
  );
};

export default ItemCard;
