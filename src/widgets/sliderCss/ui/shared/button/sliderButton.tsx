import { ArrowIcon } from '@shared/icons';
import styles from '../../../styles/sliderButton.module.scss';

type Props = {
  handler: (mod: number) => void;
};

export const SliderButtons = ({ handler }: Props) => [
  <button
    key="0"
    className={styles.button}
    onClick={() => handler(-1)}
    aria-label="Show previous slide"
  >
    <ArrowIcon direction="left" />
  </button>,
  <button
    key="1"
    className={styles.button}
    onClick={() => handler(1)}
    aria-label="Show next slide"
  >
    <ArrowIcon direction="right" />
  </button>,
];
