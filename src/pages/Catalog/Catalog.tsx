import React, { useState, useEffect, useContext } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SortBlock }  from '../../components/SortBlock/SortBlock';
import { useLocation } from 'react-router-dom';
import { FavouritesContext } from '../../components/FavouritesContext';

/*import { RouteComponentProps } from 'react-router-dom';
extends RouteComponentProps<{path: string}>*/

type CatalogProps={
  goods: Good[];
}

export const Catalog: React.FC<CatalogProps> = ({ goods }) => {
  /*const [itemsCount, setItemsCount] = useState<number>(16);*/
  let selectedItemsCount = 4;
  const [rowItemsCount, setRowItemsCount] = useState<number>(4);
  const [visibleGoods, setVisibleGoods] = useState<Good[]>(goods);
  const { favouriteGoods } = useContext(FavouritesContext);
  const location = useLocation();

  useEffect(()=> {
    if (location.pathname.includes('favourites')) {
      setVisibleGoods(favouriteGoods)
    } else {
     const matchedGoods = goods.filter(good =>location.pathname.includes(good.type));
     setVisibleGoods(matchedGoods);
    }
  },[location.pathname])

  useEffect(()=> {
    setRowItemsCount(selectedItemsCount)
  },[selectedItemsCount])

  return (
    <>
      <div className="catalog">
        <p className="catalog__title">
        <h1>Mobile phones</h1>
        </p>
        <p className="catalog__items-count">
          {visibleGoods.length} models
        </p>
        <SortBlock />
        <div className="catalog__products"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${rowItemsCount}, 272px)`,
            columnGap: "16px",
            rowGap: "40px",
          }}>
            {visibleGoods.map((good:Good) => {
              return (
              <ProductCard good={good} />
              )
            }
          )}
        </div>
      </div>
    </>
  )
}
