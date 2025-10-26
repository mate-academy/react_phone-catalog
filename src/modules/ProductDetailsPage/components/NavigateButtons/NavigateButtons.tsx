import { BackButton } from '../../../shared/components/BackButton';
import { NavigateButton } from '../../../shared/components/NavigateButton';
import { useProduct } from '../../../shared/hooks/ProductContext';
import styles from './NavigateButtons.module.scss';

export const NavigateButtons = () => {
  const { product } = useProduct();

  return (
    <div className={styles.navigateButtons}>
      <NavigateButton productElement={product} />
      <BackButton />
    </div>
  );
};

// передать продукт пропсом в NavigateButton чтобы выполнить условие есть ли продукт или нет
