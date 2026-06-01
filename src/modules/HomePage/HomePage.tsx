import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { fetchListProducts, getHotProducts } from '../../services/products';
import { ProductsSlider } from './components/ProductsSlider';
import { PicturesSlider } from './components/PicturesSlider';
import { CategoryLinks } from './components/CategoryLinks';
import { getAssetPath } from '../../utils/assets';
import styles from './HomePage.module.scss';
import type { Product } from '../../types';

const newModelCards = [
  {
    itemId: 'apple-iphone-14-pro-128gb-spaceblack',
    name: 'Apple iPhone 14 Pro 128GB Silver (MQQ23)',
    image: 'img/figma/new-iphone-14-pro-silver.png',
    price: 999,
  },
  {
    itemId: 'apple-iphone-14-128gb-purple',
    name: 'Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3)',
    image: 'img/figma/new-iphone-14-pro-purple.png',
    price: 999,
  },
  {
    itemId: 'apple-iphone-14-pro-128gb-gold',
    name: 'Apple iPhone 14 Pro 128GB Gold (MQ083)',
    image: 'img/figma/new-iphone-14-pro-gold.png',
    price: 999,
  },
  {
    itemId: 'apple-iphone-11-128gb-red',
    name: 'Apple iPhone 14 Plus 128GB PRODUCT Red (MQ513)',
    image: 'img/figma/new-iphone-14-plus-red.png',
    price: 859,
  },
];

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchListProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.empty}>
        Something went wrong. Please try again later.
      </div>
    );
  }

  const hotProducts = getHotProducts(products, 8);
  const newestProducts = newModelCards
    .map(card => {
      const product = products.find(item => item.itemId === card.itemId);

      if (!product) {
        return null;
      }

      return {
        ...product,
        name: card.name,
        image: getAssetPath(card.image),
        price: card.price,
        fullPrice: card.price,
        screen: product.screen ?? '6.1" OLED',
        capacity: '128 GB',
        ram: product.ram ?? '6 GB',
      };
    })
    .filter((product): product is Product => Boolean(product));
  const slides = [
    getAssetPath('img/figma/banner-iphone-14-pro.png'),
    getAssetPath('img/figma/hero-iphone-11-pro-green.png'),
    getAssetPath('img/figma/hero-iphone-11-red.png'),
  ];

  return (
    <main className={styles.page}>
      <h1>Welcome to Nice Gadgets store!</h1>
      <section className={styles.hero}>
        <PicturesSlider images={slides} />
      </section>
      <section className={styles.section}>
        <ProductsSlider
          title="Brand new models"
          products={newestProducts}
          showDiscount={false}
        />
      </section>
      <section className={styles.section}>
        <h2>Shop by category</h2>
        <CategoryLinks />
      </section>
      <section className={styles.section}>
        <ProductsSlider title="Hot prices" products={hotProducts} />
      </section>
    </main>
  );
};
