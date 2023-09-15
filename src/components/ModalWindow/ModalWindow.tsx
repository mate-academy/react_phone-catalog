import React, { FC } from 'react';
import ReactDom from 'react-dom';

import './ModalWindow.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const ModalWindow: FC<Props> = ({ isOpen, onClose, children }) => {
  const portalEl = document.getElementById('portal');

  if (!isOpen || !portalEl) {
    return null;
  }

  const handleKeyBoardClick = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === 'Enter') {
      onClose();
    }
  };

  return ReactDom.createPortal(
    <>
      <div
        className="modal-overlay"
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={handleKeyBoardClick}
        aria-label="modalOverlay"
      />
      <div className="modal-container">
        {children}
        <button
          type="button"
          onClick={onClose}
          className="modal-button"
          aria-label="modalButton"
        />
      </div>
    </>,
    portalEl,
  );
};
