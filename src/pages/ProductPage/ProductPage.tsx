import { useEffect, useState } from 'react';
import { Product, ShortProduct } from '../../shared/models';
import styles from './ProductPage.module.scss';
import {
  getProductById,
  getProducts,
} from '../../shared/services/products.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Gallery } from './Gallery';
import { AddToCartBtns, FavoriteBtn } from '../../components/ActionBtns';
import { SmallCarousel } from '../HomePage/SmallCarousel/SmallCarousel';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton';
import { NotFoundPage } from '../NotFoundPage';
import { ProductDetailSkeleton } from '../../components/Skeletons';

export const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [currentColor, setColor] = useState<string>('');
  const [currentCapacity, setCapacity] = useState<string>('');
  const [suggested, setSuggested] = useState<ShortProduct[]>([]);
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadPage();
  }, []);

  useEffect(() => {
    loadPage();
    window.scrollTo(0, 0);
  }, [id]);

  const loadPage = () => {
    getSuggestedProducts();
    const loadProducts = async () => {
      try {
        const loaded = await getProductById(id || '');
        setProduct(loaded);
        setColor(loaded?.color || '');
        setCapacity(loaded?.capacity.toLowerCase() || '');
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoad(false);
      }
    };

    loadProducts();
  };

  const getSuggestedProducts = async (count: number = 8) => {
    try {
      const allProducts = await getProducts();

      const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
      const randomProducts = shuffled.slice(0, count);

      setSuggested(randomProducts);
    } catch (error) {
      console.error('Failed to fetch suggested products:', error);
    }
  };

  const getTechArray = (): (keyof Product)[] => {
    if (product) {
      const keys = Object.keys(product);
      const indexAfterDescription = keys.indexOf('description') + 1;
      return keys.slice(indexAfterDescription) as (keyof Product)[];
    }
    return [];
  };

  const handleColorChange = (newColor: string) => {
    if (!id) return;
    const updatedId = id.replace(
      new RegExp(`${currentColor.split(' ').join('-')}$`, 'i'),
      newColor.split(' ').join('-'),
    );
    navigate(`/product/${updatedId}`);
  };

  const handleCapacityChange = (newCapacity: string) => {
    if (!id) return;
    const updatedId = id.replace(
      new RegExp(`${currentCapacity}`, 'i'),
      newCapacity.toLowerCase(),
    );
    navigate(`/product/${updatedId}`);
  };

  if (load) {
    return <ProductDetailSkeleton />;
  }

  if (product) {
    return (
      <div className={`container ${styles.productPage}`}>
        <Breadcrumbs />
        <BackButton />
        <nav className={styles.productPage__nav}></nav>
        <h2>{product.name}</h2>
        <div className={styles.productPage__top}>
          <Gallery photos={product.images} />
          <div className={styles.productPage__actions}>
            <div>
              <div className={styles.productPage__miniHeader}>
                Available colors
              </div>
              <div className={styles.productPage__colors}>
                {product.colorsAvailable.map(color => {
                  return (
                    <div
                      onClick={() => handleColorChange(color)}
                      className={`${styles.productPage__color} ${currentColor === color ? styles.productPage__color_active : ''}`}
                    >
                      <div style={{ backgroundColor: `${color}` }}></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.productPage__capacityContainer}>
              <div className={styles.productPage__miniHeader}>
                Select capacity
              </div>
              <div className={styles.productPage__capacities}>
                {product.capacityAvailable.map(capacity => {
                  return (
                    <span
                      onClick={() => handleCapacityChange(capacity)}
                      className={`
                          ${styles.productPage__capacity} 
                          ${currentCapacity === capacity.toLowerCase() ? styles.productPage__capacity_active : ''}
                          `}
                    >
                      {capacity}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className={styles.productPage__price}>
              <div className={styles.productPage__price_new}>
                ${product.priceDiscount}
              </div>
              <div className={styles.productPage__price_old}>
                ${product.priceRegular}
              </div>
            </div>
            <div className={styles.productPage__btnContainer}>
              <AddToCartBtns
                assignClassName={styles.addToBagBtn}
                product={product}
              />
              <FavoriteBtn
                product={product}
                assignClassName={styles.favoriteBtn}
              />
            </div>
            <div className={`${styles.table} ${styles.table_mini}`}>
              {getTechArray()
                .slice(0, 4)
                .map(key => (
                  <div className={styles.table__row} key={String(key)}>
                    <div className={styles.table__title}>{key}</div>
                    <div className={styles.table__value}>
                      {Array.isArray(product[key])
                        ? product[key].join(', ')
                        : String(product[key])}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className={styles.productPage__bottom}>
          <div>
            <div className={styles.productPage__subTitle}>About</div>
            {product.description.map(el => {
              return (
                <div className={styles.productPage__paragraph}>
                  <h4>{el.title}</h4>
                  <div>{el.text}</div>
                </div>
              );
            })}
          </div>
          <div>
            <div className={styles.productPage__subTitle}>Tech specs</div>
            <div className={`${styles.productPage__paragraph} ${styles.table}`}>
              {getTechArray().map(key => (
                <div className={styles.table__row} key={String(key)}>
                  <div className={styles.table__title}>{key}</div>
                  <div className={styles.table__value}>
                    {Array.isArray(product[key])
                      ? product[key].join(', ')
                      : String(product[key])}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <SmallCarousel
          products={suggested}
          title="You may also like"
          discount={true}
        />
      </div>
    );
  } else {
    return (
      <NotFoundPage
        title="Oops! No signal"
        description="Looks like this gadget hasn’t made it into our system yet."
      />
    );
  }
};
