import { NavLink } from 'react-router-dom';

type Props = {
  classN: string;
  backToTop?: () => void;
};

export const Logo: React.FC<Props> = ({ classN, backToTop }) => {
  return (
    <NavLink to="/" onClick={backToTop}>
      <img src="img/logo.svg" alt="logo" className={`logo ${classN}`} />
    </NavLink>
  );
};
