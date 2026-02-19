import styles from './FavoritesPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductCard } from '../../../components/ProductCard';

// TODO: replace with real favorites state from context
const FAVORITES = [
  {
    id: 1,
    category: 'phones',
    itemId: 'apple-iphone-14-pro-128gb-silver',
    image: 'img/phones/apple-iphone-14-pro/silver/00.webp',
    name: 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
    price: 999,
    fullPrice: 999,
    screen: "6.1' OLED",
    capacity: '128 GB',
    ram: '6 GB',
    isLiked: true,
  },
  {
    id: 2,
    category: 'phones',
    itemId: 'apple-iphone-11-pro-max-64gb-gold',
    image: 'img/phones/apple-iphone-11-pro-max/gold/00.webp',
    name: 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)',
    price: 799,
    fullPrice: 1099,
    screen: "6.5' OLED",
    capacity: '64 GB',
    ram: '4 GB',
    isLiked: true,
  },
  {
    id: 3,
    category: 'phones',
    itemId: 'apple-iphone-11-128gb-purple',
    image: 'img/phones/apple-iphone-11/purple/00.webp',
    name: 'Apple iPhone 11 128GB Purple (iMT9G2FS/A)',
    price: 799,
    fullPrice: 899,
    screen: "6.2' IPS",
    capacity: '128 GB',
    ram: '4 GB',
    isLiked: true,
  },
  {
    id: 4,
    category: 'phones',
    itemId: 'apple-iphone-xs-256gb-silver',
    image: 'img/phones/apple-iphone-xs/silver/00.webp',
    name: 'Apple iPhone XS 256GB Silver (iMT9G2FS/A)',
    price: 859,
    fullPrice: 899,
    screen: "5.8' OLED",
    capacity: '256 GB',
    ram: '4 GB',
    isLiked: true,
  },
  {
    id: 5,
    category: 'phones',
    itemId: 'apple-iphone-14-pro-128gb-spaceblack',
    image: 'img/phones/apple-iphone-14-pro/spaceblack/00.webp',
    name: 'Apple iPhone 14 Plus 128GB PRODUCT Red (MQ513)',
    price: 859,
    fullPrice: 859,
    screen: "6.7' OLED",
    capacity: '128 GB',
    ram: '6 GB',
    isLiked: true,
  },
];

export const FavoritesPage = () => (
  <>
    <Header />
    <main className={styles.main}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: 'Favourites' }]} />
        <h1 className={styles.title}>Favourites</h1>
        <p className={styles.count}>{FAVORITES.length} items</p>

        <div className={styles.grid}>
          {FAVORITES.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </>
);
