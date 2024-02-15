import { useLocation } from 'react-router-dom';

export interface LocationState {
  prevPage?: string,
  scrollToTop?: boolean,
}

export const useAppLocation = () => {
  const location = useLocation();

  return {
    ...location,
    state: location.state as LocationState,
  };
};
