import { useAppSelector } from "../../app/hooks";

export const FavouritesPage = () => {
  // const dispatch = useAppDispatch();
  const { favProducts } = useAppSelector(state => state.favourites);

  // console.log(favProducts)

  return (
    <div>Favourites</div>
  );
};
