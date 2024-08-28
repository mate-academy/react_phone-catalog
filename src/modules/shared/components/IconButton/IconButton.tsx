import { IconButtonSVGOption } from '../../types/enums';
import { UpArrowSVG } from '../SVGs/UpArrowSVG';
import styles from './IconButton.module.scss';

type HandleClick = () => void;

type Props = {
  svgOption: IconButtonSVGOption;
  onClick: HandleClick;
};

export const IconButton: React.FC<Props> = ({ svgOption, onClick }) => {
  let icon: React.JSX.Element;

  switch (svgOption) {
    case IconButtonSVGOption.UpArrow:
      icon = <UpArrowSVG className={styles.Icon} />;
      break;
    default:
      throw new Error('Icon button SVG option is not valid!!!');
  }

  return (
    <button type="button" className={styles.IconButton} onClick={onClick}>
      {icon}
    </button>
  );
};
