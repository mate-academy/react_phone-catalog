import { useLocation } from 'react-router-dom';

export const NoResults = () => {
  const { pathname } = useLocation();
  const normPath = pathname.slice(1);

  return (
    <div className="no-results">
      <div className="container">
        <div className="no-results__content">
          <h3 className="title no-results__title">
            {`Sorry, but ${normPath} not found`}
          </h3>
          <div className="no-results__img">
            <img src="new/img/icons/noresults.png" alt="noresults" />
          </div>
        </div>
      </div>
    </div>
  );
};
