import { FC, memo } from 'react';

import styles from './ModalButton.module.scss';

interface IProps {
  onClickAction: () => void;
  ariaLabel: string;
  text: string;
}

export const ModalButton: FC<IProps> = memo(
  ({ ariaLabel, text, onClickAction }) => (
    <button
      type="button"
      onClick={onClickAction}
      className={styles.button}
      aria-label={ariaLabel}
    >
      {text}
    </button>
  ),
);
