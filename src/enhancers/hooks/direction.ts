import { useLocation } from "react-router-dom";

export const useDirection = () => {
  const { pathname } = useLocation();

  const getDirection = (path: string) => {
    return {
      pathname: path,
      state: {
        prevPage: pathname,
      },
    };
  };

  return getDirection;
}