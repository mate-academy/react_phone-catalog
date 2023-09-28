import './HomePage.scss';

import React, { useEffect, useState, useContext } from 'react';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ProductShort } from '../../types/ProductShort';
import { SliderDecktop } from '../../types/SliderDecktop';
import { Carusel } from '../../components/Carusel/Carusel';
import { Categories } from '../../components/Categories/Categories';
import { NamesBySections } from '../../types/NamesBySections';
import { getAllProducts } from '../../api';
import { Loader } from '../../components/Loader/Loader';
import { Footer } from '../../components/Footer/Footer';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Header } from '../../components/Header/Header';
import { LikeAndCartContext } from '../../helpers/LikeAndCartContext';

export const HomePage: React.FC = React.memo(() => {
  const { liked, addedToCart } = useContext(LikeAndCartContext);
  const [numLiked, setNumLiked] = useState<number>(liked.length);
  const [numAdded, setNumAdded] = useState<number>(addedToCart.length);

  const [products, setProducts] = useState<ProductShort[]>([]);
  const [errMess, setErrMess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getItemsWithDiscount = (items: ProductShort[]) => {
    return items
      .filter(product => product.fullPrice - product.price > 0)
      .sort((prodA, prodB) => {
        const amountDiscountA = prodA.fullPrice - prodA.price;
        const amountDiscountB = prodB.fullPrice - prodB.price;

        return amountDiscountB - amountDiscountA;
      });
  };

  useEffect(() => {
    setIsLoading(true);

    getAllProducts()
      .then(setProducts)
      .catch((mess: Error) => setErrMess(mess.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header quantityLiked={numLiked} quantityAdded={numAdded} />

      {isLoading && (<Loader />)}
      {!isLoading && !!errMess.length && <ErrorMessage text={errMess} />}
      {!isLoading && !errMess.length && (
        <main id="main" className="home-page container">
          <div className="home-page__carusel">
            <Carusel />
          </div>

          <ProductsSlider
            title={NamesBySections.WithDiscount}
            quantityCards={SliderDecktop.QuantityCards}
            widthItem={SliderDecktop.WidthCard}
            widthGap={SliderDecktop.WidthGap}
            products={getItemsWithDiscount(products)}
            numLiked={numLiked}
            onSetNumLiked={setNumLiked}
            numAdded={numAdded}
            onSetNumAdded={setNumAdded}
          />

          <Categories
            title={NamesBySections.Categories}
            products={products}
          />

          <ProductsSlider
            title={NamesBySections.NewModels}
            quantityCards={SliderDecktop.QuantityCards}
            widthItem={SliderDecktop.WidthCard}
            widthGap={SliderDecktop.WidthGap}
            products={getItemsWithDiscount(products).reverse()}
            numLiked={numLiked}
            onSetNumLiked={setNumLiked}
            numAdded={numAdded}
            onSetNumAdded={setNumAdded}
          />
        </main>
      )}

      {!isLoading && <Footer />}
    </>
  );
});
