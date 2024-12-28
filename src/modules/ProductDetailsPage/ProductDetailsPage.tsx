import './ProductDetailsPage.scss';
import { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { SpecificProduct } from '../../types/SpecificProduct';
import { ProductContentBottom } from './components/ProductContentBottom';
import { GlobalContext } from '../../store/GlobalContext';
import { ProductsSlider } from '../shared/ProductsSlider';
import { Loader } from '../shared/Loader';
import { ButtonBack } from '../shared/ButtonBack';
import { getSpecificProducts } from '../../utils/fetchRequests';
import { Product } from '../../types/Product';
import { iconsObject } from '../../constants/iconsObject';
import { Icon } from '../shared/Icon';

const getProductBySelectedProductId = (
  products: Product[],
  selectedProductId: string,
) => {
  return products.find(product => product.itemId === selectedProductId);
};

export const ProductDetailsPage: React.FC = () => {
  const { products } = useContext(GlobalContext);

  const [selectedProduct, setSelectedProduct] =
    useState<SpecificProduct | null>(null);
  const [specificProducts, setSpecificProducts] = useState<SpecificProduct[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // const [selectedPhoto, setSelectedPhoto] = useState(0);
  // const [selectedColor, setSelectedColor] = useState(selectedProduct?.color);
  // const [selectedCapacity, setSelectedCapacity] = useState(
  //   selectedProduct?.capacity,
  // );

  const { productsType, productItemId } = useParams();

  // const suggestedProducts = useMemo(() => {
  //   return products
  //     .filter(
  //       product =>
  //         product.category === productsType && product.itemId !== productItemId,
  //     )
  //     .sort(() => 0.5 - Math.random());
  // }, [productItemId, products, productsType]);

  // const handleColorChange = useCallback((color: string) => {
  //   setSelectedColor(color);
  // }, []);

  // const handleCapacityChange = useCallback((capacity: string) => {
  //   setSelectedCapacity(capacity);
  // }, []);

  const currentBaseProduct = products.find(
    product => product.itemId === productItemId,
  );

  useEffect(() => {
    if (!productsType) {
      return;
    }

    setIsLoading(true);
    setError(null);

    getSpecificProducts(productsType)
      .then(fetchedSpecificProducts => {
        setSpecificProducts(fetchedSpecificProducts);
        setSelectedProduct(
          fetchedSpecificProducts.find(pr => pr.id === productItemId) || null,
        );
      })
      .catch(er => {
        setError(`Ошибка загрузки продуктов: ${er.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productItemId]);

  // const getNewProduct = (
  //   shortName: string,
  //   capacity: string,
  //   color: string,
  // ) => {
  //   return `${shortName}-${capacity}-${color}`.toLowerCase();
  // };

  // useEffect(() => {
  //   if (selectedProduct !== null & selectedCapacity) {
  //     const newUrl = getNewProduct(
  //       selectedProduct.namespaceId,
  //       selectedCapacity,
  //       selectedColor,
  //     );
  //     navigate(`/${productsType}/${newUrl}`);
  //   }
  // }, [selectedColor, selectedCapacity, navigate, productsType]);

  // Поиск текущего продукта из списка specificProducts
  // const currentProductObject = specificProducts.find(
  //   product => product.id === productItemId,
  // );

  // useEffect(() => {
  //   if (currentProductObject) {
  //     setSelectedProduct(currentProductObject);
  //   }
  // }, [currentProductObject]);

  // if (isLoading) {
  //   return <Loader />;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (!selectedProduct) {
  //   return <div>Продукт не найден</div>;
  // }

  // const handleShoppingCard = (currentProduct: SpecificProduct) => {
  //   const productToAdd = getProductBySelectedProductId(
  //     products,
  //     currentProduct.id,
  //   );

  //   if (productToAdd) {
  //     addToCart(productToAdd);
  //   }
  // };

  // const handleFavorites = (currentProduct: SpecificProduct) => {
  //   const favoriteProduct = getProductBySelectedProductId(
  //     products,
  //     currentProduct.id,
  //   );

  //   if (favoriteProduct) {
  //     toggleFavorites(favoriteProduct);
  //   }
  // };

  // const isInCart = cart.some(item => item.id === selectedProduct.id);
  // const isFavorites = favorites.some(item => item.itemId === selectedProduct.id);

  console.log(currentBaseProduct);

  return (
    <div className="detailsPage">
      <Breadcrumbs
        productType={productsType!}
        productName={selectedProduct?.name}
      />

      <ButtonBack />

      <h2 className="detailsPage__title">{selectedProduct?.name}</h2>

      {/* <ProductContentTop selectedPhone={selectedProduct} /> */}
      {/* <div className="detailsPage__content-top">
        <div className="detailsPage__container-imageSlider">
          {selectedProduct.images.map((image, index) => (
            <div
              key={index}
              className={`detailsPage__container-photos ${selectedPhoto === index
                ? 'detailsPage__container-photos--active'
                : ''
                }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="detailsPage__photo"
                onClick={() => setSelectedPhoto(index)}
              />
            </div>
          ))}
        </div>

        <div className="detailsPage__photo-mask">
          <img
            src={selectedProduct.images[selectedPhoto]}
            alt={`Selected Photo`}
            className="detailsPage__image"
          />
        </div>

        <div className="detailsPage__characteristics">
          <div className="detailsPage__colors">
            <span
              className="
              detailsPage__colors-title detailsPage__info"
            >
              Available colors
            </span>
            <ul className="detailsPage__colors-list">
              {/* {selectedProduct.colorsAvailable.map(color => (
                <NavLink
                  key={color}
                  to={`/${productsType}/${getLink('color', color)}`}
                  // className={({ isActive }) => getLinkStyle(isActive, color)}
                >
                  <span
                    className="detailsPage__color-circle"
                    style={{ backgroundColor: colors[color] }}
                  ></span>
                </NavLink>
                <li
                  key={color}
                  className={`detailsPage__color-item ${selectedColor === color
                    ? 'detailsPage__color-item--selected'
                    : ''
                    }`}
                  onClick={() => handleColorChange(color)}
                >
                  <span
                    className="detailsPage__color-circle"
                    style={{ backgroundColor: colors[color] }}
                  ></span>
                </li>
              ))} */}
      {/* </ul> */}
      {/* // </div> */}

      {/* <div className="detailsPage__line"></div> */}

      {/* <div className="detailsPage__capacity">
            <span
              className="
                detailsPage__capacity-title detailsPage__info"
            >
              Select capacity
            </span>
            <ul className="detailsPage__capacity-list">
              {selectedProduct.capacityAvailable.map(capacity => (
                <li
                  key={capacity}
                  className={`detailsPage__capacity-item ${selectedCapacity === capacity
                    ? 'detailsPage__capacity-item--selected'
                    : ''
                    }`}
                  onClick={() => handleCapacityChange(capacity)}
                >
                  <span
                    className={`detailsPage__capacity-block ${selectedCapacity === capacity
                      ? 'detailsPage__capacity-block--selected'
                      : ''
                      }`}
                  >
                    {capacity.split('GB').join(' GB')}
                  </span>
                </li>
              ))}
            </ul>
          </div> */}

      {/* <div className="detailsPage__line"></div>

          <div className="detailsPage__container-price">
            <span className="detailsPage__price-discount">
              {`$${selectedProduct.priceDiscount}`}
            </span>
            <span className="detailsPage__price-regular">
              {`$${selectedProduct.priceRegular}`}
            </span>
          </div>

          <div className="detailsPage__container-buttons">
            <button
              className={`detailsPage__button detailsPage__button-card ${isInCart ? 'detailsPage__button-card--active' : ''}`}
              onClick={() => handleShoppingCard(selectedProduct)}
            >
              {isInCart ? `Added` : `Add to cart`}
            </button>
            <button
              className={`detailsPage__button detailsPage__button-favorites ${isFavorites ? 'detailsPage__button-favorites--active' : ''}`}
              onClick={() => handleFavorites(selectedProduct)}
            >
              {isFavorites ? (
                <Icon icon={iconsObject.favorites__filled} />
              ) : (
                <Icon icon={iconsObject.favorites} />
              )}
            </button>
          </div>

          <div className="detailsPage__container-specifications">
            <div className="detailsPage__block">
              <span className="detailsPage__info">Screen</span>
              <span className="detailsPage__value">{selectedProduct.screen}</span>
            </div>
            <div className="detailsPage__block">
              <span className="detailsPage__info">Resolution</span>
              <span className="detailsPage__value">
                {selectedProduct.resolution}
              </span>
            </div>
            <div className="detailsPage__block">
              <span className="detailsPage__info">Processor</span>
              <span className="detailsPage__value">
                {selectedProduct.processor}
              </span>
            </div>
            <div className="detailsPage__block">
              <span className="detailsPage__info">RAM</span>
              <span className="detailsPage__value">{selectedProduct.ram}</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* <ProductContentBottom selectedPhone={selectedProduct} /> */}

      {/* <div className="detailsPage__like-block">
        <ProductsSlider
          title="You may also like"
          products={suggestedProducts}
          displayType="with-discount"
        />
      </div> */}
    </div>
  );
};
