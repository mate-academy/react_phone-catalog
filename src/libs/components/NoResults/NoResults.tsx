import { Link } from 'react-router-dom';
import { SectionHeader } from '../SectionHeader';

import './NoResults.scss';

type Props = {
  title: string,
};

export const NoResults: React.FC<Props> = ({ title }) => {
  return (
    <div className="no-results-container">
      <SectionHeader
        title={`${title} not found`}
        classNames="no-results-container__title"
      />
      <Link to="/" className="no-results-container__back-link">
        Go back
      </Link>
    </div>
  );
};
