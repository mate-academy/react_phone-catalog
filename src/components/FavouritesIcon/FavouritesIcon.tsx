import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import themeStyles from '../../styles/utils/themeStyles';
import { setFavouritesProducts } from '../../features/favourites';
import { Product } from '../../types/product';

type Props = {
  itemId: string;
  itemData?: Product;
};

export const FavouritesIcon: React.FC<Props> = ({ itemId, itemData }) => {
  const dispatch = useDispatch();

  const favouritesItems = useSelector(
    (state: RootState) => state.favourites.items,
  );
  const currentTheme = useSelector(
    (state: RootState) => state.currentTheme.theme,
  );
  const productsList = useSelector((state: RootState) => state.products.items);

  const { favourites, favouritesActive } = themeStyles(
    currentTheme === 'light-theme',
  );

  // Function to determine the correct icon based on whether the product is already in favourites
  const getFavouritesIcon = () => {
    const isAlreadyExist = favouritesItems.some(item => item.itemId === itemId);

    return isAlreadyExist ? favouritesActive : favourites;
  };

  // Function to retrieve the current product based on the itemId
  // This is needed when itemData is not passed and we have to find the product in the list
  const getCurrentProduct = (): Product | undefined => {
    return productsList.find(product => product.itemId === itemId);
  };

  const handleFavouriteButtonClick = () => {
    const product = itemData || getCurrentProduct();

    if (product) {
      dispatch(setFavouritesProducts(product));
    }
  };

  return (
    <div className="favourites-button" onClick={handleFavouriteButtonClick}>
      <img src={getFavouritesIcon()} alt="Favourites" className="icon" />
    </div>
  );
};
