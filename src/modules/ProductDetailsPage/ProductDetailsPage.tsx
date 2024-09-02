import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackBtn } from '../../components/BackBtn';
import { AppContext } from '../../AppContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Details } from './components/details';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ProductType } from '../../types/ProductType';
import { getProducts } from '../../api';
import { ErrorMessage } from '../../components/ErrorMessage';

export const ProductDetailsPage = () => {
  const { products, phones } = useContext(AppContext);
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(
    products.find(p => productId && p.itemId === productId),
  );
  const [extendedProduct, setExtendedProduct] = useState(
    phones.find(phone => phone.id === selectedProduct?.itemId),
  );
  const [suggestedProducts, setSuggestedProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setSelectedProduct(products.find(p => productId && p.itemId === productId));

    switch (selectedProduct?.category) {
      case 'phones':
        return setExtendedProduct(
          phones.find(phone => phone.id === selectedProduct.itemId),
        );

      default:
        return;
    }
  }, [selectedProduct, navigate, phones, products, productId]);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(readyProducts => {
        const filteredProducts = readyProducts
          .filter(
            product =>
              product.itemId.split('-').slice(0, -2).join('-') !==
                selectedProduct?.itemId.split('-').slice(0, -2).join('-') &&
              product.category === selectedProduct?.category &&
              product.fullPrice - selectedProduct?.fullPrice <= 500 &&
              selectedProduct?.fullPrice - product.fullPrice <= 500 &&
              product.year - selectedProduct?.year <= 3 &&
              selectedProduct?.year - product.year <= 3,
          )
          .sort((product1, product2) => product2.year - product1.year);

        const uniqueProducts: ProductType[] = [];
        const seenBaseIds: string[] = [];

        filteredProducts.forEach(product => {
          if (
            !seenBaseIds.includes(
              product.itemId.split('-').slice(0, -2).join('-'),
            )
          ) {
            seenBaseIds.push(product.itemId.split('-').slice(0, -2).join('-'));
            uniqueProducts.push(product);
          }
        });

        return uniqueProducts;
      })
      .then(setSuggestedProducts)
      .catch(() => {
        setErrorMessage('Something went wrong!');

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setIsLoading(false));
  }, [
    selectedProduct?.category,
    selectedProduct?.color,
    selectedProduct?.fullPrice,
    selectedProduct?.itemId,
    selectedProduct?.price,
    selectedProduct?.year,
  ]);

  return (
    <div className="product-details page">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <div className="container">
            <Breadcrumbs className="product-details__breadcrumbs" />
            <BackBtn className="product-details__back-btn" />

            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

            {!selectedProduct && !errorMessage && (
              <span className="notification">Product was not found</span>
            )}
          </div>

          {selectedProduct && <Details product={extendedProduct} />}
          {selectedProduct && (
            <ProductsSlider
              title="You may also like"
              products={suggestedProducts}
              isLoading={isLoading}
              errorMessage={errorMessage}
            />
          )}
        </>
      )}
    </div>
  );
};
