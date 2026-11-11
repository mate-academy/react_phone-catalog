import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import styles from './ProductPage.module.scss';

// eslint-disable-next-line max-len
import { ProductSelectors } from '../../components/ProductSelectors/ProductSelectors';
// eslint-disable-next-line max-len
import { ProductDescription } from '../../components/ProductDiscription/ProductDescription';
// eslint-disable-next-line max-len
import { RelatedProducts } from '../../components/RelatedProducts/RelatedProducts';

const CATEGORIES = ['phones', 'tablets', 'accessories'];

interface Product {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
}

export const ProductPage = () => {
  const { pathname } = useLocation();
  const category = pathname.split('/')[1];
  const navigate = useNavigate();

  const { productId } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fullProductName = productId
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    Promise.all(
      CATEGORIES.map(name =>
        fetch(`./api/${name}.json`).then(r => r.json() as Promise<Product[]>),
      ),
    )
      .then(lists => {
        const index = lists.findIndex(list =>
          list.some(p => p.id === productId),
        );

        if (index === -1) {
          setError(true);

          return;
        }

        setProducts(lists[index]);

        if (category !== CATEGORIES[index]) {
          navigate(`/${CATEGORIES[index]}/${productId}`, { replace: true });
        }
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const product = products?.find(p => p.id === productId);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Product was not found</h1>;
  }

  return (
    <div className={styles.container}>
      <Breadcrumbs productName={productId} />
      <button
        className={styles.backButton}
        onClick={() => window.history.back()}
      >
        <img
          src="./img/icons/slider/slider-arrow-right-black.svg"
          alt=""
          style={{ width: '16px', height: '16px' }}
        />
        Back
      </button>

      <div className={styles.settingsProducts}>
        <div className={styles.productHeader}>
          <h1 className={styles.productName}>{fullProductName}</h1>
        </div>
        <div className={styles.productContent}>
          <ImageGallery product={product!} />
          <ProductSelectors product={product!} />
        </div>
        <div className={styles.productInfo}>
          <ProductDescription product={product!} />
        </div>
        <RelatedProducts products={products} />
      </div>
    </div>
  );
};
