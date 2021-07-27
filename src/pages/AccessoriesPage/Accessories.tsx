import React, { useState, useEffect } from "react";
import { getAccessories } from "../../components/api";
import {ProductsWithPagination} from '../../components/ProductsWithPagination'

import { Card } from "../../interfaces/Card";

export const AccessoriesPage: React.FC = () => {
  const [products, setProducts] = useState<Card[]>([] as Card[])
  
  const fetchProducts = async () => {
    await getAccessories().then((response) => {setProducts(response)})
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="Page">
      <ProductsWithPagination products={products} title="Accessories"/>
    </div>
  )
}
