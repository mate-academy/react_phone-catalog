import { useNavigate } from 'react-router-dom';

export const useSafeNavigate = () => {
  const navigate = useNavigate();

  return (path: string) => {
    const cleanPath = path.replace(/(\/[a-z-]+)\/\1/g, '$1');

    if (cleanPath !== path) {
      navigate(cleanPath);
    } else {
      navigate(path);
    }
  };
};
