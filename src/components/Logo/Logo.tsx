import { Link } from 'react-router-dom';
import './style.scss';

type Props = {
  parent: string;
};

export const Logo: React.FC<Props> = ({ parent }) => {
  return (
    <Link to="/" className={`logo ${parent}__logo`}>
      <img src="../icons/logo.svg" alt="Logo" className="logo__img" />
    </Link>
  );
};
