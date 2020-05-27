import React, { useState, useEffect, useMemo } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SortBlock }  from '../../components/SortBlock/SortBlock';
import { useLocation, useParams } from 'react-router-dom';

/*import { RouteComponentProps } from 'react-router-dom';
extends RouteComponentProps<{path: string}>*/

type CatalogProps={
  goods: Good[];
}

const setVisibleGoods = (goods: Good[], section: string) => {
  console.log('render');
  return goods.filter(good => section.includes(good.type));
}

export const Catalog: React.FC<CatalogProps> = ({ goods }) => {
  /*const [itemsCount, setItemsCount] = useState<number>(16);*/
  let selectedItemsCount = 4;
  const [rowItemsCount, setRowItemsCount] = useState<number>(4);
  const { section } = useParams()
  console.log( section )


  const location = useLocation();
  console.log(location)


  const visibleGoods = useMemo(() => setVisibleGoods(goods, section), [section])

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
