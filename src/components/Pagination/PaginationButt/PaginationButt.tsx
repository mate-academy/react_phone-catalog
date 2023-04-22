import cn from 'classnames';
import './PaginationButt.scss';
import { SearchLink } from '../../../helpers/searchLink';

type Props = {
  move: number;
  isDis: boolean;
  img: string;
};

const PaginationButt: React.FC<Props> = ({
  isDis,
  move,
  img,
  ...props
}) => {
  return (
    <SearchLink
      {...props}
      className={cn(
        'pagination-butt',
        { 'button-dis': isDis },
      )}
      params={{ page: `${move}` }}
    >
      <img src={img} alt="icon" />
    </SearchLink>
  );
};

export default PaginationButt;
