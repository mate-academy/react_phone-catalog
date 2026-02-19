import styles from './TabletsPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductsList } from '../../../components/ProductsList';

const TABLETS = [
  {
    id: 1,
    category: 'tablets',
    itemId: 'apple-ipad-pro-11-2021-128gb-silver',
    image: 'img/tablets/apple-ipad-pro-11-2021/silver/00.webp',
    name: 'Apple iPad Pro 11" 128GB Silver (2021)',
    price: 749,
    fullPrice: 899,
    screen: "11' IPS",
    capacity: '128 GB',
    ram: '8 GB',
  },
  {
    id: 2,
    category: 'tablets',
    itemId: 'apple-ipad-pro-11-2021-256gb-spacegray',
    image: 'img/tablets/apple-ipad-pro-11-2021/spacegray/00.webp',
    name: 'Apple iPad Pro 11" 256GB Space Gray (2021)',
    price: 849,
    fullPrice: 999,
    screen: "11' IPS",
    capacity: '256 GB',
    ram: '8 GB',
  },
  {
    id: 3,
    category: 'tablets',
    itemId: 'apple-ipad-mini-6gen-64gb-pink',
    image: 'img/tablets/apple-ipad-mini-6gen/pink/00.webp',
    name: 'Apple iPad Mini 6th Gen 64GB Pink',
    price: 499,
    fullPrice: 599,
    screen: "8.3' IPS",
    capacity: '64 GB',
    ram: '4 GB',
  },
  {
    id: 4,
    category: 'tablets',
    itemId: 'apple-ipad-air-4gen-64gb-green',
    image: 'img/tablets/apple-ipad-air-4gen/green/00.webp',
    name: 'Apple iPad Air 4th Gen 64GB Green',
    price: 599,
    fullPrice: 699,
    screen: "10.9' IPS",
    capacity: '64 GB',
    ram: '4 GB',
  },
];

export const TabletsPage = () => (
  <>
    <Header />
    <main className={styles.main}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: 'Tablets', to: '/tablets' }]} />
        <ProductsList title="Tablets" products={TABLETS} />
      </div>
    </main>
    <Footer />
  </>
);
