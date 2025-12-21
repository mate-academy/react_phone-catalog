import { useContext, useMemo } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import './FavButton.scss';
import classNames from "classnames";

type Props = {
  productId: string,
  size?: 'm';
}

export const FavButton: React.FC<Props> = ({
  productId,
  size,
}) => {
  const { favorites, toggleFavorites } = useContext(GlobalContext);

  const isProductInFaforites = useMemo(() => {
    return favorites.some(item => item === productId);
  }, [favorites, productId]);

  return (
    <button
      className={classNames(
        'button-fav',
        size ? 'button-fav--m' : '',
        { 'button-fav--selected': isProductInFaforites },
      )}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleFavorites(productId);
      }}
    />
  );
}
