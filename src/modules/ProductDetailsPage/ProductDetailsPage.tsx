import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Product } from "../shared/types/Product";
import { Loader } from "../../components/Loader";
import styles from "./ProductsDetailsPage.module.scss";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import { PHONE_API, ACCESSORIES_API, TABLETS_API } from "../shared/constants/constants";
import { fetchUrl } from "../shared/FetchFunction/FetchFunction";
import classNames from "classnames";
import { ProductsSlider } from "../../components/ProductsSlider";
import { BackButton } from "../../components/BackButton";


export const ProductDetailsPage: React.FC = () => {
const { productId } = useParams();
const navigate = useNavigate();

const [product, setProduct] = useState<Product | null>(null);
const [isLoading, setIsLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
const [variants, setVariants] = useState<Product[]>([]);
const [sameProducts, setSameProducts] = useState<Product[]>([]);

const [isSelected, setIsSelected] = useState(false);
const [isLiked, setIsLiked] = useState(false);


const apis = [PHONE_API, ACCESSORIES_API, TABLETS_API];

useEffect(() => {
  const fetchCurrentProduct = async () => {
    setIsLoading(true);
    setError(null);
    setSelectedImageIndex(0);

    try {
    for (const api of apis) {
      const data = await fetchUrl(api);
      const currentProduct = data.find((p: Product) => String(p.id) === productId);

      const normalized = data.map((product: any) => ({
        ...product,
        image: product.images?.[0] || product.image,
        price: product.priceDiscount || product.price,
        fullPrice: product.priceRegular || product.fullPrice,
        productId: product.id,
      }));

      if (currentProduct) {
        const spaceId = currentProduct.namespaceId;
        const variants = data.filter((p: Product) => p.namespaceId === spaceId);

        setSameProducts(normalized)
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


function handleAddClick() {
    setIsSelected(!isSelected);
}

  function handleLikeClick() {
    setIsLiked(!isLiked);
}

const availableColors = Array.from(
  new Set (variants.map((v) => v.color))
)

const availableCapacity = Array.from(
  new Set (variants.map((v) => v.capacity))
)


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
            <img src="./img/home.png" alt="logo" className={styles["product-details-page__logo"]}/>
          </NavLink>
          <img src="./img/r-shevron.png" alt="logo" className={styles["product-details-page__arrow"]}/>
          <p className={styles["product-details-page__page"]}>{product.category}</p>
        </div>
        <div>
          <BackButton />
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
              {availableColors.map((color) => {
                const isActive = product.color === color;

                const variantForColor = variants.find(v => v.color === color);

                return (
                  <button
                    key={color}
                    type="button"
                    aria-label={`Select color ${color}`}
                    onClick={() => navigate(`/product/${variantForColor!.id}`, {replace: true})}
                    className={`
                      ${styles["product-details-page__content__colors__available__block"]}
                      ${isActive
                        ? styles["product-details-page__content__colors__available__block--active"]
                        : ''
                      }
                    `}
                    style={{ backgroundColor: color }}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles["product-details-page__content__capacity"]}>
            <p className={styles["product-details-page__content__capacity__title"]}>Select capacity</p>
            <div className={styles["product-details-page__content__capacity__block"]}>
              {availableCapacity.map((capacity) => {
                const isActive = product.capacity === capacity;

                const variantForCapacity= variants.find(v => v.capacity === capacity);

                return (
                  <button
                    className={`
                      ${styles["product-details-page__content__capacity__block__option"]}
                      ${isActive
                        ? styles["product-details-page__content__capacity__block__option--active"]
                        : ''
                      }
                    `}
                    onClick={() => navigate(`/product/${variantForCapacity?.id}`, {replace: true})}
                  >
                    <p className={styles["product-details-page__content__capacity__block__option__title"]}>{capacity}</p>
                  </button>
                )
              })}
            </div>
          </div>
          <div className={styles["product-details-page__content__cart-price"]}>
            <div className={styles["product-details-page__content__cart-price__price"]}>
            <h2 className={styles["product-details-page__content__cart-price__price--discount"]}>
             {`$${product.priceDiscount}`}
           </h2>
           <h2 className={styles["product-details-page__content__cart-price__price--regular"]}>
             {`$${product.priceRegular}`}
           </h2>
            </div>
            <div className={styles["product-details-page__content__cart-price__cart"]}>
              <button
                onClick={handleAddClick}
                className={classNames(
                  styles["product-details-page__content__cart-price__cart__buttons--add"],
                  isSelected && styles["product-details-page__content__cart-price__cart__buttons--add--selected"]
                )}
              >
              {isSelected ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
              onClick={handleLikeClick}
              className={classNames(
              styles["product-details-page__content__cart-price__cart__buttons--like"],
              isLiked && styles["product-details-page__content__cart-price__cart__buttons--like--selected"]
              )}
              >
              <img src={isLiked ? "/img/red-heart.png" : "/img/heart.png"} alt="like" className={styles["product-details-page__content__cart-price__cart__buttons__logo"]}/>
              </button>
            </div>
          </div>
          <div className={styles["product-details-page__content__specs"]}>
            <ul className={styles["product-details-page__content__specs__name"]}>
              <li>Screen</li>
              <li>Resolution</li>
              <li>Processor</li>
              <li>RAM</li>
            </ul>
            <ul className={styles["product-details-page__content__specs__value"]}>
              <li>{product.screen}</li>
              <li>{product.resolution}</li>
              <li>{product.processor}</li>
              <li>{product.ram}</li>
            </ul>
          </div>
          <div className={styles["product-details-page__content__about"]}>
            <h2 className={styles["product-details-page__content__about__title"]}>About</h2>
            {product.description?.map((section) => {
              return (
                <div className={styles["product-details-page__content__about__block"]}>
                  <h3 className={styles["product-details-page__content__about__block__title"]}>{section.title}</h3>
                  <p className={styles["product-details-page__content__about__block__text"]}>{section.text}</p>
                </div>
              )
            })}
          </div>
          <div className={styles["product-details-page__content__tech-specs"]}>
            <h2 className={styles["product-details-page__content__tech-specs__title"]}>Tech specs</h2>
            <div className={styles["product-details-page__content__tech-specs__options"]}>
              <ul className={styles["product-details-page__content__tech-specs__options__list-l"]}>
                <li>Screen</li>
                <li>Resolution</li>
                <li>Processor</li>
                <li>RAM</li>
                <li>Built in memory</li>
                <li>Camera</li>
                <li>Zoom</li>
                <li>Cell</li>
              </ul>
              <ul className={styles["product-details-page__content__tech-specs__options__list-r"]}>
                <li>{product.screen}</li>
                <li>{product.resolution}</li>
                <li>{product.processor}</li>
                <li>{product.ram}</li>
                <li>{product.capacity}</li>
                <li>{product.camera}</li>
                <li>{product.zoom}</li>
                <li>
                  {product.cell?.join(', ')}
                </li>
              </ul>
            </div>
          </div>
          <div className={styles["product-details-page__content__slider"]}>
            <ProductsSlider title="You may also like" products={sameProducts}/>
          </div>
        </div>
      </>
      )}
    </div>
  );
}
