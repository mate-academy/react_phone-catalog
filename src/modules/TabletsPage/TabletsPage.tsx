import { Catalog } from '../../components/Catalog/Catalog';

import styles from './TabletsPage.module.scss';

import { useEffect, useState } from 'react';

import { TabletDetails } from '../../types';

import { getTablets } from '../../api/tablets';
import { IconTrail } from '../../components/IconTrail/IconTrail';
import { ErrorPage } from '../ErrorPage';

export const TabletsPage = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  const [tablets, setTablets] = useState<TabletDetails[]>([]);

  useEffect(() => {
    setHasError(false);

    getTablets()
      .then(tablet => {
        setTablets(tablet);
      })

      .catch(() => {
        setHasError(true);
      });
  }, []);

  return (
    <>
      {hasError ? (
        <ErrorPage title="Error loading tablets." />
      ) : (
        <div className={styles.tablets}>
          <IconTrail name="Tablets" choseProduct={null} />

          <section className={styles.tablets__title}>
            <h1>Tablets</h1>
          </section>

          <section className={styles.tablets__amount}>
            <p>{tablets.length} models</p>
          </section>

          <Catalog type="tablets" />
        </div>
      )}
    </>
  );
};
