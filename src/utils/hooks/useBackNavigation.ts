import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useBackNavigation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleBackClick = useCallback(() => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(state?.from || '/');
    }
  }, [state, navigate]);

  return handleBackClick;
};
