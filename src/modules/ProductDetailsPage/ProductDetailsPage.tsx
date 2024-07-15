import React, { useEffect, useState } from 'react';
import { Product } from './type';


export const ProductDetails: React.FC = () => {


    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
      const fetchPhoneData = async () => {
        const response = await fetch('/api/phones.json');
        const data = await response.json();
        setProduct(data[20]);
        console.log(data[20]);
      };

      fetchPhoneData();
    }, []);

    if (!product) {
      return <div> Loading... </div>
    }


    return (


      <div>
        <div>
          <h1>{product.name}</h1>
        </div>
      </div>
    );
};

