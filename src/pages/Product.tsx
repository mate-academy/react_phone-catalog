import Footer from '../components/Footer';
import './Product.scss';
import { useParams } from 'react-router-dom';
import NavPage from '../components/NavPage';
import ProductData from '../components/ProductData';
import ProductParagraphs from '../components/ProductParagraphs';
import ProductItems from '../components/ProductItems';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { Product, Phone } from '../interface/Product';

const ProductItem = () => {
  const { product } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);
  const [productExists, setProductExists] = useState<Product | undefined>(
    undefined,
  );
  const [realProduct, setRealProduct] = useState<Phone | undefined>(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  useEffect(() => {
    fetch('http://localhost:5173/api/products.json')
      .then(response => response.json())
      .then(result => {
        setData(result);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (product) {
      const foundProduct = data.find(item => item.name === product);

      setProductExists(foundProduct);
    }
  }, [data, product]);

  useEffect(() => {
    if (!productExists) {
      return;
    }

    setRealProduct(undefined);

    fetch(
      `${import.meta.env.VITE_PUBLIC_URL}api/${productExists.category}.json`,
    )
      .then(response => response.json())
      .then((result: Phone[]) => {
        const foundProduct = result.find(
          item => item.name === productExists.name,
        );

        setRealProduct(foundProduct);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, [productExists]);

  return (
    <>
      <div className="container column">
        <NavPage page="Phones" products={product} />
        {loading ? (
          <Loading />
        ) : (
          <div className="product">
            <h1 className="product__title">{product}</h1>
            <main className="product__main">
              {productExists && realProduct && (
                <>
                  <ProductData
                    product={productExists}
                    realProduct={realProduct}
                  />
                  <ProductParagraphs realProduct={realProduct} />
                  <ProductItems />
                </>
              )}
            </main>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductItem;
