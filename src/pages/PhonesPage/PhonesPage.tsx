import React, { useState, useEffect } from "react";
import { getPhones } from "../../components/api";
import {ProductsWithPagination} from '../../components/ProductsWithPagination'

import { Card } from "../../interfaces/Card";

export const PhonesPage: React.FC = () => {
  const [products, setProducts] = useState<Card[]>([] as Card[])
  
  const fetchProducts = async () => {
    await getPhones().then((response) => {setProducts(response)})
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="Page">
      <ProductsWithPagination products={products} title="Phones"/>
    </div>
  )
}
