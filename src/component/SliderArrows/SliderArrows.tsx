import React from 'react';
import classNames from 'classnames';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './SliderArrows.module.scss';

interface Props {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onLeftClick: () => void;
  onRightClick: () => void;
}

export const SliderArrows: React.FC<Props> = ({
  canScrollLeft,
  canScrollRight,
  onLeftClick,
  onRightClick,
}) => (
  <div className={styles.arrows}>
    <button
      onClick={onLeftClick}
      className={classNames(styles.arrow, {
        [styles.disabled]: !canScrollLeft,
      })}
      type="button"
    >
      <ArrowLeft size={16} />
    </button>
    <button
      onClick={onRightClick}
      className={classNames(styles.arrow, {
        [styles.disabled]: !canScrollRight,
      })}
      type="button"
    >
      <ArrowRight size={16} />
    </button>
  </div>
);
