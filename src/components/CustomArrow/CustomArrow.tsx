import { CustomArrowProps } from 'react-slick';
import classNames from 'classnames';
import styles from './CustomArrow.module.scss';

type Props = {
  direction: 'right' | 'left';
  additionalClassName: string;
} & CustomArrowProps;

export const CustomArrow = ({
  onClick,
  direction,
  additionalClassName,
}: Props) => {
  return (
    <button
      className={classNames(
        styles.customArrow,
        styles[additionalClassName],
        styles[`${additionalClassName}_${direction}`],
      )}
      onClick={onClick}
    >
      <img src={`img/icons/arrow-${direction}.svg`} />
    </button>
  );
};
