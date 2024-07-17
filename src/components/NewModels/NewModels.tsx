import { useTranslation } from 'react-i18next';
import { DEFAULT_QUERY } from '../../constants';
import { Product } from '../../types/Product';
import { SortBy } from '../../types/SortBy';
import { getFilteredProducts } from '../../utils/getFilteredProducts';
import { ProductSlider } from '../ProductSlider';
import { TRANSLATIONS } from '../../utils/i18n/translations';

type Props = {
  products: Product[];
};

export const NewModels: React.FC<Props> = ({ products }) => {
  const { t } = useTranslation();
  const brandNewProducts = getFilteredProducts(
    products,
    DEFAULT_QUERY,
    SortBy.NEWEST,
  );
  const shortProductsList = brandNewProducts.splice(0, 15);

  return (
    <section className="new-models">
      <h2 className="section-title new-models__title">
        {t(TRANSLATIONS.newModels.title)}
      </h2>

      <ProductSlider products={shortProductsList} />
    </section>
  );
};
