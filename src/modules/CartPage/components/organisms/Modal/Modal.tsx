import React, { useEffect, useState } from 'react';
import styles from './Modal.module.scss';
import ReactDOM from 'react-dom';
import { CloseIcon } from '../../../../../assets/icons/close-icon';
import { Icon } from '../../../../shared/atoms/Icon';
import classNames from 'classnames';
import { Typography } from '../../../../shared/atoms/Typography';
import { useTranslation } from 'react-i18next';
import { PageMessage } from '../../../../shared/molecules/PageMessage';
import { IconButton } from '../../../../shared/atoms/IconButton';
import { Button } from '../../../../shared/atoms/Button';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const { t } = useTranslation();

  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={handleBackdropClick}>
      <div className={styles.modal__content} onClick={handleModalClick}>
        {isLoading ? (
          <div className={styles.modal__loader}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <>
            <div className={styles.modal__head}>
              <IconButton className={styles.modal__close} onClick={onClose}>
                <Icon color="primary">
                  <CloseIcon />
                </Icon>
              </IconButton>
            </div>
            <PageMessage
              title={t('cart.notImplemented')}
              subtitle={t('cart.question')}
            />
            <div className={styles.modal__actions}>
              <Button
                className={classNames(
                  styles.modal__button,
                  styles['modal__button--yes'],
                )}
                onClick={onConfirm}
              >
                <Typography variant="buttons" color="inherit">
                  {t('buttons.actions.yes')}
                </Typography>
              </Button>

              <Button
                className={classNames(
                  styles.modal__button,
                  styles['modal__button--cancel'],
                )}
                onClick={onClose}
              >
                <Typography variant="buttons">
                  {t('buttons.actions.cancel')}
                </Typography>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
};
