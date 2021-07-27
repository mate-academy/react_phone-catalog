import React, { useState, useEffect } from "react";
import { getTablets } from "../../components/api";
import {ProductsWithPagination} from '../../components/ProductsWithPagination'

import { Card } from "../../interfaces/Card";

export const TabletsPage: React.FC = () => {
  const [products, setProducts] = useState<Card[]>([] as Card[])
  
  const fetchProducts = async () => {
    await getTablets().then((response) => {setProducts(response)})
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="Page">
      <ProductsWithPagination products={products} title="Tablets"/>
    </div>
  )
}
