import classNames from 'classnames';
import { IconButtonSVGOption } from '../../types/enums';
import { LeftArrowSVG } from '../SVGs/LeftArrowSVG';
import { RightArrowSVG } from '../SVGs/RightArrowSVG';
import { UpArrowSVG } from '../SVGs/UpArrowSVG';
import styles from './IconButton.module.scss';
import { MinusSVG } from '../SVGs/MinusSVG';
import { PlusSVG } from '../SVGs/PlusSVG';

type HandleClick = () => void;

type Props = {
  svgOption: IconButtonSVGOption;
  disabled?: boolean;
  label?: string;
  className?: string;
  labelClassName?: string;
  onClick?: HandleClick;
};

export const IconButton: React.FC<Props> = ({
  svgOption,
  disabled,
  label,
  className,
  labelClassName,
  onClick,
}) => {
  let icon: React.JSX.Element;

  switch (svgOption) {
    case IconButtonSVGOption.UpArrow:
      icon = <UpArrowSVG className={styles.Icon} />;
      break;
    case IconButtonSVGOption.RightArrow:
      icon = <RightArrowSVG className={styles.Icon} />;
      break;
    case IconButtonSVGOption.LeftArrow:
      icon = <LeftArrowSVG className={styles.Icon} />;
      break;
    case IconButtonSVGOption.Minus:
      icon = <MinusSVG className={styles.Icon} />;
      break;
    case IconButtonSVGOption.Plus:
      icon = <PlusSVG className={styles.Icon} />;
      break;
    default:
      throw new Error('Icon button SVG option is not valid!!!');
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(styles.IconButton, className)}
      onClick={onClick}
    >
      {icon}
      {label && <span className={labelClassName || styles.Label}>{label}</span>}
    </button>
  );
};
