import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProductDetailsView } from './ProductDetailsView';
import { getProductDetails } from '../../store/reducers/ProductDetailsSlice';
import { useAppSelector } from '../../store/hooks/redux';
import { Spinner } from '../../components/Spinner';
import { Error } from '../../components/Error';
import { addToCart } from '../../store/reducers/cartSlice';
import { toggleFavorite } from '../../store/reducers/favoritesSlice';
import { selectCart } from '../../store/selectors/cartSlice';
import { selectFavorites } from '../../store/selectors/favoritesSlice';
import {
  selectProductDetails,
} from '../../store/selectors/ProductDetailsSlice';
import { AppDispatch } from '../../store/store';

export const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const trimmedPath = path.substring(path.lastIndexOf('/') + 1);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProductDetails(trimmedPath));
  }, [trimmedPath, dispatch]);

  const { product, error, isLoading } = useSelector(selectProductDetails);

  const { products } = useAppSelector(state => {
    return state.productsReducer;
  });

  const changeColor = useCallback((currentColor: string, newColor: string) => {
    navigate(path.replace(currentColor, newColor));
  }, [navigate, path]);

  const changeCapacity = useCallback((currentCap: string, newCap: string) => {
    navigate(path.replace(
      currentCap.toLocaleLowerCase(),
      newCap.toLocaleLowerCase(),
    ));
  }, [navigate, path]);

  const onCartAdd = useCallback((id: string) => {
    const productToAdd = products?.find(prItem => prItem.phoneId === id);

    if (productToAdd) {
      dispatch(addToCart(productToAdd));
    }
  }, [dispatch, products]);

  const onFavoritesToggle = useCallback((id: string) => {
    const productToAdd = products?.find(prItem => prItem.phoneId === id);

    if (productToAdd) {
      dispatch(toggleFavorite(productToAdd));
    }
  }, [dispatch, products]);

  const { cart } = useSelector(selectCart);
  const { favorites } = useSelector(selectFavorites);

  const isInCart = useCallback((id: string) => {
    return cart?.some(item => item.product.phoneId === id) || false;
  }, [cart]);

  const isInFavorites = useCallback((id: string) => {
    return favorites?.some(item => item.phoneId === id) || false;
  }, [favorites]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    product && products && (
      <ProductDetailsView
        product={product}
        onColorChange={changeColor}
        onCapacityChange={changeCapacity}
        randomProducts={products}
        onCartAdd={onCartAdd}
        onFavoritesToggle={onFavoritesToggle}
        isInCart={isInCart}
        isInFavorites={isInFavorites}
      />
    )
  );
};
