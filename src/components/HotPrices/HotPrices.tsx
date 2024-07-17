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

export const HotPrices: React.FC<Props> = ({ products }) => {
  const { t } = useTranslation();

  const hotPriceProducts = getFilteredProducts(
    products,
    DEFAULT_QUERY,
    SortBy.HOT_PRICE,
  );
  const shortProductsList = hotPriceProducts.splice(0, 15);

  return (
    <section className="hot-prices">
      <h2 className="section-title hot-prices__title">
        {t(TRANSLATIONS.hotPrices.title)}
      </h2>

      <ProductSlider products={shortProductsList} />
    </section>
  );
};
