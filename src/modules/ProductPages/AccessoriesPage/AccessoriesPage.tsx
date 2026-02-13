import cn from 'classnames';
import styles from './Accessories.module.scss';
import { Pages } from '../components/Pages';
import { useContext } from 'react';
import { PageContext } from '../../../context/PageContext';

export const AccessoriesPage = () => {
  const { products } = useContext(PageContext);

  return (
    <section className={cn(styles['accessories-page'], 'container')}>
      <div className={cn(styles['accessories-page__title-content'])}>
        <h1 className={cn(styles['accessories-page__title'])}>Accessories</h1>
        <p className={cn(styles['accessories-page__subtitle'])}>
          {products.length} models
        </p>
      </div>
      <Pages />
    </section>
  );
};
