import { FC, useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { PhoneCatalogContext } from '../../context/PhoneCatalogContext';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
// import { HeaderMobile } from '../HeaderMobile/HeaderMobile';

type Props = {
  onMobileClicked: (isMenuClicked: boolean) => void;
};

export const Layout: FC<Props> = ({ children, onMobileClicked }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // setIsLoading(true);
    getProducts()
      .then(res => {
        setProducts(res);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <PhoneCatalogContext.Provider value={{
      width,
      products,
      isLoading,
      isMobile,
    }}
    >
      <p>
        Width:
        {' '}
        {width}
      </p>
      <Header
        isMobile={isMobile}
        windowWidth={width}
        onMobileClicked={onMobileClicked}
      />
      <main>
        {children}
      </main>
      <Footer />
    </PhoneCatalogContext.Provider>
  );
};
