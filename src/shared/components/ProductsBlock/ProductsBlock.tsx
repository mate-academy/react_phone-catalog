import { Link } from 'react-router-dom';
import styles from './ProductsBlock.module.scss';
import { Category } from '@/shared/types/Category';
import { useTranslation } from 'react-i18next';
import { useProducts } from '@/shared/api/hooks/useProducts';

type Props = {
  bgColor: string;
  title: string;
  image: string;
  category: Category;
};

export const ProductsBlock: React.FC<Props> = ({
  bgColor,
  title,
  image,
  category,
}) => {
  const { t } = useTranslation();

  const { products } = useProducts(category);

  const availableProducts = products.length;

  const modelsOrModel = availableProducts === 1 ? 'model' : 'models';

  return (
    <div className={styles.cardBlock}>
      <div className={styles.card} style={{ backgroundColor: bgColor }}>
        <Link to={`/${category}`}>
          <img className={styles.photo} src={image} alt={title} />
        </Link>
      </div>
      <div className={styles.cardInfo}>
        <h3 className={styles.title}>{t(`home.category.${title}`)}</h3>
        <p className={styles.info}>{`${availableProducts} ${modelsOrModel}`}</p>
      </div>
    </div>
  );
};
