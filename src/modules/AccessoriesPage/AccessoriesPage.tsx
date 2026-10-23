import styles from './AccessoriesPage.module.scss';

import { Catalog } from '../../components/Catalog/Catalog';

import { useEffect, useState } from 'react';

import { getAccessories } from '../../api/accessories';

import { ProductDetails } from '../../types';
import { IconTrail } from '../../components/IconTrail/IconTrail';
import { ErrorPage } from '../ErrorPage';

export const AccessoriesPage = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  const [accessories, setAccessories] = useState<ProductDetails[]>([]);

  useEffect(() => {
    setHasError(false);

    getAccessories()
      .then(accessorie => {
        setAccessories(accessorie);
      })

      .catch(() => {
        setHasError(true);
      });
  }, []);

  return (
    <>
      {hasError ? (
        <ErrorPage title="Error loading accessories." />
      ) : (
        <div className={styles.accessories}>
          <IconTrail name="Accessories" choseProduct={null} />
          <section className={styles.accessories__title}>
            <h1>Accessories</h1>
          </section>

          <section className={styles.accessories__amount}>
            <p>{accessories.length} models</p>
          </section>

          <Catalog type="accessories" />
        </div>
      )}
    </>
  );
};
