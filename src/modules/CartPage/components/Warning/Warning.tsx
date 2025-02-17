import React, { useEffect, useRef } from 'react';

import { IconButton } from '@components/IconButton';
import { IconButtonType } from '@sTypes/IconButtonType';

import styles from './Warning.module.scss';
import classNames from 'classnames';
import { useAppSelector } from '@store/hooks';
import { Theme } from '@sTypes/Theme';

type Props = {
  onCancel?: () => void;
  onConfirm?: () => void;
};

export const Warning: React.FC<Props> = ({
  onCancel = () => {},
  onConfirm = () => {},
}) => {
  const warning = useRef<HTMLDivElement>(null);
  const theme = useAppSelector(state => state.theme);

  useEffect(() => {
    document.documentElement.style.overflowY = 'hidden';

    return () => {
      document.documentElement.style.overflowY = '';
    };
  }, []);

  useEffect(() => {
    let firstClick = true;

    const handleClick = (e: MouseEvent) => {
      if (firstClick) {
        firstClick = false;

        return;
      }

      if (!warning.current) {
        return;
      }

      if (!warning.current.contains(e.target as Node)) {
        onCancel();
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [onCancel]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <article aria-label="Warning" className={styles.overlay}>
      <div
        ref={warning}
        className={classNames(styles.warning, {
          [styles['warning--dark']]: theme === Theme.dark,
        })}
      >
        <div className={styles.warning__header}>
          <h1>Warning!</h1>
          <IconButton
            ariaLabel="Close"
            type={IconButtonType.iconClose}
            hideBorders
            hideBackground
            onClick={() => onCancel()}
          />
        </div>

        <div className={styles.warning__content}>
          <div className={styles.warning__description}>
            Checkout is not implemented yet. Do you want to clear the Cart?
          </div>

          <div className={styles.warning__buttons}>
            <button className={styles.warning__button} onClick={onCancel}>
              Cancel
            </button>

            <button
              className={classNames(
                styles.warning__button,
                styles['warning__button--confirm'],
              )}
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
