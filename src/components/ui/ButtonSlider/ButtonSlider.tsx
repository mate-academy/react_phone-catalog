import { Icon, TypeIcon } from '../Icon/Icon';
import './ButtonSlider.scss';

type Props = {
  name: TypeIcon;
  type: 'banner' | 'slider';
  onClick?: () => void;
  disabled: boolean;
};

export default function ButtonSlider({ name, type, onClick, disabled }: Props) {
  return (
    <button
      className={`ButtonSlider ButtonSlider--${type}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon name={name} />
    </button>
  );
}
