import { useParams } from 'react-router-dom';
import styles from './NavigateList.module.scss';
import { BackButton } from '../BackButton';
import { NavigateButton } from '../NavigateButton';

export const NavigateList = () => {
  const { category } = useParams();

  return (
    <div className={styles.container}>
      {category === 'cart' ? <BackButton /> : <NavigateButton />}
    </div>
  );
};
