import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ProductsList } from "../ProductsList";
import { Pagination } from "../../components/Pagination";
import { Select } from "../../components/Select";
import { Loader } from "../Loader";
import { NoResults } from "../NoResults";
import { Breadcrumbs } from "../Breadcrumbs";

import {Card} from '../../interfaces/Card'

interface Props {
  products: Card[];
  title: string;
}

export const ProductsWithPagination: React.FC<Props> = ({ products, title }) => {
  const location = useLocation()
  const history = useHistory()
  const searchParams = new URLSearchParams(location.search)
  
  const sortBy = searchParams.get('sortBy') || '';
  const query = searchParams.get('query') || ''
  const cardsPerPage = searchParams.get('cardsPerPage') || '4'

  let currentPage: number = +(searchParams.get('page') || '1');
  
  const lastCardIndex = currentPage * +cardsPerPage;
  const firstCardIndex = currentPage * +cardsPerPage - +cardsPerPage;

  const [visibleProducts, setVisibleProducts] = useState<Card[]>([] as Card[]);


  // useEffect(() => {
  //   searchParams.set('page', `${1}`);
  //   history.push({search: searchParams.toString()});
  // }, [cardsPerPage, query])

  useEffect(() => {
    if(products === []) {
      return;
    }
    setVisibleProducts([...products].sort((a: Card, b: Card) => {
      if(sortBy === 'name') {
        return a.name.localeCompare(b.name)
      }
      if(sortBy === 'age' || sortBy === 'price') {
        return a[sortBy] - b[sortBy]
      }
      return 1
    }).filter(
      (product) => product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    ))
  }, [currentPage, lastCardIndex, firstCardIndex, products, sortBy, query])

  return (
    <>
      {query === '' ?
        <Breadcrumbs/>
        : ''
      }
      <div>
        {query === '' ?
          <h1>{title}</h1>
          : ''
        }
        <small className="text_color_gray">{visibleProducts.length} models</small>
      </div>
      <section>
        {query === '' ?
          <div className="row_gap_10px">
            <Select
              keyInUrl={'cardsPerPage'}
              onChange={(newSearchParams) => {
                newSearchParams.set('page', `${1}`);
                history.push({search: newSearchParams.toString()});
              }}
              label={"Items on page"}
              options={[
                {value: '4', text: '4'},
                {value: '8', text: '8'},
                {value: '16', text: '16'}
              ]}/>
            <Select keyInUrl={'sortBy'}
              label={"Sort by"}
              options={[
                {value: 'age', text: 'Newest'},
                {value: 'name', text: 'Alphabetically'},
                {value: 'price', text: 'Cheapest'}
              ]}/>
          </div>
          : ''
        }
        {products === null ? <Loader /> : ''}
        {visibleProducts.length > 0
          ? <ProductsList cardsArr={visibleProducts.slice(firstCardIndex, lastCardIndex)}/>
          : <NoResults />
        }
        {visibleProducts.length > +cardsPerPage
          ? <Pagination cardsPerPage={+cardsPerPage} totalCards={visibleProducts.length}/>
          : ''
        }
      </section>
    </>
  )
}