import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './NoResults.scss';

type Props = {
  title: string,
};

export const NoResults: FC<Props> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="no-results">
      <h2 className="no-results__title">{`${title} not found`}</h2>
      <button
        type="button"
        className="no-results__button rectangular-button"
        onClick={() => navigate('/')}
      >
        Visit Home page
      </button>
    </div>
  );
};
