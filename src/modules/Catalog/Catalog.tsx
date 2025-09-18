// import Slider from './components/Slider';
import styles from './Catalog.module.scss';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import { Header } from '../../components/Header';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';

export const Catalog: React.FC = () => {
  return (
    <>
      <div className={styles.catalogPage}>
        <Header />
        <h1>Catalog Page</h1>
        <BreadCrumbs />
      </div>
    </>
  );
};
