import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import phonesDetailsData from '../../../public/api/phones.json';
import tabletsDetailsData from '../../../public/api/tablets.json';
import accessoriesDetailsData from '../../../public/api/accessories.json';
import productsData from '../../../public/api/products.json';

import { Phone } from '../../types/Phone';
import { Accessories } from '../../types/Accessories';
import { DispatchContext, StateContext } from '../../context/ItemProvider';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../Shared/Slider/ProductsSlider';
import { getSuggestedProducts } from '../Api';
import { getProductDetails } from '../../utils/productUtils';

type ProductDetail = Phone | Accessories;

export const ItemCardPage = () => {
  const { productId } = useParams<{ productId: string }>();

  const dispatch = useContext(DispatchContext);
  const { cart, fav } = useContext(StateContext);

  const allProducts: ProductDetail[] = [
    ...phonesDetailsData,
    ...tabletsDetailsData,
    ...accessoriesDetailsData,
  ];

  const product = allProducts.find(item => item.id === productId);

  const baseProduct: Product | undefined = productsData.find(
    p => p.itemId === product?.id,
  );

  const categoryKey = phonesDetailsData.some(p => p.id === productId)
    ? 'phones'
    : tabletsDetailsData.some(t => t.id === productId)
      ? 'tablets'
      : 'accessories';

  const categoryTitle =
    categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);

  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    if (categoryKey && product?.id) {
      getSuggestedProducts(categoryKey, product.id).then(setSuggestedProducts);
    }
  }, [categoryKey, product?.id]);

  if (!product || !baseProduct) {
    return <div className="not-found">Product not found</div>;
  }

  const { price, fullPrice, hasDiscount } = getProductDetails(baseProduct);

  const getVariantUrl = (targetCapacity: string, targetColor: string) => {
    const formattedCapacity = targetCapacity.toLowerCase().trim();
    const formattedColor = targetColor
      .toLowerCase()
      .replace(/\s+/g, '-')
      .trim();

    if (product.namespaceId) {
      return `/product/${product.namespaceId}-${formattedCapacity}-${formattedColor}`;
    }

    return `/product/${product.id}`;
  };

  const numericId = baseProduct.id || product.id;

  const isAdded = cart.some(
    item =>
      item.product.itemId === product.id ||
      String(item.product.id) === String(baseProduct.id),
  );

  const isFav = fav.some(
    item =>
      item.itemId === product.id || String(item.id) === String(baseProduct.id),
  );

  window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <main className="main">
      <div className="container">
        <div className="main__content">
          <section className="item-card">
            <div className="item-card__top">
              <Link to="/">
                <img src="./img/icons/Home.svg" alt="" />
              </Link>
              <img src="./img/icons/VectorRight.svg" alt="" />
              <Link to={`/${categoryKey}`} className="item-card__history-visit">
                {categoryTitle}
              </Link>
              <img src="./img/icons/VectorRight.svg" alt="" />
              <span className="item-card__visit">{product.name}</span>
            </div>
            <Link to={`/${categoryKey}`} className="item-card__back">
              <img src="./img/buttons/ButtonVectorLeft.svg" alt="VectorBack" />
              <span className="item-card__back-text">Back</span>
            </Link>
            <h2>{product.name}</h2>
            <div className="item-card__main">
              <div className="item item-card__content">
                <div className="item__left">
                  {product.images?.map(img => (
                    <button
                      key={img}
                      className={`item__thumb ${selectedImage === img ? 'is-active' : ''}`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        className="item__photos"
                        src={img}
                        alt={product.name}
                      />
                    </button>
                  ))}
                </div>

                <div className="item__center">
                  <img
                    src={selectedImage || product.images?.[0]}
                    alt={product.name}
                  />
                </div>
                <div className="info item__right">
                  <div className="info__title">
                    <span>Available colors</span>
                    <span>ID: {numericId}</span>
                  </div>

                  <div className="colors info__colors">
                    {product.colorsAvailable?.map(colorName => {
                      const colorClass = colorName
                        .toLowerCase()
                        .replace(/[\s-]/g, '');

                      const isSelected =
                        colorName.toLowerCase().replace(/[\s-]/g, '') ===
                        product.color?.toLowerCase().replace(/[\s-]/g, '');

                      return (
                        <Link
                          key={colorName}
                          to={getVariantUrl(product.capacity, colorName)}
                          title={colorName}
                          className={`colors__selector colors__selector--${colorClass} ${
                            isSelected ? 'color-active' : ''
                          }`}
                        />
                      );
                    })}
                  </div>

                  <div className="info__capacity">
                    <div className="info__title">
                      <span>Select capacity</span>
                    </div>
                    <div className="button">
                      {product.capacityAvailable?.map(cap => {
                        const isSelected =
                          cap.toLowerCase().trim() ===
                          product.capacity?.toLowerCase().trim();

                        return (
                          <Link
                            key={cap}
                            to={getVariantUrl(cap, product.color)}
                            className={`button__capacity ${isSelected ? 'button-active' : ''}`}
                          >
                            {cap}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <h2 className="info__price">
                    ${price}
                    {hasDiscount && (
                      <span className="info__price--full">${fullPrice}</span>
                    )}
                  </h2>
                  <div className="product__buttons">
                    <button
                      type="button"
                      className={`product__add ${isAdded ? 'product__add--added' : ''}`}
                      disabled={isAdded}
                      onClick={() => {
                        if (!isAdded) {
                          dispatch({ type: 'ADD_ITEM', product: baseProduct });
                        }
                      }}
                    >
                      {isAdded ? 'Added to cart' : 'Add to cart'}
                    </button>
                    <button
                      className={`product__fav ${isFav ? 'product__fav--added' : ''}`}
                      onClick={() => {
                        dispatch({ type: 'TOGGLE_FAV', product: baseProduct });
                      }}
                    ></button>
                  </div>
                  <div className="product__specs">
                    <div className="product__spec-row">
                      <span className="product__spec-label">Screen</span>
                      <span className="product__spec-value">
                        {product.screen}
                      </span>
                    </div>
                    <div className="product__spec-row">
                      <span className="product__spec-label">Resolution</span>
                      <span className="product__spec-value">
                        {product.resolution}
                      </span>
                    </div>
                    <div className="product__spec-row">
                      <span className="product__spec-label">Processor</span>
                      <span className="product__spec-value">
                        {product.processor}
                      </span>
                    </div>
                    <div className="product__spec-row">
                      <span className="product__spec-label">RAM</span>
                      <span className="product__spec-value">{product.ram}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about item-card__about">
                <div className="about__content">
                  <div className="about__left">
                    <div className="about__title">
                      <h3>About</h3>
                    </div>
                    {product.description?.map((block, index) => (
                      <div key={index} className="about__text">
                        <h4>{block.title}</h4>
                        {block.text.map((paragraph, pIdx) => (
                          <span key={pIdx}>{paragraph}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="about__right">
                    <div className="about__title">
                      <h3>Tech specs</h3>
                    </div>
                    <div className="product__specs">
                      <div className="product__spec-row">
                        <span className="product__spec-label">Screen</span>
                        <span className="product__spec-value">
                          {product.screen}
                        </span>
                      </div>
                      <div className="product__spec-row">
                        <span className="product__spec-label">Resolution</span>
                        <span className="product__spec-value">
                          {product.resolution}
                        </span>
                      </div>
                      <div className="product__spec-row">
                        <span className="product__spec-label">Processor</span>
                        <span className="product__spec-value">
                          {product.processor}
                        </span>
                      </div>
                      <div className="product__spec-row">
                        <span className="product__spec-label">RAM</span>
                        <span className="product__spec-value">
                          {product.ram}
                        </span>
                      </div>
                      <div className="product__spec-row">
                        <span className="product__spec-label">
                          Built in memory
                        </span>
                        <span className="product__spec-value">
                          {product.capacity}
                        </span>
                      </div>
                      {'camera' in product && product.camera && (
                        <div className="product__spec-row">
                          <span className="product__spec-label">Camera</span>
                          <span className="product__spec-value">
                            {product.camera}
                          </span>
                        </div>
                      )}
                      {'zoom' in product && product.zoom && (
                        <div className="product__spec-row">
                          <span className="product__spec-label">Zoom</span>
                          <span className="product__spec-value">
                            {product.zoom}
                          </span>
                        </div>
                      )}
                      {'cell' in product && product.cell && (
                        <div className="product__spec-row">
                          <span className="product__spec-label">Cell</span>
                          <span className="product__spec-value">
                            {Array.isArray(product.cell)
                              ? product.cell.join(', ')
                              : product.cell}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {suggestedProducts.length > 0 && (
                <ProductsSlider
                  newProducts={suggestedProducts}
                  title="You may also like"
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
