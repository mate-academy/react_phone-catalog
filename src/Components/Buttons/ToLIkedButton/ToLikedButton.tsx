import { useLocaleStorage } from '../../../Helpers/LocaleStorage';
import { Product } from '../../../Types/Product';
import './ToLikedButton.scss';

type Props = {
  product: Product,
};

export const ToLikedButton: React.FC<Props> = ({ product }) => {
  /*
    eslint-disable @typescript-eslint/indent,
    react/jsx-indent,
    @typescript-eslint/no-unused-expressions
  */
  const [
    favoritesProducts,
    setFavoritesProducts,
  ] = useLocaleStorage<Product[]>('favoritesItems', []);

  const onAddToFavorites = (productData: Product) => {
    favoritesProducts.some((item) => item.id === productData.id)
      ? setFavoritesProducts(
        [...favoritesProducts.filter(
          (item: Product) => item.id !== productData.id,
        )],
      )
      : setFavoritesProducts([...favoritesProducts, productData]);
  };

  return (
    <>
      <button
        type="button"
        className="liked liked--add"
        onClick={() => onAddToFavorites(product)}
      >
        <img
          src={favoritesProducts.some(
            (item) => item.id === product.id,
          )
            ? 'Images/Heart--002.svg'
            : 'Images/Heart--001.svg'}
          alt="Hearе"
          style={{ width: '15px', height: '15px' }}
        />
      </button>
    </>
  );
};
