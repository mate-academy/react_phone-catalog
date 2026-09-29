import React from 'react';
// eslint-disable-next-line max-len
import { ActionButton } from '@/shared/components/Buttons/components/ActionButton';

import cn from 'classnames';
import './Modal.scss';

type Props = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
};

export const Modal: React.FC<Props> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  className,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={cn('modal-overlay', className)} onClick={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="modal__title">{title}</h3>
        <p className="modal__message">{message}</p>

        <div className="modal__actions">
          <button
            type="button"
            className="modal__btn modal__btn--cancel"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>

          <ActionButton
            className="modal__btn modal__btn--confirm"
            onClick={onConfirm}
          >
            {confirmLabel}
          </ActionButton>
        </div>
      </div>
    </div>
  );
};
