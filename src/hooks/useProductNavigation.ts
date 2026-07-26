import { useNavigate, useLocation } from 'react-router-dom';

export const useProductNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToProduct = (id: string) => {
    navigate(`/product/vars.${id}`, {
      state: {
        from: location.pathname,
      },
    });
  };

  return { goToProduct };
};
