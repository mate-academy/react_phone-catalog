import React from 'react';

// Define the Product and Products types
/* interface Product {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
} */

/* interface Products {
  itemsArray: Product[];
} */

const products = [
  { id: '1', name: 'Smartphone A' },
  { id: '2', name: 'Smartphone B' },
  { id: '3', name: 'Smartphone C' },
];

export const ProductList: React.FC = () => {
/*   const [products, setProducts] = useState<Product[]>([]); */
  console.log('products 1:',products)
/*   const [error, setError] = useState<string | null>(null); */

  /* useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('/api/phones.json');
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data: Products = await response.json();
        console.log("Fetched data 1:", data);
        setProducts(data.itemsArray);
        console.log('products 2:',products)
      } catch (err) {
        console.error("Fetch error:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchProductData();
  }, []); */
  console.log('products 3:',products)

/*   if (error) {
    return <div>Error: {error}</div>;
  } */

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}

    </ul>
  );

};

