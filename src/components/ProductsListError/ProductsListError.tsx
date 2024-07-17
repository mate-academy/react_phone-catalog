import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';

type Props = {
  reload: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProductsListError: React.FC<Props> = ({ reload }) => {
  const { t } = useTranslation();

  return (
    <section className="products-list-error">
      <h2 className="section-title">
        {t(TRANSLATIONS.products.list.error.title)}
      </h2>
      <div className="products-list-error__reload">
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => reload(true)}
          aria-label={t(TRANSLATIONS.products.list.error.button.ariaLabel)}
        >
          {t(TRANSLATIONS.products.list.error.button.text)}
        </button>
      </div>
    </section>
  );
};
