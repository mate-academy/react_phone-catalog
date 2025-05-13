import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { getProducts, loadProductsType } from '../../../utils/fetchClient';
import Breadcrumbs from '../../shared/components/Breadcrumbs';
import { ArrowIconLeft } from '../../shared/components/ArrowIcon/ArrowIcon';
import ImgSelector from './Components/ImgSelector/ImgSelector';
import SpecsSelector from './Components/SpecsSelector';
import { Item } from '../../../types/item';
import { useNavigate } from 'react-router-dom';
import { Phone } from '../../../types/phone';
import ProductsSlider from '../../ProductsSlider';
import { Product } from '../../../types/product';
import { shuffleArray } from '../../shared/functions';
import { Loader } from '../../shared/components/Loader';

export const ProductDetailsPage = () => {
  const location = useLocation();
  const [type, id] = location.pathname.split('/').filter(item => item !== '');
  const [item, setItem] = useState<Item | null>(null);
  const [fetchResult, setFetchResult] = useState<Item[]>([]);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const descriptionSpecs = [
    { label: 'Screen', value: item?.screen },
    { label: 'Resolution', value: item?.resolution },
    { label: 'Processor', value: item?.processor },
    { label: 'RAM', value: item?.ram },
    { label: 'Built in memory', value: item?.capacity },
  ];

  if (item?.category === 'phones' || item?.category === 'tablets') {
    descriptionSpecs.push(
      { label: 'Camera', value: (item as Phone).camera },
      { label: 'Zoom', value: (item as Phone).zoom },
    );
  }

  useEffect(() => {
    setLoadingError(false);
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const [result, products] = await Promise.all([
          loadProductsType(type),
          getProducts(),
        ]);

        setTimeout(() => {
          setRandomProducts(shuffleArray(products, 10));
          setFetchResult(result);

          setIsLoading(false);
        }, 2000);
      } catch (err) {
        setLoadingError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [item?.namespaceId, type]);

  useEffect(() => {
    setItem(null);

    const product = fetchResult.find(p => p.id === id);

    if (product) {
      setItem(product);
    } else {
      setLoadingError(true);
    }
  }, [fetchResult, id]);

  function handleSpecChange(
    product: Item,
    { color, storage }: { color?: string; storage?: string },
  ) {
    const newProduct = fetchResult.find(
      p =>
        p.namespaceId === product.namespaceId &&
        (color ? p.color === color : p.color === product.color) &&
        (storage ? p.capacity === storage : p.capacity === product.capacity),
    );

    if (newProduct) {
      navigate(`/${type}/${newProduct.id}`);
      setItem(newProduct);
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : loadingError ? (
        <p>Product was not found</p>
      ) : (
        <>
          <div className="container">
            <Breadcrumbs item={item} type={type} />
            <div className={styles.return}>
              <ArrowIconLeft />
              <Link to="..">Back</Link>
            </div>

            {item && (
              <>
                <h2 style={{ marginBottom: '32px' }}>{item.name}</h2>
                <div className={styles.detailsPage}>
                  <ImgSelector item={item} />
                  <SpecsSelector
                    handleSpecChange={handleSpecChange}
                    item={item}
                  />
                </div>
              </>
            )}
          </div>

          <div className={`container ${styles.info}`}>
            <article className={styles.about}>
              <h3 className={styles.about__title}>About</h3>
              <div className={styles.about__description}>
                <hr />
                {item?.description.map((article, i) => (
                  <div key={i} className={styles.about__article}>
                    <h4>{article.title}</h4>
                    <p className={styles.about__text}>{article.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.specs}>
              <h3 className={styles.specs__title}>Tech specs</h3>
              <hr />
              <div className={styles.specs__description}>
                {descriptionSpecs.map((spec, i) => (
                  <div key={i} className={styles['specs__description--item']}>
                    <p className={styles['specs__description--label']}>
                      {spec.label}
                    </p>
                    <p className={styles['specs__description--specsText']}>
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
          <ProductsSlider items={randomProducts} title="You may also like" />
        </>
      )}
    </>
  );
};

export default ProductDetailsPage;
