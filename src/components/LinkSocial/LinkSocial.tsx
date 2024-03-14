import { Link } from 'react-router-dom';
import './Link.scss';

type Props = {
  link: string;
  title: string;
};

export const LinkSocial: React.FC<Props> = ({ link, title }) => {
  return (
    <Link to={link} className="link-social" target="_blank">
      {title}
    </Link>
  );
};
