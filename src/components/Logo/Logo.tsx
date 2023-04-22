import { Link } from 'react-router-dom';

type Props = {
  classNames?: string;
};

const Logo: React.FC<Props> = ({ classNames }) => (
  <Link to="/" className={classNames}>
    <img src="./logo.svg" alt="logo" />
  </Link>
);

export default Logo;
