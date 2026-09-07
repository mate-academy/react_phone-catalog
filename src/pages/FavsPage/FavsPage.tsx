import { useContext } from 'react';
import { Catalog } from '../shared/Catalog/Catalog';
import { ProductContext } from '../../store/ProductContext';
import styles from './FavsPage.module.scss';

export const FavsPage = () => {
  const { favs } = useContext(ProductContext);

  return (
    <div className={styles.favsPage}>
      <div className="container">
        <Catalog products={favs} title="Favourites" noDropdowns={true} />
      </div>
    </div>
  );
};
