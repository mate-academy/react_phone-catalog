import styles from './CartPage.module.scss';
import { useEffect, useState } from 'react';
import { CartContent } from './CartContent';
import { Loader } from '../shared/components/UI/Loader';
import { BackButton } from '../shared/components/UI/BackButton';

export const CartPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <BackButton />

      <CartContent />
    </div>
  );
};
