import { Link } from 'react-router-dom';
import { SectionHeader } from '../SectionHeader';

import './NoResults.scss';

type Props = {
  title: string,
  hasBackButton?: boolean
};

export const NoResults: React.FC<Props> = ({
  title,
  hasBackButton = false,
}) => {
  return (
    <div className="no-results-container">
      <SectionHeader
        title={title}
        classNames="no-results-container__title"
      />
      {hasBackButton && (
        <Link to="/" className="no-results-container__back-link">
          Go to the Home page
        </Link>
      )}
    </div>
  );
};
