import classNames from 'classnames';
import { IconButtonSVGOption } from '../../types/enums';
import { LeftArrowSVG } from '../SVGs/LeftArrowSVG';
import { RightArrowSVG } from '../SVGs/RightArrowSVG';
import { UpArrowSVG } from '../SVGs/UpArrowSVG';
import styles from './IconButton.module.scss';
import { useId } from 'react';

type HandleClick = () => void;

type Props = {
  svgOption: IconButtonSVGOption;
  onClick: HandleClick;
  disabled?: boolean;
  label?: string;
  className?: string;
};

export const IconButton: React.FC<Props> = ({
  svgOption,
  onClick,
  disabled,
  label,
  className,
}) => {
  const id = useId();

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
    default:
      throw new Error('Icon button SVG option is not valid!!!');
  }

  return (
    <div
      className={classNames(
        styles.IconButton,
        disabled && styles.IconButton_disabled,
        className,
      )}
    >
      {label && (
        <label htmlFor={id} className={styles.Label}>
          {label}
        </label>
      )}
      <button
        id={id}
        type="button"
        disabled={disabled}
        className={styles.Button}
        onClick={onClick}
      >
        {icon}
      </button>
    </div>
  );
};
