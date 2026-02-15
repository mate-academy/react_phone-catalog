import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './ProductDetailPageStyles.module.scss';
import { Product } from '../../types/ProductTypes';
import { getPhones, getTablets, getAccessories, getSuggestedProducts } from '../../api/api';
import { Loader } from '../../components/Loader/Loader';
import { Tablet } from '../../types/TabletType';
import { Phone } from '../../types/PhoneTypes';
import { Accessory } from '../../types/AccessorieTypes';
import { ProductDetailPhotos } from '../../components/ProductDetailPhotos/ProductDetailPhotos';
import { ProductDetailsCharacters } from '../../components/ProductDetailsCharacters/ProductDetailsCahracters';
import { CardPrice } from '../../components/CardPrice/CardPrice';
import { ButtonsCard } from '../../components/ButtonsCard/ButtonsCard';
import { ProductDetailPartCaharcters } from '../../components/ProductDetailPartCaharcters/ProductDetailPartCaharcters';
import { AboutProduct } from '../../components/AboutProduct/AboutProduct';
import { ProductsSlider } from '../../components/ProductSlider/ProductSlider';

export const ProductDetailPage = () => {
  const { category, productId } = useParams();
  const [product, setProduct] = useState<Phone | Tablet | Accessory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const loadProduct = async () => {
    setLoading(true);
    setError(false);

    try {
      let products: Product[] | Tablet[] | Phone[] | Accessory[] = [];

      switch (category) {
        case 'phones':
          products = await getPhones();
          break;
        case 'tablets':
          products = await getTablets();
          break;
        case 'accessories':
          products = await getAccessories();
          break;
        default:
          throw new Error('Invalid category');
      }

      const found = products.find(p => p.id === productId);
      setProduct(found || null);
    } catch {
      setError(true);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [category, productId]);

  useEffect(() => {
    getSuggestedProducts().then(setSuggestedProducts);
  }, [category, productId]);

  if (loading) return <Loader />;
  if (error) return <p className={styles.errorText}>Failed to load product. Try again later.</p>;
  if (!product) return <p className={styles.errorText}>Product not found.</p>;

  return (
    <div>
      <div className={styles.whereIAm}>
        <Link to="/" className={styles.homeImg}>
          <img src="/react_phone-catalog/img/icons/Home.svg" alt="home" />
        </Link>
        <div className={styles.phonesRight}>
          <p>&gt;</p>
        </div>
        <div className={styles.phonesText}>
          <Link to={`/${product.category}`} className={styles.CategoryText}>
            <p className={styles.CategoryText}>{product.category}</p>
          </Link>
        </div>
        <div className={styles.phonesRight}>
          <p>&gt;</p>
        </div>
        <div className={styles.phonesText}>
          <p className={styles.phonesText}>{product.name}</p>
        </div>
      </div>
      <Link to={`/${product.category}`} className={styles.backToCat}>
        <p className={styles.categoryRight}>&lt;</p>
        <p className={styles.categoryBack}>Back</p>
      </Link>
      <div className={styles.nameText}>
        <h1 className={styles.nameText}>{product.name}</h1>
      </div>
      <div className={styles.productContainer}>
        <ProductDetailPhotos product={product} />
        <div className={styles.productRight}>
          <ProductDetailsCharacters product={product} />

          <CardPrice isExtended={true} product={product} />

          <ButtonsCard isExtendedPage={true} product={product} />

          <ProductDetailPartCaharcters product={product} />
        </div>
      </div>

      <div className={styles.aboutContainer}>
        <AboutProduct product={product} />
      </div>

      <ProductsSlider name="You may also like" products={suggestedProducts} />
    </div>
  );
};
