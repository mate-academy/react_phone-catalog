import { CustomArrowProps } from 'react-slick';
import classNames from 'classnames';
import styles from './CustomArrow.module.scss';

export type ArrowClassType =
  | 'welcomeSliderArrow'
  | 'modelsSliderArrow_up'
  | 'modelsSliderArrow_down';

type Props = {
  direction: 'right' | 'left';
  arrowClassName: ArrowClassType;
} & CustomArrowProps;

export const CustomArrow = ({ onClick, direction, arrowClassName }: Props) => {
  return (
    <button
      className={classNames(
        styles.customArrow,
        styles[arrowClassName],
        styles[`${arrowClassName}_${direction}`],
      )}
      onClick={onClick}
    >
      <img src={`img/icons/arrow-${direction}.svg`} />
    </button>
  );
};
