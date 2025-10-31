import { useEffect, useState } from 'react';
import { PicturesSlider } from '../../shared/components/PicturesSlider';
import { ProductsSlider } from '../../shared/components/ProductsSlider';
import { ShopByCategory } from '../../shared/components/ShopByCategory';
import styles from './HomePage.module.scss';

type RawProduct = {
  id: string;
  name: string;
  fullPrice: number;
  price: number;
  year: number;
  image: string;
  screen: string;
  capacity: string;
  ram: string;
};

export const HomePage = () => {
  const [all, setAll] = useState<RawProduct[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then((data: RawProduct[]) => setAll(data));
  }, []);

  const toUi = (p: RawProduct) => ({
    id: p.id,
    title: p.name,
    img: p.image,
    price: p.price,
    oldPrice: p.fullPrice > p.price ? p.fullPrice : undefined,
    year: p.year,
    screen: p.screen,
    capacity: p.capacity,
    ram: p.ram,
  });

  const brandNew = [...all]
    .sort((a, b) => b.year - a.year)
    .slice(0, 10)
    .map(toUi);

  const hotPrices = [...all]
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 10)
    .map(toUi);

  return (
    <div className={styles.homePage}>
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <PicturesSlider />
          </div>
        </section>

        {brandNew.length > 0 && (
          <section className={styles.section}>
            <div className={styles.container}>
              <ProductsSlider title="Brand new models" products={brandNew} />
            </div>
          </section>
        )}

        <section className={styles.section}>
          <div className={styles.container}>
            <ShopByCategory />
          </div>
        </section>

        {hotPrices.length > 0 && (
          <section className={styles.section}>
            <div className={styles.container}>
              <ProductsSlider title="Hot prices" products={hotPrices} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
