/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import './ProductDetailsPage.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ItemDetails } from '../../types/ItemDetails';
import { getProductById } from '../../helpers/getProducts';
import { ProductsContext } from '../../context/ProductsContext';
import { ProductSlider } from '../../components/ProductSlider';
import { getSuggestedProducts } from '../../helpers/getSuggestedProducts';
import { HistoryButton } from '../../components/HistoryButton';
import { HistoryLinks } from '../../components/HistoryLinks';
import { getLinkTypeByProduct } from '../../helpers/getLinkTypeByProduct';
import { Item } from '../../types/Item';
import { Loader } from '../../components/Loader';
import { getCorrectImageUrl } from '../../helpers/getCorrectImageUrl';
import { Title } from '../../components/Title';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const {
    isLoading,
    setIsLoading,
    products,
    cart,
    favourites,
    setFavourites,
    setCart,
  } = useContext(ProductsContext);
  const [productDetails, setProductDetails]
    = useState<ItemDetails | null>(null);
  const [product, setProduct] = useState<Item | null>(null);
  const [linkType, setLinkType] = useState<PageItemsType>('/');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const nav = useNavigate();

  const productsToSuggest = useMemo(() => getSuggestedProducts(products),
    [products]);

  const handleFavouriteButton = useCallback((
    item: Item,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (favourites.find((favItem) => favItem.id === item.id)) {
      setFavourites(favourites.filter((favItem) => favItem.id !== item.id));
    } else {
      setFavourites([...favourites, item]);
    }
  }, [favourites]);

  const handleAddToCartButton = useCallback((
    item: Item,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (!cart.find((favItem) => favItem.id === item.id)) {
      const productToCart = { ...item, quantity: 1 };

      setCart([...cart, productToCart]);
    }
  }, [cart]);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getProductById(id)
        .then(setProductDetails)
        .catch(() => nav('/'))
        .finally(() => setIsLoading(false));
    } else {
      nav('/');
    }
  }, [id, products]);

  useEffect(() => {
    if (id) {
      const pr = products.find((item) => item.id === id);

      setProduct(pr || null);
      if (pr) {
        setLinkType(getLinkTypeByProduct(pr));
      }
    }
  }, [id, products]);

  return (
    <div className="ProductDetailsPage">
      {isLoading || !productDetails || !product
        ? <Loader />
        : (
          <>
            <div className="ProductDetailsPage__product">
              <HistoryLinks
                links={[
                  { title: linkType, link: `/${linkType}` },
                  { title: product.name, link: null },
                ]}
              />
              <div className="ProductDetailsPage__product-header">
                <HistoryButton text="Back" />
                <Title title={product.name} />
              </div>
              <div className="ProductDetailsPage__product-content">
                <div className="ProductDetailsPage__images">
                  <div className="ProductDetailsPage__images-block">
                    {productDetails.images.map((image, index) => (
                      <div
                        key={image}
                        className={cn('ProductDetailsPage__images-block-item',
                          { active: index === currentImageIndex })}
                        onClick={() => setCurrentImageIndex(index)}
                        role="presentation"
                      >
                        <img
                          src={getCorrectImageUrl(image)}
                          alt={product.name}
                          className="ProductDetailsPage__images-block-item-img"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="ProductDetailsPage__images-main">
                    <TransitionGroup component={null}>
                      <CSSTransition
                        key={currentImageIndex}
                        timeout={300}
                        classNames="ProductDetailsPage__animation"
                        unmountOnExit
                        mountOnEnter
                      >
                        <img
                          key={currentImageIndex}
                          src={getCorrectImageUrl(
                            productDetails.images[currentImageIndex],
                          )}
                          alt={product.name}
                          className="ProductDetailsPage__images-main-img"
                        />
                      </CSSTransition>
                    </TransitionGroup>
                  </div>
                </div>
                <div className="ProductDetailsPage__topInfo">
                  <div className="ProductDetailsPage__topInfo-colors">
                    <p className="ProductDetailsPage__topInfo-title">
                      Available colors
                    </p>
                    <div className="ProductDetailsPage__topInfo-colors-list">
                      <div className="ProductDetailsPage__topInfo-colors-color">
                        <div
                          className="ProductDetailsPage__topInfo-colors-color-value"
                          style={{ backgroundColor: '#000' }}
                        />
                      </div>
                      <div className="ProductDetailsPage__topInfo-colors-color">
                        <div
                          className="ProductDetailsPage__topInfo-colors-color-value"
                          style={{ backgroundColor: '#888' }}
                        />
                      </div>
                      <div className="ProductDetailsPage__topInfo-colors-color">
                        <div
                          className="ProductDetailsPage__topInfo-colors-color-value"
                          style={{ backgroundColor: '#fff' }}
                        />
                      </div>
                    </div>
                  </div>
                  <span className="ProductDetailsPage__splitter" />
                  <div className="ProductDetailsPage__topInfo-capacity">
                    <p className="ProductDetailsPage__topInfo-title">
                      Select capacity
                    </p>
                    <div className="ProductDetailsPage__topInfo-capacity-list">
                      <button
                        className="primary-button active
                            ProductDetailsPage__topInfo-capacity-list-button"
                        type="button"
                      >
                        64 GB
                      </button>
                      <button
                        className="primary-button
                            ProductDetailsPage__topInfo-capacity-list-button"
                        type="button"
                      >
                        256 GB
                      </button>
                      <button
                        className="primary-button
                            ProductDetailsPage__topInfo-capacity-list-button"
                        type="button"
                      >
                        512 GB
                      </button>
                    </div>
                  </div>
                  <span className="ProductDetailsPage__splitter" />
                  <div className="ProductDetailsPage__topInfo-price">
                    <p className="ProductDetailsPage__topInfo-price-new">
                      {`$${(product.price
                        - ((product.price * product.discount) / 100))}`}
                    </p>
                    {!!product.discount && (
                      <p className="ProductDetailsPage__topInfo-price-old">
                        {`$${product.price}`}
                      </p>
                    )}
                  </div>
                  <div className="ProductDetailsPage__topInfo-buttons">
                    <button
                      className={cn('primary-button wide', {
                        selected: cart.find((favItem) => favItem.id === product.id),
                      })}
                      type="button"
                      onClick={(event) => handleAddToCartButton(product, event)}
                    >
                      {
                        cart.find((favItem) => favItem.id === product.id)
                          ? 'Added to cart'
                          : 'Add to cart'
                      }
                    </button>
                    <button
                      type="button"
                      className={cn('simple-button', 'favourite', {
                        selected: favourites.find((favItem) => favItem.id === product.id),
                      })}
                      onClick={(event) => handleFavouriteButton(product, event)}
                    />
                  </div>
                  <div className="ProductDetailsPage__topInfo-specs">
                    <div className="ProductDetailsPage__topInfo-specs-block">
                      <p className="ProductDetailsPage__topInfo-specs-block-title">
                        Screen
                      </p>
                      <p className="ProductDetailsPage__topInfo-specs-block-value">
                        {product.screen}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ProductDetailsPage__description">
              {productDetails?.android.os}
            </div>
            <div className="ProductDetailsPage__slider">
              <ProductSlider
                title="You may also like"
                items={productsToSuggest}
              />
            </div>
          </>
        )}
    </div>
  );
};
