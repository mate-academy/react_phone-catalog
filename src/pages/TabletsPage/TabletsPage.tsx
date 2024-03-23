import { NoResults } from '../../components/NoResults/NoResults';
import './TabletsPage.scss';

export const TabletsPage : React.FC = () => {
  return (
    <div className="tabletPage">
      <NoResults page="tablets" />
    </div>
  );
};
