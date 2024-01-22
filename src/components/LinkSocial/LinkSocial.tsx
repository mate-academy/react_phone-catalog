import { Link } from 'react-router-dom';
import './LinkSocial.scss';

type Props = {
  to: string;
  name: string;
};

export const LinkSocial: React.FC<Props> = ({ to, name }) => {
  return (
    <Link
      to={to}
      className="link-social"
      target="_blank"
    >
      {name}
    </Link>
  );
};
