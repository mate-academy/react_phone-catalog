import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { TRANSLATIONS } from '../../utils/i18n/translations';

export const ProductsDetailsError = () => {
  const { itemId } = useParams();
  const { t } = useTranslation();

  const name = itemId?.replaceAll('-', ' ');

  return (
    <>
      <h2 className="section-title">
        {t(TRANSLATIONS.productDetails.error.title, { name })}
      </h2>

      <p>{t(TRANSLATIONS.productDetails.error.subtitle)}</p>

      <section className="not-found">
        <div className="not-found__bg not-found__bg--products-list"></div>
      </section>
    </>
  );
};
