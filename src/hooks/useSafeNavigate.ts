import { useNavigate } from 'react-router-dom';

export const useSafeNavigate = () => {
  const navigate = useNavigate();

  return (path: string) => {
    const base = '/react_phone-catalog';
    const cleanPath = path.startsWith(base) ? path.slice(base.length) : path;

    navigate(cleanPath);
  };
};
