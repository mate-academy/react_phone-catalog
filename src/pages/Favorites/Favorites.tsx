import React from "react";
import { ProductsList } from "../../components/ProductsList";
import { useEffect } from "react";
import { getProductsById } from "../../components/api";
import {Card} from '../../interfaces/Card'
import { useState } from "react";
import { Breadcrumbs } from "../../components/Breadcrumbs";


export interface Props {
  favorites?: string[];
}

export const Favorites: React.FC<Props> = ({ favorites = [] }) => {
  let [products, setProducts] = useState<Card[]>([]);

  useEffect(() => {
    getProductsById(favorites).then((resp) => setProducts(resp));
  }, [favorites])

  return (
    <div className="Page">
      <Breadcrumbs/>
      <h1>Favorites</h1>
      <section>
        <ProductsList cardsArr={products}/>
      </section>
    </div>
  )
}
