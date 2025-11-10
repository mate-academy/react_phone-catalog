import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../../ProductsContext/NavigationContext';
import { scrollToTop } from '../navigate/ToTop';

export const useOpenProduct = () => {
  const { push } = useNavigation();
  const navigate = useNavigate();

  const openProduct = (category: string, id: number | string) => {
    const path = `/${category}/product/${id}`;

    push(path);
    navigate(path);
    scrollToTop();
  };

  return { openProduct };
};
