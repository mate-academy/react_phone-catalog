import { ArrowIcon } from '@shared/icons';
import styles from '../../../styles/sliderButton.module.scss';
import { useSliderData } from '../../../model';

type Props = {
  setByIndex: (mod: number, clamp: boolean) => void;
  posMod: number;
  clamp: boolean;
  disable: boolean[];
};

export const SliderButtons = ({
  setByIndex,
  posMod,
  clamp = false,
  disable = [false, false],
}: Props) => {
  const { mechanics } = useSliderData();

  return [
    <button
      key="0"
      className={styles.button}
      onClick={() => setByIndex(mechanics.index.current - posMod, clamp)}
      disabled={disable[0]}
      aria-label="Show previous slide"
    >
      <ArrowIcon direction="left" />
    </button>,
    <button
      key="1"
      className={styles.button}
      onClick={() => setByIndex(mechanics.index.current + posMod, clamp)}
      disabled={disable[1]}
      aria-label="Show next slide"
    >
      <ArrowIcon direction="right" />
    </button>,
  ];
};
