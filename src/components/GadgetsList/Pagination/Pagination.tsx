import { Link } from 'react-router-dom';
import { IconLeft } from '../../Icons/IconLeft';
import { IconRight } from '../../Icons/IconRight';
import style from './Pagination.module.scss';

type Props = {
  total?: number;
  perPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
};
export const Pagination: React.FC<Props> = () => {
  return (
    <div className={style.pagination}>
      <Link to="/" className={style.pagination__link}>
        <IconLeft />
      </Link>
      <Link to="/" className={style.pagination__link}>
        <IconRight />
      </Link>
    </div>
  );
};
