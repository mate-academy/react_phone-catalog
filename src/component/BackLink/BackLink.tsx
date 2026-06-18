import { Link } from 'react-router-dom';
import style from './BackLink.module.scss';

interface Props {
  fromCategory: string;
}

export const BackLink: React.FC<Props> = ({ fromCategory }) => {
  return (
    <Link to={fromCategory} className={style.backlink}>
      <img src="/icon/ArrowLeft white.svg" alt="Back" />
      <p className={style.backlink__text}>Back</p>
    </Link>
  );
};
