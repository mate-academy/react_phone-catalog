import { Catalog } from '../../components/Catalog/Catalog';

import styles from './PhonePage.module.scss';

import { useEffect, useState } from 'react';

import { PhoneDetails } from '../../types';
import { getPhones } from '../../api/phones';
import { IconTrail } from '../../components/IconTrail/IconTrail';
import { ErrorPage } from '../ErrorPage';

export const PhonePage = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [phones, setPhones] = useState<PhoneDetails[]>([]);

  useEffect(() => {
    setHasError(false);
    getPhones()
      .then(phone => {
        setPhones(phone);
      })
      .catch(() => {
        setHasError(true);
      });
  }, []);

  return (
    <>
      {hasError ? (
        <ErrorPage title="Error loading phones." />
      ) : (
        <div className={styles.phones}>
          <IconTrail name="Phone" choseProduct={null} />

          <section className={styles.phones__title}>
            <h1>Phones</h1>
          </section>

          <section className={styles.phones__amount}>
            <p>{phones.length} models</p>
          </section>

          <Catalog type="phones" />
        </div>
      )}
    </>
  );
};
