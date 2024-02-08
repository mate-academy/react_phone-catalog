import { useLocation } from "react-router-dom"

export interface LocationState {
  prevPage?: string,
}

export const useAppLocation = () => {
  const location = useLocation();

  return {
    ...location,
    state: location.state as LocationState,
  };
}