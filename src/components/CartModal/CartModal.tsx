import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';

type Props = {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  onAccept: () => void;
};

export const CartModal: React.FC<Props> = ({ onAccept, showModal }) => {
  const { t } = useTranslation();

  return (
    <div className="modal">
      <div className="modal__card">
        <h4 className="modal__title">{t(TRANSLATIONS.cart.modal.title)}</h4>
        <p>{t(TRANSLATIONS.cart.modal.subtitle)}</p>

        <div className="divider"></div>

        <div className="modal__buttons">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => {
              onAccept();
              showModal(false);
            }}
            aria-label={t(TRANSLATIONS.cart.modal.button.clear.ariaLabel)}
          >
            {t(TRANSLATIONS.cart.modal.button.clear.text)}
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => showModal(false)}
            aria-label={t(TRANSLATIONS.cart.modal.button.cancel.ariaLabel)}
          >
            {t(TRANSLATIONS.cart.modal.button.cancel.text)}
          </button>
        </div>
      </div>
    </div>
  );
};
