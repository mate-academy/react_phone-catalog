import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllProducts, setCurrentItem } from '../features/productsAll';
import { RootState } from '../app/store';
//import phones from '../features/phones';

export const ProductInformationPage: React.FC = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();

  const unitedProducts = useSelector((state: RootState) => state.productsAll.items);
  const currentItem = useSelector(
    (state: RootState) => state.productsAll.currentItem,
  );
console.log (fetchAllProducts)
  useEffect(() => {
    const foundItem = unitedProducts.find(unitedProduct => unitedProduct.id === itemId);
    if (foundItem) {
      dispatch(setCurrentItem(foundItem));
    }
  }, [itemId, unitedProducts, dispatch]);

  if (!currentItem) {
    return <div>Loading or product not found...</div>;
  }

  return (
    <div>
      <h1>{currentItem.name}</h1>
      {/* ... render more details ... */}
    </div>
  );
};
