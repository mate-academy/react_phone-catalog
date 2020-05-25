import React, { useState, useEffect } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SortBlock }  from '../../components/SortBlock/SortBlock';
/*import { RouteComponentProps } from 'react-router-dom';
extends RouteComponentProps<{path: string}>*/

type CatalogProps={
  goods: Good[];
}

export const Catalog: React.FC<CatalogProps> = ({ goods }) => {
 /* const [itemsCount, setItemsCount] = useState<number>(16);*/
  let selectedItemsCount = 4;
  const [rowItemsCount, setRowItemsCount] = useState<number>(4);

  useEffect(()=> {
    setRowItemsCount(selectedItemsCount)
  },[selectedItemsCount])

  console.log(goods)
  return (
    <>
      <div className="catalog">
        <p className="catalog__title">
        <h1>Mobile phones</h1>
        </p>
        <p className="catalog__items-count">
          95 models
        </p>
        <SortBlock />
        <div className="catalog__products"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${rowItemsCount}, 272px)`,
            columnGap: "16px",
            rowGap: "40px",
          }}>
            {goods.map((good:Good) => {
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
