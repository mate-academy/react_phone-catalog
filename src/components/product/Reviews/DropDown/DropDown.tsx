import { useTranslation } from 'react-i18next';
import { BarRow } from '@components/product/Reviews/BarRow/BarRow';
import './DropDown.scss';

interface Rating {
  label: string;
  pct: number;
}

export const DropDown = ({
  ratings,
  open,
  onSeeAll,
  onClose,
}: {
  ratings: Rating[];
  open: boolean;
  onSeeAll: () => void;
  onClose: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className={`dropdown${open ? ' dropdown--open' : ''}`}>
      <div className="dropdown__header">
        <p className="dropdown__title">{t('product_details.reviews_title')}</p>
        <button
          className="dropdown__close"
          onClick={onClose}
          aria-label={t('checkout.close')}
        >
          ×
        </button>
      </div>

      {ratings.map((r) => (
        <BarRow
          key={r.label}
          label={r.label}
          pct={r.pct}
          animate={open}
        />
      ))}

      <div className="dropdown__divider" />
      <a
        href="#"
        className="dropdown__link"
        onClick={(e) => {
          e.preventDefault();
          onSeeAll();
        }}
      >
        {t('product_details.see_all_reviews')}
      </a>
    </div>
  );
};
