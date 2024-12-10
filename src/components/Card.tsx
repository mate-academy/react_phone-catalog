import React, { useEffect } from 'react';
import { Product } from '../types/product';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import * as productActions from '../features/products';
import * as selectedActions from '../features/selectedProduct';
import { PATHS_WHERE_NEED_FIND } from '../utils/rightPaths';
import classNames from 'classnames';

type Props = {
  products: Product[] | null;
};

export const Card: React.FC<Props> = ({ products }) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const { favourites, cartItems, quantity } = useAppSelector(
    state => state.products,
  );

  const handleSelectedProduct = (product: Product) => {
    dispatch(
      selectedActions.init({ category: product.category, id: product.itemId }),
    );
    dispatch(selectedActions.setModel(product));
  };

  const handleSetFavourite = (product: Product) => {
    dispatch(productActions.setFavourites(product.itemId));
  };

  const handleSetCartItems = (product: Product) => {
    dispatch(productActions.setCartItems(product.itemId));
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem('quantities', JSON.stringify(quantity));
  }, [quantity]);

  const isRightPath =
    PATHS_WHERE_NEED_FIND.some(path => pathname.slice(1) === path) ||
    pathname.slice(1) === 'favourites';

  return (
    <div
      className={`flex gap-x-[16px] ${isRightPath ? 'grid grid-cols-[repeat(auto-fit,minmax(229px,1fr))] gap-y-[40px]' : ''}`}
    >
      {products &&
        products.map(product => (
          <div
            className={`card ${isRightPath ? 'w-full' : ''}`}
            key={product.id}
          >
            <Link
              to={
                PATHS_WHERE_NEED_FIND.some(path => path === pathname.slice(1))
                  ? `${product.itemId}`
                  : `/${product.category}/${product.itemId}`
              }
              state={{ search: searchParams.toString() }}
              onClick={() => handleSelectedProduct(product)}
            >
              <div className="flex justify-center">
                <img
                  src={product.image}
                  alt="ProductImage"
                  className="card-img"
                />
              </div>

              <h3
                className="
                justify-left 
                flex 
                h-[63px] 
                items-center
                text-[14px]
                font-semibold
                leading-[21px]
                text-primary
              "
              >
                {product.name}
              </h3>
            </Link>

            <div className="flex gap-[8px]">
              <p
                className="
                  mb-[8px] 
                  font-mont-bold 
                  text-[22px] 
                  leading-[30.8px]
                "
              >{`$${product.price}`}</p>

              <p
                className="
                  mb-[8px] 
                  font-mont-bold 
                  text-[22px] 
                  leading-[30.8px]
                  text-secondary
                  line-through
                "
              >{`$${product.fullPrice}`}</p>
            </div>

            <div className="params">
              <div className={`flex justify-between`}>
                <p className="params-text text-secondary">Screen</p>
                <p className="params-text text-primary">{product.screen}</p>
              </div>

              <div className="flex justify-between">
                <p className="params-text text-secondary">Capacity</p>
                <p className="params-text text-primary">{product.capacity}</p>
              </div>

              <div className="flex justify-between">
                <p className="params-text text-secondary">RAM</p>
                <p className="params-text text-primary">{product.ram}</p>
              </div>
            </div>

            <div className="mt-[16px] flex gap-[8px]">
              <button
                className={classNames('card-button bg-accent text-white', {
                  'w-full': isRightPath,
                  'border bg-white text-accent': cartItems.some(
                    cart => cart.itemId === product.itemId,
                  ),
                })}
                onClick={() => handleSetCartItems(product)}
              >
                {Array.isArray(cartItems) &&
                cartItems.some(cart => cart.itemId === product.itemId)
                  ? 'Added to cart'
                  : 'Add to cart'}
              </button>

              <button
                className="card-button-favourite"
                onClick={() => handleSetFavourite(product)}
              >
                {favourites.some(fav => fav.itemId === product.itemId) ? (
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
        ))}
    </div>
  );
};
