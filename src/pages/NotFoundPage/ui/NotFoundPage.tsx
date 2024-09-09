import { useEffect } from 'react';
import { NotFound } from '../../../shared/ui/NotFound';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../shared/config/routeConfig';

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(RoutePaths.home);
    }, 2000);
  }, [navigate]);

  return (
    <>
      <NotFound src={'img/page-not-found.png'} alt="Page not found" />
    </>
  );
}

export default NotFoundPage;
