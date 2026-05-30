import { useEffect, useMemo, useState } from 'react';
import { Slider } from './components/Slider';
import styles from './HomePage.module.scss';
import classNames from 'classnames';
import { Categories } from './components/Categories';
import { getProducts } from '../../utils/fetchProducts';
import { CategoryTypes } from '../../types/CategoryTypes';
import { Product } from '../../types/data';
import { ProductsSlider } from '../shared/ProductsSlider';

const images = [
  {
    url: 'img/banners/banner1.png',
    name: 'iphone-14',
    type: 'png',
  },
  {
    url: 'img/banners/banner2.webp',
    name: 'watches',
    type: 'png',
  },
  {
    url: 'img/banners/banner3.png',
    name: 'colours',
    type: 'png',
  },
];

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const newBrands = useMemo(() => {
    const years = products.map(p => p.year);
    const maxYear = Math.max(...years);

    return products.filter(p => p.year === maxYear);
  }, [products]);
  const maxDiscount = [...products].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );
  const phonesCount = products.filter(
    p => p.category === CategoryTypes.Phones,
  ).length;
  const tabletsCount = products.filter(
    p => p.category === CategoryTypes.Tablets,
  ).length;
  const accessoriesCount = products.filter(
    p => p.category === CategoryTypes.Accessories,
  ).length;

  useEffect(() => {
    getProducts()
      .then(result => setProducts(result))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div className={classNames(styles.home)}>
      <h1 className={classNames(styles.home__title)}>
        Welcome to Nice Gadgets store!
      </h1>
      <div className={classNames(styles.home__slider)}>
        <Slider images={images} />
      </div>
      <div className={classNames(styles.home__latest)}>
        <ProductsSlider
          title={'Brand new models'}
          products={newBrands}
          discount={false}
        />
      </div>

      <div className={classNames(styles.home__categories)}>
        <Categories
          phonesCount={phonesCount}
          tabletsCount={tabletsCount}
          accessoriesCount={accessoriesCount}
        />
      </div>
      <div className={classNames(styles.home__discount)}>
        <ProductsSlider
          title={'Hot prices'}
          products={maxDiscount}
          discount={true}
        />
      </div>
    </div>
  );
};
