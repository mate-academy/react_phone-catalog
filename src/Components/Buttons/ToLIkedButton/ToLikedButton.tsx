import { useLocaleStorage } from '../../../Helpers/LocaleStorage';
import { Product } from '../../../Types/Product';
import './ToLikedButton.scss';

type Props = {
  product: Product,
};

export const ToLikedButton: React.FC<Props> = ({ product }) => {
  const [
    favoritesProducts,
    setFavoritesProducts,
  ] = useLocaleStorage('favoritesItems', []);

  const onAddToFavorites = (productData: Product) => {
    setFavoritesProducts(productData);
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
            ? '/Images/Heart--002.svg'
            : '/Images/Heart--001.svg'}
          alt="Hearе"
          style={{ width: '15px', height: '15px' }}
        />
      </button>
    </>
  );
};
