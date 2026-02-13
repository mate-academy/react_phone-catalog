import classNames from 'classnames';
import { clearItems } from '../../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import styles from './Modal.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  isModalOpen: boolean;
  onModalOpen: (val: boolean) => void;
};

const Modal: React.FC<Props> = ({ isModalOpen, onModalOpen }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleClear = () => {
    dispatch(clearItems());
  };

  return (
    <>
      <div className={classNames('modal', { 'is-active': isModalOpen })}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <header className="modal-card-head">
            <p className="modal-card-title">{t('checkout')}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => onModalOpen(false)}
            ></button>
          </header>
          <section className={`modal-card-body ${styles.text}`}>
            {t('modText')}
          </section>
          <footer className="modal-card-foot">
            <div className="buttons">
              <button className="button is-success" onClick={handleClear}>
                {t('yes')}
              </button>
              <button className="button" onClick={() => onModalOpen(false)}>
                {t('no')}
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Modal;
