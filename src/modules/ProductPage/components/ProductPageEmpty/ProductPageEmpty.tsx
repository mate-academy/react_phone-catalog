//#region imports
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../shared/hooks/useTheme';
import { Category } from '../../../shared/constants/categories';
import styles from './ProductPageEmpty.module.scss';
//#endregion

type Props = {
  category: Category;
};

export const ProductPageEmpty: React.FC<Props> = ({ category }) => {
  const { t } = useTranslation('productPage');
  const { t: tCategories } = useTranslation('categories');
  const { isDark } = useTheme();

  const categoryLabel = tCategories(`categoriesGen.${category}`);
  const imgSrc = isDark
    ? './img/darkTheme/no-category.png'
    : './img/no-category.png';

  return (
    <section className={styles.emptyProductPage}>
      <h1>{t('emptyProductsPage', { category: categoryLabel })}</h1>

      <img
        className={styles.emptyPageImg}
        src={imgSrc}
        alt={`No ${category}`}
      />
    </section>
  );
};
