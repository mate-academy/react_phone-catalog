import { Link } from 'react-router-dom';
import cn from 'classnames';

import './BackButton.scss';

type Props = {
  classNames?: string,
};

export const BackButton: React.FC<Props> = ({ classNames }) => {
  return (
    <Link to=".." className={cn('back-button', classNames)}>
      Back
    </Link>
  );
};
