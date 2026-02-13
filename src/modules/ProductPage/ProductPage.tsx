import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getCategory } from '../../utils/fetchCategory';
import { Accessory, Phone, Product, Tablet } from '../../types/data';
import styles from './ProductPage.module.scss';
import classNames from 'classnames';
import { Images } from './components/Images/Images';
import { AddForm } from './components/AddForm/AddForm';
import { About } from './components/About/About';
import { TechSpec } from './components/TechSpec/TechSpec';
import { ProductsSlider } from '../shared/ProductsSlider';
import { getProducts } from '../../utils/fetchProducts';
import { BackButton } from '../../components/BackButton/BackButton';
import { Loader } from '../shared/Loader/Loader';

function getSuggestedProducts(count: number, list: Product[]) {
  const result: Product[] = [];
  const newList = [...list];

  for (let i = 0; i < count; i++) {
    const random = Math.floor(Math.random() * newList.length);

    result.push(newList[random]);
    newList.splice(random, 1);
  }

  return result;
}

export const ProductPage: React.FC = () => {
  const { product, itemId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [item, setItem] = useState<Phone | Tablet | Accessory>();
  const [clearId, setClearId] = useState('');
  const [color, setColor] = useState('');
  const [capacity, setCapacity] = useState('');
  const [isInvalidProduct, setIsInvalidProduct] = useState(false);
  const [loaderTech, setLoaderTech] = useState(false);
  const [loaderAdw, setLoaderAdw] = useState(false);

  useEffect(() => {
    if (!product || !itemId) {
      return;
    }

    setLoaderTech(true);
    setLoaderAdw(true);

    getCategory(product)
      .then(result => {
        const it = result.find(r => r.id === itemId);

        if (it) {
          setItem(it);
          setColor(it.color);
          setCapacity(it.capacity);
          const firstCapacityIndex = it.id.lastIndexOf(
            it.capacity.toLowerCase(),
          );

          setClearId(it.id.slice(0, firstCapacityIndex - 1));
        } else {
          setIsInvalidProduct(true);
        }
      })
      .catch(() => setIsInvalidProduct(true))
      .finally(() => setLoaderTech(false));

    getProducts()
      .then(result => {
        const res = [...result];
        const suggested = getSuggestedProducts(10, res);

        setProducts(suggested);
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => setLoaderAdw(false));
  }, [product, itemId]);

  return (
    <div className={classNames(styles.item)}>
      {loaderTech && <Loader />}
      {!loaderTech && isInvalidProduct && <Navigate to="/404" replace />}
      {!loaderTech && item && product && (
        <section className={classNames(styles.item__details)}>
          <div className={classNames(styles.item__back)}>
            <BackButton />
          </div>
          <h2 className={classNames(styles.item__title)}>{item.name}</h2>
          <div className={classNames(styles.item__content)}>
            <div className={classNames(styles.item__images)}>
              <Images imgList={item.images} />
            </div>
            <div className={classNames(styles.item__form)}>
              <AddForm
                colors={item.colorsAvailable}
                capacities={item.capacityAvailable}
                clearId={clearId}
                currentColor={color}
                currentCapacity={capacity}
                resolution={item.resolution}
                processor={item.processor}
              />
            </div>
            <div className={classNames(styles.item__about)}>
              <About description={item.description} />
            </div>
            <div className={classNames(styles.item__tech)}>
              <TechSpec item={item} category={product} />
            </div>
          </div>
          <div className={classNames(styles.item__content)}></div>
        </section>
      )}
      {!loaderAdw && products.length > 0 && (
        <>
          <section className={classNames(styles.item__recomendations)}>
            <ProductsSlider title={'You may also like'} products={products} />
          </section>
        </>
      )}
    </div>
  );
};
