import { useNavigate } from 'react-router-dom';

export const useGoBack = () => {
  const navigation = useNavigate();

  const goBack = () => {
    if (window.history.state.idx <= 0) {
      navigation('/');
    } else navigation(-1);
  };

  return { goBack };
};
