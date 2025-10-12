import { useLocation, useNavigate } from 'react-router-dom';

export const useNavigationTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const trackLinkHandler = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate(path, {
      state: { from: location },
    });
  };

  const from = location.state?.from || '/';

  const goBack = () => navigate(from);

  const preserveFrom = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate(path, { state: { from } });
  };

  return { trackLinkHandler, goBack, preserveFrom };
};
