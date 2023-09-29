import './HomePage.scss';

import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ProductShort } from '../../types/ProductShort';
import { Carusel } from '../../components/Carusel/Carusel';
import { Categories } from '../../components/Categories/Categories';
import { NamesBySections } from '../../types/NamesBySections';
import { getAllProducts } from '../../api';
import { Loader } from '../../components/Loader/Loader';
import { Footer } from '../../components/Footer/Footer';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Header } from '../../components/Header/Header';
import { LikeAndCartContext } from '../../helpers/LikeAndCartContext';
import { MenuWithNav } from '../../components/MenuWithNav/MenuWithNav';

export const HomePage: React.FC = React.memo(() => {
  const { liked, addedToCart } = useContext(LikeAndCartContext);
  const [numLiked, setNumLiked] = useState<number>(liked.length);
  const [numAdded, setNumAdded] = useState<number>(addedToCart.length);

  const [products, setProducts] = useState<ProductShort[]>([]);
  const [errMess, setErrMess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMenu, setIsMenu] = useState<boolean>(false);

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

  useEffect(() => {
    if (isMenu) {
      document.body.classList.add('body__with-menu');
    } else {
      document.body.classList.remove('body__with-menu');
    }
  }, [isMenu]);

  return (
    <>
      <Header
        quantityLiked={numLiked}
        quantityAdded={numAdded}
        onSetIsMenu={setIsMenu}
      />

      <div className={classNames('home-page__menu', { visible: isMenu })}>
        <MenuWithNav
          quantityLiked={numLiked}
          quantityAdded={numAdded}
          onSetIsMenu={setIsMenu}
        />
      </div>

      {isLoading && (<Loader />)}
      {!isLoading && !!errMess.length && <ErrorMessage text={errMess} />}
      {!isLoading && !errMess.length && (
        <div className="container">
          <main className="container__content home-page">
            <div className="home-page__carusel">
              <Carusel />
            </div>

            <ProductsSlider
              title={NamesBySections.WithDiscount}
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
              products={getItemsWithDiscount(products).reverse()}
              numLiked={numLiked}
              onSetNumLiked={setNumLiked}
              numAdded={numAdded}
              onSetNumAdded={setNumAdded}
            />
          </main>
        </div>
      )}

      {!isLoading && <Footer />}
    </>
  );
});
