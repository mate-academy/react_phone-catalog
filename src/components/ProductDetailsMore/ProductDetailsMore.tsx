import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../store/GlobalProvider';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import { Product } from '../../types/Product';

export const ProductDetailsMore = () => {
  const { selectedProduct, products } = useContext(StateContext);
  const [alsoLike, setAlsoLike] = useState<Product[]>([]);

  const { screen, resolution, processor, ram, capacity, camera, zoom, cell } =
    selectedProduct || {};

  useEffect(() => {
    if (selectedProduct) {
      const filteredProducts = products.filter(
        product => product.category === String(selectedProduct.category),
      );

      const randomProducts: Product[] = [];
      const indices = new Set<number>();

      if (filteredProducts.length <= 10) {
        setAlsoLike(filteredProducts);
      }

      while (randomProducts.length < 10) {
        const randomIndex = Math.floor(Math.random() * filteredProducts.length);

        if (!indices.has(randomIndex)) {
          indices.add(randomIndex);
          randomProducts.push(filteredProducts[randomIndex]);
        }
      }

      setAlsoLike(randomProducts);
    }
  }, [selectedProduct, products]);

  return (
    <>
      <section className="productDetailsMore">
        <article className="productDetailsMore__about">
          <h3 className="productDetailsMore__title">About</h3>
          {selectedProduct?.description.map((item, index) => (
            <article key={index} className="productDetailsMore__box">
              <h4 className="productDetailsMore__subtitle">{item.title}</h4>
              {item.text.map((paragraph, i) => (
                <p key={i} className="productDetailsMore__text">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </article>

        <article className="productDetailsMore__specs">
          <h3 className="productDetailsMore__title">Tech specs</h3>

          <ul className="productDetailsMore__details">
            <li className="productCard__key">
              Screen
              <span className="productCard__value">{screen}</span>
            </li>

            <li className="productCard__key">
              Resolution
              <span className="productCard__value">{resolution}</span>
            </li>

            <li className="productCard__key">
              Processor
              <span className="productCard__value">{processor}</span>
            </li>

            <li className="productCard__key">
              RAM
              <span className="productCard__value">{ram}</span>
            </li>

            <li className="productCard__key">
              Built in memory
              <span className="productCard__value">{capacity}</span>
            </li>

            <li className="productCard__key">
              Camera
              <span className="productCard__value">{camera}</span>
            </li>

            <li className="productCard__key">
              Zoom
              <span className="productCard__value">{zoom}</span>
            </li>

            <li className="productCard__key">
              Cell
              <span className="productCard__value">{cell?.join(', ')}</span>
            </li>
          </ul>
        </article>
      </section>

      <ProductSlider
        title={`You may also like`}
        product={alsoLike}
        navigationIds={{ prevId: 'alsoLiketPrev', nextId: 'alsoLikeNext' }}
        showDiscount={false}
      />
    </>
  );
};
