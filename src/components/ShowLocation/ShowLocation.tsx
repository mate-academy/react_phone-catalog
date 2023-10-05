import { useLocation, useParams } from 'react-router-dom';
import { Icon } from '../Icon';
import Home from '../../img/icons/Home.svg';
import { useCamelCase } from '../../hooks/useCamelCase';

export const ShowLocation = () => {
  const category = useCamelCase(useParams().category);
  const pathname = useCamelCase(useLocation().pathname.slice(1));

  return (
    <div>
      <Icon icon={Home} path="/" />
      {category || (pathname)}
    </div>
  );
};
