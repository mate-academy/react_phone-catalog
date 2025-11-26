import React, { useEffect, useState } from "react";
import styles from "./YouMayAlsoLike.module.scss";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  itemId: string;
  name: string;
  price: number;
};

export const YouMayAlsoLike: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch("/api/products.json")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const random = data[Math.floor(Math.random() * data.length)];
        setProduct(random);
      })
      .catch((err) => console.error("Erro ao carregar produto:", err));
  }, []);

  if (!product) return null;

  return (
    <>
     <Link to={`/product/${product.itemId}`} className={styles.productName}>
    <div className={styles.card}>
      <p className={styles.name}>{product.name}</p>
      <p className={styles.price}>${product.price}</p>
    </div>
    </Link>
    </>
  );
};

export default YouMayAlsoLike;