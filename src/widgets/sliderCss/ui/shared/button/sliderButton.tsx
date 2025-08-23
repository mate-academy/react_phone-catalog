import { ArrowIcon } from '@shared/icons';
import styles from '../../../styles/sliderButton.module.scss';
import { useSliderData } from '@widgets/sliderCss/model';

type Props = {
  setByIndex: (mod: number) => void;
};

export const SliderButtons = ({ setByIndex }: Props) => {
  const { mechanics } = useSliderData();

  return [
    <button
      key="0"
      className={styles.button}
      onClick={() => setByIndex(mechanics.index.current - 1)}
      aria-label="Show previous slide"
    >
      <ArrowIcon direction="left" />
    </button>,
    <button
      key="1"
      className={styles.button}
      onClick={() => setByIndex(mechanics.index.current + 1)}
      aria-label="Show next slide"
    >
      <ArrowIcon direction="right" />
    </button>,
  ];
};
