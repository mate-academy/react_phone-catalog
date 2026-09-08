import styles from './Categories.module.scss';
import { useCategories } from '../../../../store/CategoryContext';
import { Category } from '../Category';

export const Categories = () => {
  const { categories } = useCategories();
  const preparedCategories = categories.filter(
    item => item.page !== 'all' && item.page !== 'favorites',
  );

  return (
    <>
      <h2 className={styles.categories__title}>Shop by category</h2>
      {preparedCategories.map((category, index) => (
        <Category key={index} category={category} />
      ))}
    </>
  );
};
