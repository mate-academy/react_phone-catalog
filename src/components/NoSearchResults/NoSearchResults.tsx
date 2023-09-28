import { NamesBySections } from '../../types/NamesBySections';
import './NoSearchResults.scss';

type Props = {
  caterogy: NamesBySections,
};

export const NoSearchResults: React.FC<Props> = ({ caterogy }) => {
  return (
    <p className="no-results__title">
      {`${caterogy} not found for the current query`}
    </p>
  );
};
