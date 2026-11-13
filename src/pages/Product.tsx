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
import AddEffect from '../components/AddEffect';

const ProductItem = () => {
  const { product } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);
  const [productExists, setProductExists] = useState<Product | undefined>(
    undefined,
  );
  const [realProduct, setRealProduct] = useState<Phone | undefined>(undefined);
  const [effect, setEffect] = useState(false);
  const [, setNameProduct] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  useEffect(() => {
    fetch(
      `https://johnnyvasconcelos.github.io/react_phone-catalog/api/products.json`,
    )
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

  function changeEffect(nam: string) {
    setEffect(true);
    setNameProduct(nam);
    setTimeout(() => {
      setEffect(false);
    }, 3000);
  }

  const [currentCapacity, setCurrentCapacity] = useState<string | undefined>(
    realProduct?.capacityAvailable?.[0],
  );

  const colors = [
    'Black',
    'Silver',
    'Red',
    'White',
    'Yellow',
    'Blue',
    'Purple',
    'Green',
    'Rose Gold',
    'Gold',
    'Starlight',
    'Pink',
    'Sky Blue',
    'Spacegray',
    'Space Gray',
    'Gray',
  ];
  const capacities = ['256GB', '64GB', '32GB', '128GB', '1TB', '2TB', '512GB'];

  /* 
  const colorCurr = colors.find(col => {
    return realProduct.name.includes(col);
  });
  */

  const [currentColor, setCurrentColor] = useState<string | undefined>(
    // colorCurr,
    realProduct?.colorsAvailable?.[0],
  );

  useEffect(() => {
    const colorCurr = colors.find(col => realProduct?.name.includes(col));
    const capacityCurr = capacities.find(cap =>
      realProduct?.name.includes(cap),
    );

    setCurrentColor(colorCurr);
    setCurrentCapacity(capacityCurr);
  }, [realProduct?.name]);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  function productName() {
    const colorCurr = colors.find(col => realProduct?.name.includes(col));
    const capacityCurr = capacities.find(cap =>
      realProduct?.name.includes(cap),
    );

    if (
      !product ||
      !colorCurr ||
      !currentColor ||
      !currentCapacity ||
      !capacityCurr
    ) {
      return product;
    }

    return product
      .replace(capacityCurr, currentCapacity)
      .replace(colorCurr, capitalize(currentColor));
  }

  return (
    <>
      <div className="container column">
        <NavPage page="Phones" products={product} />
        {loading ? (
          <Loading />
        ) : (
          <div className="product">
            <h1 className="product__title">{productName()}</h1>
            <main className="product__main">
              {productExists && realProduct && (
                <>
                  <ProductData
                    product={productExists}
                    realProduct={realProduct}
                    changeEffect={changeEffect}
                    currentColor={currentColor}
                    setCurrentColor={setCurrentColor}
                    currentCapacity={currentCapacity}
                    setCurrentCapacity={setCurrentCapacity}
                    productName={productName}
                  />
                  <ProductParagraphs realProduct={realProduct} />
                  <ProductItems />
                </>
              )}
            </main>
          </div>
        )}
      </div>
      <AddEffect effect={effect} name={productName()} />
      <Footer />
    </>
  );
};

export default ProductItem;
