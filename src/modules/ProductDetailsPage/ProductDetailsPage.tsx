import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Product } from "../shared/types/Product";
import { Loader } from "../../components/Loader";
import styles from "./ProductsDetailsPage.module.scss";

export const ProductDetailsPage: React.FC = () => {
const { itemId } = useParams<{ itemId: string}>();

const [product, setProduct] = useState<Product | null>(null);
const [isLoading, setIsLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  if (!itemId) {
    return;
  }

  const fetchCurrentProduct = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const phonesResponse = await fetch('/api/phones.json');
      const tabletsResponse = await fetch('/api/tablets.json');
      const accessoriesResponse = await fetch('/api/accessories.json');

      if (!phonesResponse.ok || !tabletsResponse.ok || !accessoriesResponse.ok) {
        throw new Error('Fetch error')
      }

      const phones = await phonesResponse.json();
      const tablets = await tabletsResponse.json();
      const accessories = await accessoriesResponse.json();

      const allProducts = [
        ...phones,
        ...tablets,
        ...accessories
      ];

      const foundProduct = allProducts.find((p: any) => p.itemId === itemId);

      if (!foundProduct) {
        setProduct(null);
      } else {
        setProduct(foundProduct);
      }
    } catch (e) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  fetchCurrentProduct();
}, [itemId])

if (isLoading) {
  return <Loader />;
}

if (error) {
  return <div>{error}</div>;
}

if (!product) {
  return <div>Product was not found</div>;
}

  return (
    <>
      <div className={styles["product-details-page"]}>
        <div className={styles["product-details-page__navi"]}>
          <NavLink to="/" className={styles["product-details-page__block"]}>
            <img src="/img/home.png" alt="logo" className={styles["product-details-page__logo"]}/>
          </NavLink>
          <img src="/img/r-shevron.png" alt="logo" className={styles["product-details-page__arrow"]}/>
          <p className={styles["product-details-page__page"]}>{product.category}</p>
        </div>
      <h1>{product.name}</h1>

      </div>
    </>
  )
}
