import { Link } from 'react-router-dom';
import './ButtonBack.scss';

type Props = {
  getBack: () => {
    pathname: string;
    search: string;
  },
};

export const ButtonBack: React.FC<Props> = ({ getBack }) => (
  <Link
    to={getBack()}
    className="button-back"
    data-cy="backButton"
  >
    <div className="button-back__arrow" />
    <span className="button-back__text">Back</span>
  </Link>
);
