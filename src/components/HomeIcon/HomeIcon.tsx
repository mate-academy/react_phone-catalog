import { Link } from 'react-router-dom';
import homeIcon from '../../img/icon/Home.png';
import arrowRight from '../../img/icon/ArrowRight.png';
import './HomeIcon.scss';

type Props = {
  title: string;
};

export const HomeIcon: React.FC<Props> = ({ title }) => {
  return (
    <Link
      className="homeIcon"
      to="/"
    >
      <img src={homeIcon} alt="homeIcon" />
      <img src={arrowRight} alt="homeIcon" />
      <span className="page__title">{title}</span>
    </Link>
  );
};
