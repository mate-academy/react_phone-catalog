import { Pages } from '../components/Pages';
import cn from 'classnames';
import styles from './PhonePage.module.scss';
import { useContext } from 'react';
import { PageContext } from '../../../context/PageContext';

export const PhonesPage = () => {
  const { products } = useContext(PageContext);

  return (
    <section className={cn(styles['phones-page'], 'container')}>
      <div className={cn(styles['phones-page__title-content'])}>
        <h1 className={cn(styles['phones-page__title'])}>Mobile phones</h1>
        <p className={cn(styles['phones-page__subtitle'])}>
          {products.length} models
        </p>
      </div>
      <Pages />
    </section>
  );
};
