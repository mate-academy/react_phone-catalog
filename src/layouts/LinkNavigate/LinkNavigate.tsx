import { Link } from 'react-router-dom';
import './LinkNavigate.scss';

type Props = {
  to: string;
  textLink: string;
  type: 'mobile' | 'desktop';
  callback: (isOpenMenu: boolean) => void;
};

export default function LinkNavigate({ to, textLink, type, callback }: Props) {
  return (
    <Link
      to={to}
      className={`Link Link__${type}`}
      onClick={() => callback(false)}
    >
      {textLink}
    </Link>
  );
}
