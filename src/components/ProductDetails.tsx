import * as selectedActions from '../features/selectedProduct';
import * as productActions from '../features/products';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { useEffect } from 'react';

export const ProductDetails = () => {
  const dispatch = useAppDispatch();

  const { selectedProduct } = useAppSelector(state => state.selectedProduct);
  const { favourites, cartItems } = useAppSelector(state => state.products);

  const handleSetColor = (color: string) => {
    dispatch(selectedActions.setSelectedColor(color));

    if (selectedProduct) {
      dispatch(
        selectedActions.init({
          category: selectedProduct?.category,
          namespaceId: selectedProduct?.namespaceId,
          currentCapacity: selectedProduct?.capacity,
          color: color,
        }),
      );
    }
  };

  const handleSetCapacity = (capacity: string) => {
    dispatch(selectedActions.setSelectedCapacity(capacity));

    if (selectedProduct) {
      dispatch(
        selectedActions.init({
          category: selectedProduct?.category,
          namespaceId: selectedProduct?.namespaceId,
          currentColor: selectedProduct?.color,
          capacity: capacity,
        }),
      );
    }
  };

  const handleSetFavourite = () => {
    if (selectedProduct) {
      dispatch(productActions.setFavourites(selectedProduct.id));
    }
  };

  const handleSetCartItems = () => {
    if (selectedProduct) {
      dispatch(productActions.setCartItems(selectedProduct.id));
    }
  };

  useEffect(() => {
    localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
  }, [favourites, cartItems, selectedProduct]);

  return (
    <div
      className="
        col-[1/5]
        mb-[56px]
        sm:col-[8/13]
        sm:mb-[64px]
        xl:col-[14/21]
        xl:mb-[80px]
      "
    >
      <p
        className="
          params-text
          mb-[8px]
          text-secondary
        "
      >
        Available colors
      </p>

      <div className="availaible-colors-container">
        <div className="flex flex-row gap-[8px]">
          {selectedProduct?.colorsAvailable.map(color => (
            <div
              key={color}
              className={`
                cursor-pointer
                rounded-[36px]
                border
                ${
                  selectedProduct.color === color
                    ? 'border-primary'
                    : 'border-elements'
                }
              `}
              onClick={() => handleSetColor(color)}
            >
              <div
                style={{ background: color }}
                className="
                  h-[32px]
                  w-[32px]
                  rounded-[36px]
                  border-[2px]
                  border-white
                "
              />
            </div>
          ))}
        </div>
      </div>

      <p
        className="
          params-text
          mb-[8px]
          text-secondary
        "
      >
        Select capacity
      </p>

      <div className="select-capacity-container">
        <div className="flex gap-[8px]">
          {selectedProduct?.capacityAvailable.map(capacity => (
            <div
              key={capacity}
              className={`
              h-32px
              flex
              cursor-pointer
              items-center
              justify-center
              rounded-[4px]
              ${
                selectedProduct.capacity === capacity
                  ? 'bg-primary'
                  : 'border border-icons-color'
              }
            `}
              onClick={() => handleSetCapacity(capacity)}
            >
              <p
                className={`
              px-[8px]
              font-mont-regular
              text-[14px]
              leading-[21px]
              ${
                selectedProduct.capacity === capacity
                  ? 'text-white'
                  : 'text-primary'
              }
            `}
              >
                {capacity}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-[32px] flex flex-col gap-[16px]">
        <div className="flex items-center gap-[8px]">
          <p
            className="
              font-mont-bold
              text-[32px]
              leading-[41px]
              tracking-[-0.01em]
            "
          >{`$${selectedProduct?.priceDiscount}`}</p>
          <p
            className="
              text-[22px]
              leading-[28.12px]
              text-secondary
              line-through
            "
          >{`$${selectedProduct?.priceRegular}`}</p>
        </div>

        <div className="flex gap-[8px]">
          <button
            className={`
              card-button
              w-full
              ${
                cartItems.some(cart => cart.itemId === selectedProduct?.id)
                  ? 'border bg-white text-accent'
                  : 'bg-accent text-white'
              }
            `}
            onClick={handleSetCartItems}
          >
            {cartItems.some(cart => cart.itemId === selectedProduct?.id)
              ? 'Added to cart'
              : 'Add to cart'}
          </button>

          <button
            className="card-button-favourite"
            onClick={handleSetFavourite}
          >
            {favourites.some(fav => fav.itemId === selectedProduct?.id) ? (
              <img
                src="./img/icons/Favourites_Heart_Like.svg"
                alt="Favourite"
              />
            ) : (
              <img src="./img/icons/Favourites.svg" alt="Favourite" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-[8px]">
        <div className="flex justify-between">
          <p className="params-text text-secondary">Screen</p>
          <p className="params-text text-primary">{selectedProduct?.screen}</p>
        </div>

        <div className="flex justify-between">
          <p className="params-text text-secondary">Resolution</p>
          <p className="params-text text-primary">
            {selectedProduct?.resolution}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="params-text text-secondary">Processor</p>
          <p className="params-text text-primary">
            {selectedProduct?.processor}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="params-text text-secondary">RAM</p>
          <p className="params-text text-primary">{selectedProduct?.ram}</p>
        </div>
      </div>
    </div>
  );
};
