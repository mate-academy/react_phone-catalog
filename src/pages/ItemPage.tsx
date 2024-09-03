import { useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { CardDetail } from '../components/CardDetail';
import { Icon } from '../components/ui/Icon';
import '../styles/main.scss';
import cardStyles from '../components/Card/Card.module.scss';
import classNames from 'classnames';
import { ProductSlider } from '../components/ProductSlider';
import { GoBackLink } from '../components/ui/GoBackLink';
import { RoundColorButton } from '../components/ui/RoundColorButton';
import { Product } from '../types/Product';
import { useNavigate, useParams } from 'react-router-dom';
import { getItemByCategory } from '../services/productDetails';
import { ProductDetails } from '../types/ProductDetails';
import { useFavorites } from '../hooks/useFavorites';
import { useProducts } from '../hooks/useProducts';
import { NotFoundProductPage } from './NotFoundProductPage';
import { Loader } from '../components/Loader';
import { wait } from '../utils/wait';
import { getSuggestedProducts } from '../services/radomProducts';
import { colors } from '../constants/COLORS';
import { useCart } from '../hooks/useCart';
import { CartActionType } from '../types/CartActionType';
import { CardButton } from '../components/ui/CardButton';
import { isItemInArray } from '../utils/isItemInArray';

export const ItemPage = () => {
  const { products } = useProducts();
  const { cart, updateCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const navigate = useNavigate();
  const { itemId } = useParams();
  const paramFromLink = itemId?.slice(1);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const initSelectedProduct = products.find(
      product => product.itemId === paramFromLink,
    );

    setSelectedProduct(initSelectedProduct || null);
    setIsLoading(false);
  }, [products, paramFromLink]);

  const productId = selectedProduct ? selectedProduct.id : 0;
  const isFavorite = isItemInArray(favorites, productId);
  const isInCart = isItemInArray(cart, productId);

  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getSuggestedProducts()
      .then(data => setSuggestedProducts(data))
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error fetching suggested products:', error);
      });
  }, []);

  const [selectedItem, setSelectedItem] = useState<ProductDetails | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedCapacityIndex, setSelectedCapacityIndex] = useState(0);

  useEffect(() => {
    if (!selectedProduct) {
      return;
    }

    const { category } = selectedProduct;

    const fetchProductDetails = () => {
      setIsLoading(true);

      wait(200)
        .then(() =>
          getItemByCategory(category).then(data => {
            const item = data.find(d => d.id === selectedProduct.itemId);

            setSelectedItem(item || null);

            if (item) {
              const colorIndex = item.colorsAvailable.findIndex(
                color => color === item.color,
              );
              const capacityIndex = item.capacityAvailable.findIndex(
                capacity => capacity === item.capacity,
              );

              setSelectedColorIndex(colorIndex !== -1 ? colorIndex : 0);
              setSelectedCapacityIndex(
                capacityIndex !== -1 ? capacityIndex : 0,
              );
            }
          }),
        )
        .catch(error => {
          throw new Error('Error fetching productDetails:', error);
        })
        .finally(() => setIsLoading(false));
    };

    fetchProductDetails();
  }, [selectedProduct]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const spaceLessColors =
    selectedItem?.colorsAvailable.map(color => color.replace(/\s/g, '')) || [];

  const handleAddToCart = () => {
    if (selectedProduct) {
      updateCart(selectedProduct, CartActionType.ADD);
    }
  };

  const navigateToNewSelectedItem = () => {
    if (!selectedItem) {
      return;
    }

    const newParam = [
      selectedItem?.namespaceId,
      selectedItem?.capacityAvailable[selectedCapacityIndex],
      selectedItem?.colorsAvailable[selectedColorIndex],
    ]
      .filter(Boolean)
      .map(item => item.toLowerCase().replace(/\s/g, '-'))
      .join('-');

    navigate(`/${selectedItem?.category}/:${newParam}`);
  };

  useEffect(() => {
    navigateToNewSelectedItem();

    if (window.innerWidth <= 768) {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line
  }, [selectedCapacityIndex, selectedColorIndex]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !selectedItem) {
    return <NotFoundProductPage title="Product was not found" />;
  }

  return (
    <section id="item-page" className="item-page">
      <div className="item-page__navigation">
        <Breadcrumbs productName={selectedItem?.name} />
      </div>

      <GoBackLink />

      <div className="item-page__content">
        <h3 className="item-page__title">{selectedItem?.name}</h3>

        <div className="item-page__card">
          <div className="item-page__image-wrapper">
            <div className="item-page__card-slider">
              <div className="item-page__card-link">
                {selectedItem?.images.map((_, index) => (
                  <img
                    key={index}
                    className="item-page__card-image"
                    src={`img/${selectedItem?.category}/${selectedItem?.namespaceId}/${spaceLessColors[selectedColorIndex]}/0${index}.webp`}
                    alt={`image ${selectedItem?.name}`}
                    aria-hidden={selectedImageIndex !== index}
                    loading="lazy"
                    style={{ translate: `${-100 * selectedImageIndex}%` }}
                    onClick={() =>
                      setSelectedImageIndex(
                        prevIndex =>
                          (prevIndex + 1) % selectedItem.images.length,
                      )
                    }
                  />
                ))}
              </div>
            </div>
            <ul className="item-page__thumbnail-list">
              {selectedItem?.images.map((_, index) => (
                <li
                  key={index}
                  className={classNames('item-page__thumbnail-item', {
                    ['item-page__thumbnail-item--selected']:
                      selectedImageIndex === index,
                  })}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    className="item-page__thumbnail-image"
                    src={`img/${selectedItem?.category}/${selectedItem?.namespaceId}/${spaceLessColors[selectedColorIndex]}/0${index}.webp`}
                    alt={`thumbnail image ${selectedItem?.name}`}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="item-page__card-controls">
            <div className="small-text item-page__controls-subtitle">
              <p>Available colors</p>
              <p>ID: 802{productId}</p>
            </div>

            <div className="item-page__container">
              <ul className="item-page__buttons-list">
                {selectedItem?.colorsAvailable.map((color, index) => {
                  const colorHex = colors[color];

                  return (
                    <RoundColorButton
                      key={index}
                      color={colorHex}
                      isSelected={selectedColorIndex === index}
                      onClick={() => setSelectedColorIndex(index)}
                    />
                  );
                })}
              </ul>

              <div className="small-text item-page__controls-subtitle">
                <p>Select capacity</p>
              </div>

              <ul className="item-page__buttons-list">
                {selectedItem?.capacityAvailable.map((capacity, index) => (
                  <li key={index} className="item-page__buttons-item ">
                    <button
                      className={classNames(
                        'body-text',
                        'item-page__capacity-btn button-text',
                        {
                          'item-page__capacity-btn--selected':
                            selectedCapacityIndex === index,
                        },
                      )}
                      onClick={() => setSelectedCapacityIndex(index)}
                    >
                      {capacity}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="item-page__price-frame">
                <h3 className="item-page__price">
                  ${selectedItem?.priceDiscount}{' '}
                  <span className="item-page__old-price">
                    ${selectedItem?.priceRegular}
                  </span>
                </h3>

                <div className={cardStyles.card__buttons}>
                  <CardButton
                    variant={isInCart ? 'selected' : 'primary'}
                    style={{ height: '48px' }}
                    onClick={() => handleAddToCart()}
                  >
                    {isInCart ? 'Added to cart' : 'Add to cart'}
                  </CardButton>
                  <button
                    className={classNames(
                      cardStyles.card__btn,
                      cardStyles['card__btn--favorite'],
                    )}
                    style={{ height: '48px', width: '48px' }}
                    onClick={() => toggleFavorite(selectedProduct as Product)}
                  >
                    {isFavorite ? (
                      <Icon iconName="favorites-filled" />
                    ) : (
                      <Icon iconName="favorites" />
                    )}
                  </button>
                </div>
              </div>

              <div className="item-page__control-details">
                <CardDetail
                  label="Screen"
                  value="6.5” OLED"
                  inlineStyles={{ fontSize: '12px', lineHeight: '16px' }}
                />
                <CardDetail
                  label="Resolution"
                  value="2688x1242"
                  inlineStyles={{ fontSize: '12px', lineHeight: '16px' }}
                />
                <CardDetail
                  label="Processor"
                  value="Apple A12 Bionic"
                  inlineStyles={{ fontSize: '12px', lineHeight: '16px' }}
                />
                <CardDetail
                  label="RAM"
                  value="3 GB"
                  inlineStyles={{ fontSize: '12px', lineHeight: '16px' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="item-page__details">
          <div className="item-page__about-wrapper">
            <h4 className="item-page__details-title">About</h4>

            {selectedItem?.description.map((d, i) => (
              <div key={i} className="item-page__about-section">
                <h5>{d.title}</h5>
                <p className="body-text--gray">{d.text}</p>
              </div>
            ))}
          </div>

          <div className="item-page__tech-wrapper">
            <h4 className="item-page__details-title">Tech specs</h4>

            <div className="item-page__tech-info">
              <CardDetail
                label="Screen"
                value={selectedItem?.screen || ''}
                inlineStyles={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  textTransform: 'none',
                }}
              />
              <CardDetail
                label="Resolution"
                value={selectedItem?.resolution || ''}
                inlineStyles={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  textTransform: 'none',
                }}
              />
              <CardDetail
                label="Processor"
                value={selectedItem?.processor || ''}
                inlineStyles={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  textTransform: 'none',
                }}
              />
              <CardDetail
                label="RAM"
                value={selectedItem?.ram || ''}
                inlineStyles={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  textTransform: 'none',
                }}
              />
              <CardDetail
                label="Built in memory"
                value={
                  selectedItem?.capacityAvailable[selectedCapacityIndex] || ''
                }
                inlineStyles={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  textTransform: 'none',
                }}
              />
              <CardDetail
                label="Camera"
                value={selectedItem?.camera || ''}
                inlineStyles={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  textTransform: 'none',
                }}
              />
              <CardDetail
                label="Zoom"
                value={selectedItem?.zoom || ''}
                inlineStyles={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  textTransform: 'none',
                }}
              />
              <CardDetail
                label="Cell"
                value={selectedItem?.cell.join(', ') || ''}
                inlineStyles={{
                  fontSize: '14px',
                  lineHeight: '21px',
                  fontWeight: '400',
                  textTransform: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <ProductSlider title="You may also like" items={suggestedProducts} />
    </section>
  );
};
