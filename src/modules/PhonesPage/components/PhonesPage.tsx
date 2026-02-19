import styles from './PhonesPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductsList } from '../../../components/ProductsList';

const PHONES = [
  {
    id: 1,
    category: 'phones',
    itemId: 'apple-iphone-14-pro-128gb-gold',
    image: 'img/phones/apple-iphone-14-pro/gold/00.webp',
    name: 'Apple iPhone 14 Pro 128GB Gold (iMT9G2FS/A)',
    price: 999,
    fullPrice: 1199,
    screen: "6.1' OLED",
    capacity: '128 GB',
    ram: '6 GB',
  },
  {
    id: 2,
    category: 'phones',
    itemId: 'apple-iphone-14-pro-256gb-spaceblack',
    image: 'img/phones/apple-iphone-14-pro/spaceblack/00.webp',
    name: 'Apple iPhone 14 Pro Max 256GB Space Black (iMT9G2FS/A)',
    price: 799,
    fullPrice: 1099,
    screen: "6.1' OLED",
    capacity: '256 GB',
    ram: '6 GB',
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
  },
  {
    id: 4,
    category: 'phones',
    itemId: 'apple-iphone-xs-256gb-silver',
    image: 'img/phones/apple-iphone-xs/silver/00.webp',
    name: 'Apple iPhone X 256GB Silver (iMT9G2FS/A)',
    price: 859,
    fullPrice: 899,
    screen: "5.8' OLED",
    capacity: '256 GB',
    ram: '3 GB',
  },
  {
    id: 5,
    category: 'phones',
    itemId: 'apple-iphone-11-pro-max-64gb-gold',
    image: 'img/phones/apple-iphone-11-pro-max/gold/00.webp',
    name: 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)',
    price: 799,
    fullPrice: 1099,
    screen: "6.5' OLED",
    capacity: '64 GB',
    ram: '4 GB',
  },
  {
    id: 6,
    category: 'phones',
    itemId: 'apple-iphone-11-pro-max-256gb-spacegray',
    image: 'img/phones/apple-iphone-11-pro-max/spacegray/00.webp',
    name: 'Apple iPhone 11 Pro Max 256GB Space Gray (iMT9G2FS/A)',
    price: 799,
    fullPrice: 999,
    screen: "6.5' OLED",
    capacity: '256 GB',
    ram: '4 GB',
  },
  {
    id: 7,
    category: 'phones',
    itemId: 'apple-iphone-13-pro-max-256gb-gold',
    image: 'img/phones/apple-iphone-13-pro-max/gold/00.webp',
    name: 'Apple iPhone 13 Pro Max 256GB Gold',
    price: 859,
    fullPrice: 999,
    screen: "6.7' OLED",
    capacity: '256 GB',
    ram: '6 GB',
  },
  {
    id: 8,
    category: 'phones',
    itemId: 'apple-iphone-7-32gb-black',
    image: 'img/phones/apple-iphone-7/black/00.webp',
    name: 'Apple iPhone 7 32GB Black',
    price: 375,
    fullPrice: 400,
    screen: "4.7' IPS",
    capacity: '32 GB',
    ram: '2 GB',
  },
];

export const PhonesPage = () => (
  <>
    <Header />
    <main className={styles.main}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: 'Phones', to: '/phones' }]} />
        <ProductsList title="Mobile phones" products={PHONES} />
      </div>
    </main>
    <Footer />
  </>
);
