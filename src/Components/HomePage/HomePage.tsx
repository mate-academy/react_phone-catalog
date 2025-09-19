import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import styles from './HomePage.module.scss';
import { Slider } from '../Slider';

export const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <Slider />
    </div>
  );
};
