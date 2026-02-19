import styles from './HomePage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Banner } from '../../../components/Banner';
import { ProductSlider } from '../../../components/ProductSlider';
import { ShopByCategory } from '../../../components/ShopByCategory';

const NEW_MODELS = [
  {
    id: 1,
    category: 'phones',
    itemId: 'apple-iphone-14-pro-128gb-gold',
    image: 'img/phones/apple-iphone-14-pro/gold/00.webp',
    name: 'Apple iPhone 14 Pro 128GB Gold (iMT9G2FS/A)',
    price: 999,
    fullPrice: 999,
    screen: "6.1' OLED",
    capacity: '128 GB',
    ram: '6 GB',
  },
  {
    id: 2,
    category: 'phones',
    itemId: 'apple-iphone-14-pro-256gb-spaceblack',
    image: 'img/phones/apple-iphone-14-pro/spaceblack/00.webp',
    name: 'Apple iPhone 14 Pro 256GB Space Black (iMT9G2FS/A)',
    price: 1199,
    fullPrice: 1199,
    screen: "6.1' OLED",
    capacity: '256 GB',
    ram: '6 GB',
  },
  {
    id: 3,
    category: 'phones',
    itemId: 'apple-iphone-11-pro-max-64gb-gold',
    image: 'img/phones/apple-iphone-11-pro-max/gold/00.webp',
    name: 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)',
    price: 799,
    fullPrice: 799,
    screen: "6.5' OLED",
    capacity: '64 GB',
    ram: '4 GB',
  },
  {
    id: 4,
    category: 'phones',
    itemId: 'apple-iphone-13-pro-max-256gb-gold',
    image: 'img/phones/apple-iphone-13-pro-max/gold/00.webp',
    name: 'Apple iPhone 13 Pro Max 256GB Gold (iMT9G2FS/A)',
    price: 859,
    fullPrice: 859,
    screen: "6.7' OLED",
    capacity: '256 GB',
    ram: '6 GB',
  },
];

const HOT_PRICES = [
  {
    id: 5,
    category: 'phones',
    itemId: 'apple-iphone-11-pro-max-64gb-midnightgreen',
    image: 'img/phones/apple-iphone-11-pro-max/midnightgreen/00.webp',
    name: 'Apple iPhone 11 Pro Max 64GB Midnight Green (iMT9G2FS/A)',
    price: 849,
    fullPrice: 1099,
    screen: "6.5' OLED",
    capacity: '64 GB',
    ram: '4 GB',
  },
  {
    id: 6,
    category: 'phones',
    itemId: 'apple-iphone-11-pro-max-256gb-gold',
    image: 'img/phones/apple-iphone-11-pro-max/gold/00.webp',
    name: 'Apple iPhone 11 Pro Max 256GB Gold (iMT9G2FS/A)',
    price: 799,
    fullPrice: 1199,
    screen: "6.5' OLED",
    capacity: '256 GB',
    ram: '4 GB',
  },
  {
    id: 7,
    category: 'phones',
    itemId: 'apple-iphone-11-128gb-purple',
    image: 'img/phones/apple-iphone-11/purple/00.webp',
    name: 'Apple iPhone 11 128GB Purple (iMT9G2FS/A)',
    price: 729,
    fullPrice: 867,
    screen: "6.1' IPS",
    capacity: '128 GB',
    ram: '4 GB',
  },
  {
    id: 8,
    category: 'phones',
    itemId: 'apple-iphone-7-plus-32gb-black',
    image: 'img/phones/apple-iphone-7-plus/black/00.webp',
    name: 'Apple iPhone 7 Plus 32GB Black',
    price: 499,
    fullPrice: 699,
    screen: "5.5' IPS",
    capacity: '32 GB',
    ram: '3 GB',
  },
];

export const HomePage = () => (
  <>
    <Header />
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.heroTitle}>Welcome to Nice Gadgets store!</h1>
        <Banner />
        <ProductSlider title="Brand new models" products={NEW_MODELS} />
        <ShopByCategory />
        <ProductSlider title="Hot prices" products={HOT_PRICES} />
      </div>
    </main>
    <Footer />
  </>
);
