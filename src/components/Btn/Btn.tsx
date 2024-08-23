import { Icon } from '../Icon';

type Props = {
  className?: string;
  iconName: string;
  onClick: () => void;
};

export const Btn: React.FC<Props> = ({ className = '', iconName, onClick }) => (
  <button className={`${className} btn`.trim()} onClick={onClick}>
    <Icon iconName={iconName} />
  </button>
);
