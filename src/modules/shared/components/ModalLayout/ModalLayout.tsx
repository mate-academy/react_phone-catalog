import { FC } from 'react';
import close from '../../../../assets/images/icons/close.svg';
import s from './ModalLayout.module.scss';

interface Props {
  title: string;
  text?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const ModalLayout: FC<Props> = ({
  title,
  text = '',
  onCancel = () => {},
  onConfirm = () => {},
  cancelButtonText = 'Cancel',
  confirmButtonText = 'OK',
}) => {
  return (
    <div className={s.wrapper} onClick={onCancel}>
      <div className={s.dialog} onClick={e => e.stopPropagation()}>
        <div className={s.header} onClick={onCancel}>
          <img src={close} alt="Close" />
        </div>
        <div className={s.content}>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
        <div className={s.footer}>
          <button type="button" onClick={onCancel} className={s.button}>
            {cancelButtonText}
          </button>
          <button type="button" onClick={onConfirm} className={s.button}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};
