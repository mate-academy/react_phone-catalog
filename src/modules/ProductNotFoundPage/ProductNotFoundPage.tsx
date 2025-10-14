import s from './ProductNotFoundPage.module.scss';
import { BackButton } from '../shared/BackButton';

export const ProductNotFoundPage = () => {
  return (
    <section className={s.page}>
      <div className={s.container}>
        <BackButton />
        <h2 className={s.pageTitle}>Product not found</h2>
      </div>
    </section>
  );
};
