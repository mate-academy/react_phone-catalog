import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";
import styles from "./ProductDetails.module.scss";
import { ProductSlider } from "../../components/Product";
import { ProductActionButtons } from "../../components/ProductActionButtons";
import { LoadingCard } from "../../components/LoadingCard";
import { BackButton } from "../../components/BackButton";
import { StateContext } from "../../providers/GlobalStateProvider";
import { Category, ProductDetailsType } from "../../types/types";
import {
  getAccessories,
  getAssetPath,
  getPhones,
  getTablets,
} from "../../utils";

const productDetailsText = {
  about: "About",
  techSpecs: "Tech specs",
  screen: "Screen",
  resolution: "Resolution",
  processor: "Processor",
  ram: "RAM",
  builtInMemory: "Built in memory",
  camera: "Camera",
  zoom: "Zoom",
  cell: "Cell",
  id: "ID",
};

const categoryLoaders: Record<Category, () => Promise<ProductDetailsType[]>> = {
  [Category.Tablets]: getTablets,
  [Category.Phones]: getPhones,
  [Category.Accessories]: getAccessories,
};

const colorsMap: Record<string, string> = {
  black: "#111111",
  white: "#f5f5f5",
  yellow: "#ffe681",
  green: "#b9e8cf",
  purple: "#d6b4ff",
  red: "#ff5f5f",
  gold: "#f4d9b9",
  silver: "#d2d6dc",
  coral: "#ff7f6e",
  blue: "#7aa5ff",
  pink: "#ffb6d6",
  midnight: "#2b3445",
  midnightgreen: "#4e5851",
  spacegray: "#717378",
  spaceblack: "#2d2d2d",
  graphite: "#5f666d",
  rosegold: "#f7dfd9",
  sierrablue: "#b8d0e6",
  starlight: "#fff7e1",
  "space gray": "#717378",
  "rose gold": "#f7dfd9",
  "sky blue": "#c3def5",
};

const normalize = (value: string) => value.toLowerCase().replace(/\s|-/g, "");

const getColorCode = (color: string) =>
  colorsMap[color] || colorsMap[normalize(color)] || color;

const specificationKeys = ["screen", "resolution", "processor", "ram"] as const;

export const ProductDetails: React.FC = () => {
  const { allProducts, isLoading } = useContext(StateContext);
  const { productId } = useParams();

  const [product, setProduct] = useState<ProductDetailsType | null>(null);
  const [detailsList, setDetailsList] = useState<ProductDetailsType[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  const numberId = Number(productId);

  const currentProduct = useMemo(
    () => allProducts.find(item => item.id === numberId),
    [allProducts, numberId],
  );

  useEffect(() => {
    if (!currentProduct) {
      setProduct(null);
      setDetailsList([]);

      return;
    }

    const loader = categoryLoaders[currentProduct.category as Category];

    if (!loader) {
      setProduct(null);
      setDetailsList([]);

      return;
    }

    setIsDetailsLoading(true);

    loader()
      .then(data => {
        setDetailsList(data);
        setProduct(
          data.find(item => item.id === currentProduct.itemId) || null,
        );
      })
      .catch(() => {
        setDetailsList([]);
        setProduct(null);
      })
      .finally(() => {
        setIsDetailsLoading(false);
      });
  }, [currentProduct]);

  useEffect(() => {
    setSelectedImage(0);
  }, [product?.id]);

  if (isNaN(numberId)) {
    return (
      <p className={classNames(styles.message, "text-body")}>
        Product was not found
      </p>
    );
  }

  if (isLoading || allProducts.length === 0 || isDetailsLoading) {
    return <LoadingCard variant="details" />;
  }

  if (!currentProduct || !product) {
    return (
      <p className={classNames(styles.message, "text-body")}>
        Product was not found
      </p>
    );
  }

  const { name, images, capacityAvailable, capacity, colorsAvailable, color } =
    product;

  const productByItemId = (itemId: string) =>
    allProducts.find(item => item.itemId === itemId);

  const variantByOptions = (nextColor: string, nextCapacity: string) =>
    detailsList.find(
      item =>
        item.namespaceId === product.namespaceId &&
        item.capacity === nextCapacity &&
        normalize(item.color) === normalize(nextColor),
    );

  const availableProducts = allProducts.filter(
    item =>
      item.category === currentProduct.category &&
      item.id !== currentProduct.id,
  );

  return (
    <main className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/" className={styles.breadcrumbHome}>
          <img src={getAssetPath("img/general/icons/home.svg")} alt="Home" />
        </Link>
        <img src={getAssetPath("img/general/icons/arrow.svg")} alt="Arrow" />
        <Link
          to={`/${currentProduct.category}`}
          className={classNames(styles.breadcrumbLink, "text-small")}
        >
          {currentProduct.category[0].toUpperCase() +
            currentProduct.category.slice(1)}
        </Link>
        <img src={getAssetPath("img/general/icons/arrow.svg")} alt="Arrow" />
        <span className={classNames(styles.breadcrumbCurrent, "text-small")}>
          {name}
        </span>
      </nav>

      <BackButton />

      <h1 className={classNames(styles.title, "text-h2")}>{name}</h1>

      <section className={styles.hero}>
        <div className={styles.leftHalf}>
          <ul className={styles.thumbs}>
            {images.map((image, index) => (
              <li key={image}>
                <button
                  type="button"
                  className={classNames(styles.thumb, {
                    [styles.thumbActive]: selectedImage === index,
                  })}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={getAssetPath(image)}
                    alt={`${name} view ${index + 1}`}
                    className={styles.thumbImage}
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.mainImageWrap}>
            <img
              src={getAssetPath(images[selectedImage])}
              alt={name}
              className={styles.mainImage}
            />
          </div>
        </div>

        <div className={styles.rightHalf}>
          <div className={styles.purchase}>
            <div className={styles.colorsBlock}>
              <div className={styles.colorsHeader}>
                <p className="text-small">Available colors</p>
                <p
                  className={classNames(
                    styles.productId,
                    styles.productIdTablet,
                    "text-small",
                  )}
                >
                  ID: {currentProduct.id}
                </p>
              </div>

              <ul className={styles.colorsList}>
                {colorsAvailable.map(itemColor => {
                  const variant = variantByOptions(itemColor, capacity);
                  const mappedProduct = variant
                    ? productByItemId(variant.id)
                    : null;
                  const isCurrent = normalize(itemColor) === normalize(color);

                  return (
                    <li
                      key={itemColor}
                      className={classNames(styles.colorItem, {
                        [styles.colorItemActive]: isCurrent,
                      })}
                    >
                      {variant && mappedProduct ? (
                        <Link
                          to={`/product/${mappedProduct.id}`}
                          className={styles.colorButton}
                          style={{ backgroundColor: getColorCode(itemColor) }}
                          aria-label={itemColor}
                        />
                      ) : (
                        <span
                          className={classNames(
                            styles.colorButton,
                            styles.colorDisabled,
                          )}
                          style={{ backgroundColor: getColorCode(itemColor) }}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={styles.capacityBlock}>
              <p className="text-small">Select capacity</p>
              <ul className={styles.capacityList}>
                {capacityAvailable.map(itemCapacity => {
                  const variant = variantByOptions(color, itemCapacity);
                  const mappedProduct = variant
                    ? productByItemId(variant.id)
                    : null;
                  const isCurrent = itemCapacity === capacity;

                  return (
                    <li key={itemCapacity}>
                      {variant && mappedProduct ? (
                        <Link
                          to={`/product/${mappedProduct.id}`}
                          className={classNames(
                            styles.capacityButton,
                            "text-body",
                            {
                              [styles.capacityActive]: isCurrent,
                            },
                          )}
                        >
                          {itemCapacity}
                        </Link>
                      ) : (
                        <span
                          className={classNames(
                            styles.capacityButton,
                            styles.capacityDisabled,
                            "text-body",
                          )}
                        >
                          {itemCapacity}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={styles.priceWrap}>
              <p className="text-h2">${product.priceDiscount}</p>
              <p className={classNames(styles.regularPrice, "text-body")}>
                ${product.priceRegular}
              </p>
            </div>

            <div className={styles.actions}>
              <div className={styles.buttonRow}>
                <ProductActionButtons id={currentProduct.id} />
              </div>

              <ul className={styles.shortSpecs}>
                {specificationKeys.map(key => (
                  <li key={key} className={styles.shortSpecsRow}>
                    <span className="text-small">
                      {productDetailsText[key]}
                    </span>
                    <span className="text-uppercase">{product[key]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.idColumn}>
            <p className={classNames(styles.productId, "text-small")}>
              ID: {currentProduct.id}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.info}>
        <article className={styles.about}>
          <h2 className={classNames(styles.sectionTitle, "text-h3")}>
            {productDetailsText.about}
          </h2>

          {product.description.map(({ title, text }) => (
            <div key={title} className={styles.aboutPart}>
              <h3 className="text-h4">{title}</h3>
              {text.map(paragraph => (
                <p
                  key={paragraph}
                  className={classNames(styles.aboutText, "text-body")}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </article>

        <article className={styles.specs}>
          <h2 className={classNames(styles.sectionTitle, "text-h3")}>
            {productDetailsText.techSpecs}
          </h2>
          <ul className={styles.specsList}>
            <li className={styles.specsRow}>
              <span className="text-small">{productDetailsText.screen}</span>
              <span className="text-uppercase">{product.screen}</span>
            </li>
            <li className={styles.specsRow}>
              <span className="text-small">
                {productDetailsText.resolution}
              </span>
              <span className="text-uppercase">{product.resolution}</span>
            </li>
            <li className={styles.specsRow}>
              <span className="text-small">{productDetailsText.processor}</span>
              <span className="text-uppercase">{product.processor}</span>
            </li>
            <li className={styles.specsRow}>
              <span className="text-small">{productDetailsText.ram}</span>
              <span className="text-uppercase">{product.ram}</span>
            </li>
            <li className={styles.specsRow}>
              <span className="text-small">
                {productDetailsText.builtInMemory}
              </span>
              <span className="text-uppercase">{product.capacity}</span>
            </li>
            {product.camera && (
              <li className={styles.specsRow}>
                <span className="text-small">{productDetailsText.camera}</span>
                <span className="text-uppercase">{product.camera}</span>
              </li>
            )}
            {product.zoom && (
              <li className={styles.specsRow}>
                <span className="text-small">{productDetailsText.zoom}</span>
                <span className="text-uppercase">{product.zoom}</span>
              </li>
            )}
            <li className={styles.specsRow}>
              <span className="text-small">{productDetailsText.cell}</span>
              <span className="text-uppercase">{product.cell.join(", ")}</span>
            </li>
          </ul>
        </article>
      </section>

      <section className={styles.suggestions}>
        <ProductSlider title="You may also like" products={availableProducts} />
      </section>
    </main>
  );
};
