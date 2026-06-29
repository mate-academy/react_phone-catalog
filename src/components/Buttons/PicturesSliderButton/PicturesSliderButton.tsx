import style from './PicturesSliderButton.module.scss';
import { Icon } from '../../Icon';

type Props = {
  direction: 'left' | 'right';
  onClick: () => void;
};

export const PicturesSliderButton: React.FC<Props> = ({
  direction,
  onClick,
}) => {
  const iconName = direction === 'left' ? 'arrowLeft' : 'arrowRight';

  return (
    <button
      type="button"
      className={style.arrow}
      onClick={onClick}
      aria-label="Change slide"
    >
      <Icon name={iconName} />
    </button>
  );
};
