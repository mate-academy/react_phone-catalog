import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import { getPhoneDetails } from '../../servises/ProductsDetails';
import { getAllProducts } from '../../servises/Products';

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{
    productId: string;
  }>();
  const [product, setProduct] = useState<ProductDetails | null>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (productId !== undefined) {
      const fetchProducts = async () => {
        try {
          const allProducts = await getAllProducts();
          const productById = allProducts.find(p => p.itemId === productId);

          if (productById) {
            const detailedProduct = await getPhoneDetails(
              productId,
              productById.category,
            );

            setProduct(detailedProduct);
          } else {
            setProduct(null);
          }
        } finally {
          setIsLoading(false);
        }
      };

      fetchProducts();
    }
  }, [productId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <Link to={`/${product?.category}`}>{product?.category}</Link>
        <span>{product?.name}</span>
      </div>
      <button onClick={() => navigate(-1)}>Back</button>
      <div>
        <h2>{product?.name}</h2>
        <p>Color: {product?.color}</p>
        <p>Capacity: {product?.color}</p>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
