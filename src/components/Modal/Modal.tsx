import React, { useEffect, useRef } from 'react';
import { useTranslate } from '../../hooks/useTranslate';
import style from './Modal.module.scss';

interface Props {
  isOpen: boolean;
  primaryFn: () => void;
  cancelFn: () => void;
  content: React.ReactNode;
}

export const Modal: React.FC<Props> = props => {
  const { isOpen, cancelFn, primaryFn, content } = props;
  const t = useTranslate();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const focusableSelectors = [
      'button',
      '[href]',
      'input',
      'select',
      'textarea',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(focusableSelectors),
    );

    const FIRST_INDEX = 0;
    const LAST_INDEX = focusableElements.length - 1;

    const firstElement = focusableElements[FIRST_INDEX];
    const lastElement = focusableElements[LAST_INDEX];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        return;
      }

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }

        return;
      }

      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        cancelFn();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, cancelFn]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={style.backDrop} onClick={cancelFn}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={style.dialog}
        onClick={e => e.stopPropagation()}
      >
        <div className={style.content}>{content}</div>
        <div className={style.buttons}>
          <button onClick={primaryFn} className={style.primaryButton}>
            {t('modal.continue')}
          </button>
          <button onClick={cancelFn} className={style.closeButton}>
            {t('modal.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};
