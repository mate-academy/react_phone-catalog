/* eslint-disable max-len */
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { typographyStyle } from '../CustomStyles/Typography';
import { ProductType } from '../Types/ProductType';
import { FavouritesButton } from './FavouritesButton';
import { TextButton } from './TextButton';
import { baseUrl } from '../api/api';
import { appContext } from '../Contexts/AppContext';

type Props = {
  product: ProductType;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    favorites, setFavorites, cartItems, setCartItems,
  }
    = useContext(appContext);
  const [isLiked, setIsLiked] = useState(
    favorites.some(favProduct => favProduct.itemId === product.itemId),
  );

  const toggleFavorite = () => {
    if (isLiked) {
      setFavorites(
        favorites.filter(favProduct => favProduct.itemId !== product.itemId),
      );
      setIsLiked(false);
    } else {
      setFavorites([...favorites, product]);
      setIsLiked(true);
    }
  };

  const addToCart = () => {
    const cartItemIndex = cartItems.findIndex(
      item => item.product.itemId === product.itemId,
    );

    if (cartItemIndex >= 0) {
      const newItems = [...cartItems];

      newItems[cartItemIndex].quantity += 1;
      setCartItems([...newItems]);
    } else {
      setCartItems([...cartItems, { quantity: 1, product }]);
    }
  };

  return (
    <div className="flex w-[272px] flex-col border border-Elements p-6 transition-all hover:border hover:border-Primary">
      <Link to={`/catalogue/phones/${product.itemId}`}>
        <img
          className="h-[208px] w-[208px] self-center object-contain"
          src={`${baseUrl}/_new/${product.image}`}
          alt=""
        />
      </Link>

      <hr className="h-6 border-0" />

      <Link
        to={`/catalogue/phones/${product.itemId}`}
        className={`flex h-[42px] w-[224px] items-center ${typographyStyle.bodyText}`}
      >
        {product.name}
      </Link>

      <hr className="h-2 border-0" />

      <div className={`flex gap-2 ${typographyStyle.h2}`}>
        <div className="font-bold leading-[140%] ">
          $
          {product.price}
        </div>
        <div className="relative font-medium text-Secondary line-through ">
          $
          {product.fullPrice}
        </div>
      </div>

      <hr className="mb-4 mt-2 border" />

      <div className="flex flex-col gap-y-2">
        <div className={`flex justify-between ${typographyStyle.button}`}>
          <div className="text-Secondary">Screen</div>
          <div>{product.screen}</div>
        </div>

        <div className={`flex justify-between ${typographyStyle.button}`}>
          <div className="text-Secondary">Capacity</div>
          <div>{product.capacity}</div>
        </div>

        <div className={`flex justify-between ${typographyStyle.button}`}>
          <div className="text-Secondary">RAM</div>
          <div>{product.ram}</div>
        </div>
      </div>

      <hr className="mb-4 border-0" />

      <div className={`flex h-10 gap-2 ${typographyStyle.button}`}>
        <TextButton onClick={addToCart}>Add to cart</TextButton>

        <div className="w-10 shrink-0">
          <FavouritesButton active={isLiked} onClick={toggleFavorite} />
        </div>
      </div>
    </div>
  );
};
