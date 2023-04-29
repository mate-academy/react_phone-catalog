import cn from 'classnames';
import { SearchLink } from '../../../helpers/searchLink';

const buttonClasses = (isDis: boolean) => cn(
  'button-block', { 'button-dis': isDis },
);

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
      className={buttonClasses(isDis)}
      params={{ page: `${move}` }}
    >
      <img src={img} alt="icon" />
    </SearchLink>
  );
};

export default PaginationButt;
