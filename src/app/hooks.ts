import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export function useShowDetails(
//   category?: string,
//   // handlerFavourites?: (v: ProductInfo) => void,
// ) {
//   const navigate = useNavigate();

//   return useCallback(
//     (e: React.MouseEvent<HTMLDivElement>) => {
//       const element = e.target as HTMLElement;
//       const productCard = element.closest(
//         '.product-card',
//       ) as HTMLElement | null;

//       if (!productCard) {
//         return;
//       }

//       const id = productCard.dataset.itemId;

//       if (!id) {
//         return;
//       }

//       if (element.closest('.button-add')) {
//         return;
//       }

//       if (element.closest('.button-like')) {
//         return;
//       }

//       navigate(category ? `../../${category}/${id}` : `${id}`);
//     },
//     [navigate, category],
//   );
// }
