import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

export const useRouter = () => {
  const match: Match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const search = new URLSearchParams(location.search);

  return {
    match,
    location,
    history,
    search,
  };
};
