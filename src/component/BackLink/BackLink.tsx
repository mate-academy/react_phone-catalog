import { Link } from 'react-router-dom';
import style from './BackLink.module.scss';
import ArrowLeft from './../../../public/icon/ArrowLeft white.svg';

interface Props {
  fromCategory: string;
}

export const BackLink: React.FC<Props> = ({ fromCategory }) => {
  return (
    <Link to={fromCategory} className={style.backlink}>
      <img src={ArrowLeft} />
      <p className={style.backlink__text}>Back</p>
    </Link>
  );
};
