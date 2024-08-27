import { Link } from 'react-router-dom';
import { Icon } from '../Icon';

type Props = {
  className?: string;
};

export const BackBtn: React.FC<Props> = ({ className = '' }) => (
  <Link className={`${className} back-btn`.trim()} to="/">
    <Icon iconName="icon-arrow-left" />
    back
  </Link>
);
