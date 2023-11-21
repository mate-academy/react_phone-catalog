import { useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('..');
  }, 2000);

  return (
    <div className="page-not-found">
      <h2 className="title title--h2 title--empty-page">
        <strong>Page not found</strong>
      </h2>
    </div>
  );
};
