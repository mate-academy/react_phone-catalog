import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { Product } from '../../types/itemTypes';
import { CartContext } from '../../context/CartContext';

const ButtonBox = ({ product }: { product: Product }) => {
  const { favourites, setFavourites } = useContext(ProductContext);
  const { cart, handleAddToCart } = useContext(CartContext);

  // Ajuste: Atribuição direta usando .some() para evitar o erro do linter
  const favourite = favourites.some(fav => fav.id === product.id);

  // Ajuste: Lógica mais limpa para a imagem do ícone
  const favouriteImg = favourite
    ? 'Favourites Filled (Heart Like).svg'
    : 'Favourites (Heart Like).svg';

  const handleFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!favourite) {
      setFavourites(prevFavourites => [...prevFavourites, product]);
    } else {
      setFavourites(prevFavourites =>
        prevFavourites.filter(fav => fav.id !== product.id),
      );
    }
  };

  const isProductInCart = Object.values(cart).some(
    item => item.product.id === product.id,
  );

  return (
    <div className="flex gap-2 text-center ">
      <button
        onClick={event => {
          event.stopPropagation();
          if (isProductInCart) {
            return;
          }

          handleAddToCart(product);
        }}
        className={`flex h-10 w-full items-center ${
          isProductInCart
            ? 'bg-white border text-green-400'
            : 'text-white bg-gray-900'
        } justify-center `}
      >
        {isProductInCart ? 'Added to cart' : 'Add to cart'}
      </button>
      <button
        onClick={handleFavourite}
        className="size-10 border flex items-center justify-center border-gray-400"
      >
        <img src={`/img/icons/${favouriteImg}`} alt="favourite button" />
      </button>
    </div>
  );
};

export default ButtonBox;
