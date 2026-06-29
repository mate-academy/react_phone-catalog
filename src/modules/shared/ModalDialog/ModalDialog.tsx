import style from './ModalDialog.module.scss';

import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import Button from '../Button';

interface Props {
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
  children: ReactNode;
}

const ModalDialog: React.FC<Props> = ({
  isOpen,
  onSubmit,
  onClose,
  children,
}) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={style.modal__overlay} onClick={onClose}>
      <div className={style.modal__content} onClick={e => e.stopPropagation()}>
        <div className="modal-body">{children}</div>
        <div className={style.modal__footer}>
          <Button text={t('dialog.submit')} handleClick={onSubmit} />
          <Button text={t('dialog.cancel')} handleClick={onClose} />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ModalDialog;
