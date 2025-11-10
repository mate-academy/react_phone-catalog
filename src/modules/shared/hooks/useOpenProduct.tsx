import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../../ProductsContext/NavigationContext';

export const useOpenProduct = () => {
  const { push } = useNavigation();
  const navigate = useNavigate();

  const openProduct = (category: string, id: number | string) => {
    const path = `/${category}/product/${id}`;

    push(path);
    navigate(path);
  };

  return { openProduct };
};
