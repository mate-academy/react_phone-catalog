import { useState, useContext } from 'react';
import classNames from 'classnames';
import { Context } from '../context';
import { ProductType } from '../../types/Product';
import { useLocalStorage } from '../../hooks/use--localStorage';

type Props = {
  product: ProductType | undefined
};

export const ButtonAddToFavorite: React.FC<Props> = ({ product }) => {
  const {
    favorite,
    setFavorite,
  } = useContext(Context);

  const [
    buttonFavorite,
    setButtonFavorite,
  ] = useState(favorite?.some(productItem => productItem.id === product?.id));

  const [
    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
    _favoritesLocalStorage,
    setFavoritesLocalStorage,
  ] = useLocalStorage('favorite', favorite);

  return product ? (
    <button
      type="button"
      className="card__button card__button--add_to_favorits"
      onClick={() => {
        if (favorite && buttonFavorite) {
          const newProductsInFavorite = [...favorite
            .filter(productItem => productItem.id !== product.id)];

          setFavoritesLocalStorage(newProductsInFavorite);
          setFavorite(newProductsInFavorite);
          setButtonFavorite(false);
        } else if (!favorite?.length) {
          const newProductsInFavorite = [product];

          setFavoritesLocalStorage(newProductsInFavorite);
          setFavorite(newProductsInFavorite);

          setButtonFavorite(true);
        } else {
          const newProductsInFavorite = [...favorite, product];

          setFavoritesLocalStorage(newProductsInFavorite);
          setFavorite(newProductsInFavorite);

          setButtonFavorite(true);
        }

        setButtonFavorite(!buttonFavorite);
      }}
    >
      <svg
        className={classNames(
          { 'card__button--active_to_favorits': buttonFavorite },
        )}
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.62848 0.631417C10.1584 0.411843 10.7264 0.298828
          11.3 0.298828C11.8736 0.298828 12.4416 0.411843 12.9715
          0.631417C13.5014 0.850991 13.9829 1.17282 14.3884 1.57852C14.794
          1.98398 15.1158 2.46537 15.3353 2.99519C15.5549 3.52511 15.6679
          4.0931 15.6679 4.66671C15.6679 5.24032 15.5549 5.80831 15.3353
          6.33824C15.1157 6.86811 14.794 7.34953 14.3883 7.75502C14.3883
          7.75506 14.3883 7.75498 14.3883 7.75502L8.49498 13.6484C8.22161
          13.9217 7.77839 13.9217 7.50503 13.6484L1.61169 7.75502C0.792623
          6.93595 0.332474 5.82505 0.332474 4.66671C0.332474 3.50837 0.792623
          2.39747 1.61169 1.5784C2.43076 0.759334 3.54166 0.299185
          4.7 0.299185C5.85834 0.299185 6.96924 0.759334 7.78831 1.5784L8
          1.7901L8.21158 1.57852C8.21162 1.57848 8.21154 1.57856 8.21158
          1.57852C8.61706 1.17288 9.0986 0.85097 9.62848 0.631417ZM13.3982
          2.56824C13.1227 2.29261 12.7956 2.07396 12.4356 1.92479C12.0756
          1.77561 11.6897 1.69883 11.3 1.69883C10.9103 1.69883 10.5244 1.77561
          10.1644 1.92479C9.80436 2.07396 9.47726 2.29261 9.20176
          2.56824L8.494983.27502C8.22161 3.54839 7.77839 3.54839
          7.50503 3.27502L6.79836 2.56835C6.24184 2.01183 5.48704 1.69918
          4.7 1.69918C3.91296 1.69918 3.15816 2.01183 2.60164 2.56835C2.04512
          3.12487 1.73247 3.87967 1.73247 4.66671C1.73247 5.45375 2.04512
          6.20855 2.60164 6.76507L8 12.1634L13.3984 6.76507C13.674 6.48957
          13.8927 6.16235 14.0419 5.80233C14.1911 5.4423 14.2679 5.05642
          14.2679 4.66671C14.2679 4.27701 14.1911 3.89112 14.0419 3.5311C13.8927
          3.17107 13.6739 2.84374 13.3982 2.56824Z"
          fill="#333333"
        />
      </svg>

    </button>
  ) : (<h2>no product</h2>);
};
