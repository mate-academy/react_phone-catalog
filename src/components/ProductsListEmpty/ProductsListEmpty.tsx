import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import { Category } from '../../types/Category';

export const ProductsListEmpty = () => {
  const location = useLocation();
  const category = location.pathname.split('/')[1];
  const { t } = useTranslation();

  const LOCALE_CATEGORY = {
    [Category.PHONES]: t(TRANSLATIONS.products.list.empty.phones),
    [Category.TABLETS]: t(TRANSLATIONS.products.list.empty.tablets),
    [Category.ACCESSORIES]: t(TRANSLATIONS.products.list.empty.accessories),
  };

  return (
    <>
      <div className="not-found">
        <h2 className="section-title not-found__title">
          {t(TRANSLATIONS.products.list.empty.title, {
            category: LOCALE_CATEGORY[category as Category],
          })}
        </h2>
        <div className="not-found__bg not-found__bg--products-list"></div>
      </div>
    </>
  );
};
