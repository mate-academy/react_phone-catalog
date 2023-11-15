import { useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('..');
  }, 2000);

  return (
    <p>Error: Page not found</p>
  );
};
