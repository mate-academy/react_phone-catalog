import { useTranslation } from 'react-i18next';
import { Product } from '../../types/Product';
import { ProductSlider } from '../ProductSlider';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import styles from './Recommendations.module.scss';
import gStyles from '../../styles/general.module.scss';

type Props = {
  products: Product[];
};

export const Recommendations: React.FC<Props> = ({ products }) => {
  const { t } = useTranslation();

  const shortProductsList = products.splice(0, 15);

  return (
    <section className={styles.block}>
      <h2 className={`${gStyles.sectionTitle} ${styles.title}`}>
        {t(TRANSLATIONS.recommendations.title)}
      </h2>

      <ProductSlider products={shortProductsList} />
    </section>
  );
};
