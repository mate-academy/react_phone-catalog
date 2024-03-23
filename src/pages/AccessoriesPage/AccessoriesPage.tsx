import { NoResults } from '../../components/NoResults/NoResults';
import './AccessoriesPage.scss';

export const AccessoriesPage : React.FC = () => {
  return (
    <div className="accessoriesPage">
      <NoResults page="accessories" />
    </div>
  );
};
