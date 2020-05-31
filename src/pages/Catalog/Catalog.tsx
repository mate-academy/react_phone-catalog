import React, { useState, useEffect } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SortBlock }  from '../../components/SortBlock/SortBlock';
import { useParams, useLocation } from 'react-router-dom';
import { PaginationWithRouter } from '../../components/Pagination';

type CatalogProps={
  goods: Good[];
}

export const Catalog: React.FC<CatalogProps> = ({ goods }) => {
  let selectedItemsCount = 4;
  const [rowItemsCount, setRowItemsCount] = useState<number>(4);
  const [currentSectionGoods, setCurrentSectionGoods] = useState<Good[]>([])
  const [visibleGoods, setVisibleGoods] =  useState<Good[]>(currentSectionGoods);
  const { section } = useParams();

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 8;

 /* const sortTypeFromURL = (searchParams.get('sortBy') || 'newest').toLowerCase();
  const queryFromURL = (searchParams.get('query') || '').toLowerCase();*/

  useEffect(() => {
    setCurrentSectionGoods(goods.filter((good) => section.includes(good.type)))
  }, [section, goods])

  useEffect(() => {
    if (currentPage === 1) {
      setVisibleGoods([...currentSectionGoods].splice(0, perPage))
    } else {
      setVisibleGoods([...currentSectionGoods].splice(perPage*(currentPage-1), perPage))
    }
  }, [currentSectionGoods, perPage, currentPage])





  useEffect(()=> {
    setRowItemsCount(selectedItemsCount)
  },[selectedItemsCount]);

  console.log('state: ');

  return (
    <>
      <div className="catalog">
        <p className="catalog__title">
        <h1>Mobile phones</h1>
        </p>
        <p className="catalog__items-count">
          {goods.length} models
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
        {(currentSectionGoods.length > 0)
        && <PaginationWithRouter goodCount={currentSectionGoods.length} />}
      </div>
    </>
  )
}


/*
type Dispatch = {
  type: 'query' | 'sortBy' | 'section',
  sortField: string,
 }


useEffect(() => {

       dispatch({ type: 'sortBy', sortField: sortTypeFromURL});

      console.log('dispatch query')
      dispatch({ type: 'query', sortField: queryFromURL});

      console.log('dispatch section')
      dispatch({ type: 'section', sortField: section});


  }, [section, queryFromURL, sortTypeFromURL, location])



 function filterReduce(state:Good[], action:Dispatch) {

    console.log(action.sortField);
      switch(action.type) {
        case 'section': {
          console.log([...state].filter((good) => action.sortField.toLowerCase().includes(good.type)));
          return [...state].filter((good) => action.sortField.toLowerCase().includes(good.type));
        }
        case 'sortBy': {

          if(action.sortField === 'newest') {
            console.log([...state].sort((a, b) => a.age - b.age));
            return [...state].sort((a, b) => a.age - b.age);
          } else if (action.sortField === 'low_price') {
            console.log([...state].sort((a, b) => ((a.price * (100 - a.discount) / 100) - (b.price * (100 - b.discount) / 100))));
            return [...state].sort((a, b) => ((a.price * (100 - a.discount) / 100) - (b.price * (100 - b.discount) / 100)));
          } else if (action.sortField === 'high_price') {
            return [...state].sort((a, b) => ((b.price * (100 - b.discount) / 100) - (a.price * (100 - a.discount) / 100)));
          } else {
          return state;
          }
        }
          case 'query': {
        return [...state].filter((good) => good.name.toLowerCase().includes(action.sortField));
        }

        default: {
          console.log('action.type not found')
          return  state;
        }
      }
    }




    const [state, dispatch ] =  useReducer(filterReduce, goods);
*/
