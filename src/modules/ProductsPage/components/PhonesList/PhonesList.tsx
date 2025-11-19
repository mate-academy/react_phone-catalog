import React from 'react';
import { Phone } from '../../../../types/ProductTypes/Phone';
import PhoneCard from '../Cards/PhoneCard/PhoneCard';
import styles from './PhonesList.module.scss'; // Importa os estilos do módulo SCSS

type PhonesListProps = {
  products: Phone[];
};

const PhonesList: React.FC<PhonesListProps> = ({ products }) => {
  if (products.length === 0) return <p className={styles.noPhones}>There are no phones yet.</p>;

  return (
    <div className={styles.phonesListContainer}>
      <div className={styles.phonesGrid}>
        {products.map((p) => (
          <PhoneCard
            key={p.id}
            phone={{
              ...p,
              image: p.images ? p.images[0] : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PhonesList;