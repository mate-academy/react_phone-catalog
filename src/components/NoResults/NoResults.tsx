import { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';

// Styles
import './NoResults.scss';

type Props = {
  type: string;
};

export const NoResults: FunctionComponent<Props> = ({ type }) => {
  const location = useLocation().pathname.slice(1);
  let message = '';

  switch (type) {
    case 'page':
      message = 'Page not found';
      break;

    case 'search':
      message = `Nothing found in ${location}...`;
      break;

    default:
      message = `There is nothing in ${location}...`;
  }

  return (
    <div className="NoResults">
      <h1>{message}</h1>
    </div>
  );
};
