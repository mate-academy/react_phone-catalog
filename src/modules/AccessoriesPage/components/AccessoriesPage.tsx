import styles from './AccessoriesPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductsList } from '../../../components/ProductsList';

const ACCESSORIES = [
  {
    id: 1,
    category: 'accessories',
    itemId: 'apple-watch-series-6-44mm-blue',
    image: 'img/accessories/apple-watch-series-6/blue/00.webp',
    name: 'Apple Watch Series 6 44mm Blue (MG2E3FS/A)',
    price: 299,
    fullPrice: 399,
    screen: "1.78' OLED",
    capacity: '32 GB',
    ram: '1 GB',
  },
  {
    id: 2,
    category: 'accessories',
    itemId: 'apple-watch-series-5-44mm-silver',
    image: 'img/accessories/apple-watch-series-5/silver/00.webp',
    name: 'Apple Watch Series 5 44mm Silver (MG2E3FS/A)',
    price: 249,
    fullPrice: 349,
    screen: "1.78' OLED",
    capacity: '32 GB',
    ram: '1 GB',
  },
  {
    id: 3,
    category: 'accessories',
    itemId: 'apple-watch-series-4-44mm-gold',
    image: 'img/accessories/apple-watch-series-4/gold/00.webp',
    name: 'Apple Watch Series 4 44mm Gold (MG2E3FS/A)',
    price: 199,
    fullPrice: 279,
    screen: "1.78' OLED",
    capacity: '16 GB',
    ram: '1 GB',
  },
  {
    id: 4,
    category: 'accessories',
    itemId: 'apple-watch-series-3-42mm-spacegray',
    image: 'img/accessories/apple-watch-series-3/space-gray/00.webp',
    name: 'Apple Watch Series 3 42mm Space Gray (MG2E3FS/A)',
    price: 149,
    fullPrice: 199,
    screen: "1.65' OLED",
    capacity: '8 GB',
    ram: '768 MB',
  },
];

export const AccessoriesPage = () => (
  <>
    <Header />
    <main className={styles.main}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: 'Accessories', to: '/accessories' }]} />
        <ProductsList title="Accessories" products={ACCESSORIES} />
      </div>
    </main>
    <Footer />
  </>
);
