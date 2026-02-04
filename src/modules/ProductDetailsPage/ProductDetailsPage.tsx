import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Product } from "../shared/types/Product";
import { Loader } from "../../components/Loader";
import styles from "./ProductsDetailsPage.module.scss";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import { PHONE_API, ACCESSORIES_API, TABLETS_API } from "../shared/constants/constants";
import { fetchUrl } from "../shared/FetchFunction/FetchFunction";

export const ProductDetailsPage: React.FC = () => {
const { productId } = useParams();
const navigate = useNavigate();

const [product, setProduct] = useState<Product | null>(null);
const [isLoading, setIsLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
const [variants, setVariants] = useState<Product[]>([]);

const apis = [PHONE_API, ACCESSORIES_API, TABLETS_API];

useEffect(() => {
  const fetchCurrentProduct = async () => {
    setIsLoading(true);
    setError(null);

    try {
    for (const api of apis) {
      const data = await fetchUrl(api);
      const currentProduct = data.find((p: Product) => String(p.id) === productId);

      if (currentProduct) {
        const spaceId = currentProduct.namespaceId;
        const variants = data.filter((p: Product) => p.namespaceId === spaceId);

        setProduct(currentProduct);
        setVariants(variants);
        break;
      }
    }
    } catch (e) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  fetchCurrentProduct();
}, [productId])

  return (
    <div className={styles["product-details-page"]}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : !product ? (
        <NotFoundPage />
      ) : (
      <>
        <div className={styles["product-details-page__navi"]}>
          <NavLink to="/" className={styles["product-details-page__block"]}>
            <img src="/img/home.png" alt="logo" className={styles["product-details-page__logo"]}/>
          </NavLink>
          <img src="/img/r-shevron.png" alt="logo" className={styles["product-details-page__arrow"]}/>
          <p className={styles["product-details-page__page"]}>{product.category}</p>
        </div>
        <div className={styles["product-details-page__content"]}>
          <h1 className={styles["product-details-page__content__title"]}>{product.name}</h1>
          <div className={styles["product-details-page__content__photo-block"]}>
            <img src={product.images[selectedImageIndex]} alt="photo" className={styles["product-details-page__content__photo-block__photo"]} />
          </div>
          <div className={styles["product-details-page__content__photo-slider"]}>
            {product.images.map((image, index) => (
              <button
                onClick={() => setSelectedImageIndex(index)}
                key={index}
                className={`${styles["product-details-page__content__photo-slider__button"]} ${index === selectedImageIndex ? styles["product-details-page__content__photo-slider__button--active"] : ""}`}
              >
                <img src={image} alt="photo" className={styles["product-details-page__content__photo-slider__photo"]} />
              </button>
            ))}
          </div>
          <div className={styles["product-details-page__content__colors"]}>
            <div className={styles["product-details-page__content__colors__title"]}>
              <p className={styles["product-details-page__content__colors__title__name"]}>Available colors</p>
              <p className={styles["product-details-page__content__colors__title__name"]}>ID: {product.priceRegular}{product.priceDiscount}</p>
            </div>
            <div className={styles["product-details-page__content__colors__available"]}>
              {variants.map((variant) => (
                <button
                  onClick={() => navigate(`/products/${variant.id}`)}
                  key={variant.id}
                  className={`${styles["product-details-page__content__colors__available__block"]}
                    ${variant.id === product.id ? styles["product-details-page__content__colors__available__block--active"] : ""}`}
                  style={{ backgroundColor: variant.color }}
                >
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
      )}
    </div>
  );
}
