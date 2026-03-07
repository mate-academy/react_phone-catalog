import { Preview } from '../../components/layout/Preview';
import { ProductColection } from '../../components/layout/ProductColection';
import { PageTitle } from '../../components/ui/PageTitle';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const images = ['/img/Banner.png', '/img/Banner.png', '/img/Banner.png'];

  return (
    <>
      <div className={styles.container}>
        <PageTitle>Welcome to Nice Gadgets store!</PageTitle>
      </div>
      <Preview images={images} />
      <div className={styles.content}>
        <ProductColection />
      </div>
    </>
  );
};
