import React from 'react';
import { Product } from '../../../../types/ProductTypes/Product';
import AllProductsCard from '../Cards/AllProductCard/AllProductCard';


type ProductsListProps = {
  products: Product[];
};

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  if (!products || products.length === 0) return <p>Nenhum produto encontrado.</p>;

  return (
    <div className='phonesGrid'>
      {products.map((p) => (
        <AllProductsCard
          key={p.itemId}
          product={{
            itemId: p.itemId,
            name: p.name,
            priceDiscount: p.price,
            priceRegular: p.fullPrice,
            image: p.image
          }}
        />
      ))}
    </div>
  );
};

export default ProductsList;
