import { useLocation } from 'react-router-dom';
import { getPageName } from '../../helpers/getPageName';
import { BackButton } from '../BackButton';

export const NoResults: React.FC = () => {
  const { pathname } = useLocation();
  const pageName = getPageName(pathname);
  const typeName = pageName.slice(0, -1);

  return (
    <>
      <BackButton />

      <h1 className="title">
        {`${typeName} was not found`}
      </h1>
    </>
  );
};
