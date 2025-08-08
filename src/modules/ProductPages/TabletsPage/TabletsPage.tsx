import cn from 'classnames';
import styles from './TabletsPage.module.scss';
import { Pages } from '../components/Pages';
import { useContext } from 'react';
import { PageContext } from '../../../context/PageContext';

export const TabletsPage = () => {
  const { products } = useContext(PageContext);

  return (
    <section className={cn(styles['tablets-page'], 'container')}>
      <div className={cn(styles['tablets-page__title-content'])}>
        <h1 className={cn(styles['tablets-page__title'])}>Tablets</h1>
        <p className={cn(styles['tablets-page__subtitle'])}>
          {products.length} models
        </p>
      </div>
      <Pages />
    </section>
  );
};
