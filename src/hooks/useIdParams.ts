import { useLocation } from 'react-router-dom';

const useIdParams = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get('id');

  return { id };
};

export default useIdParams;
