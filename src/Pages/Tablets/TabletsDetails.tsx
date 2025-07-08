import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useCartContext } from '../../CartContext/useCartContext';
import { Tablet } from '../../Types/BaseItem';
import './TabletsDetails.scss';

const HeartEmpty = './img/AddFavor.png';
const HeartFilled = './img/AddFavorAct.png';

export const TabletDetails: React.FC = () => {
  const { id } = useParams();
  const [allTablets, setAllTablets] = useState<Tablet[]>([]);
  const [tablet, setTablet] = useState<Tablet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  const {
    cart,
    favorites,
    addToCart,
    removeFromCart,
    addToFavorites,
    removeFromFavorites,
  } = useCartContext();

  const location = useLocation();
  const navigate = useNavigate();

  const toggleToCart = useCallback(
    (tablet: Tablet) => {
      const isInCart = cart.some((cartItem) => cartItem.item.id === tablet.id);
      if (isInCart) {
        removeFromCart(tablet.id);
      } else {
        addToCart(tablet);
      }
    },
    [cart, addToCart, removeFromCart],
  );

  const toggleFavorite = useCallback(
    (tablet: Tablet) => {
      const isInFavorites = favorites.some((fav) => fav.id === tablet.id);
      if (isInFavorites) {
        removeFromFavorites(tablet.id);
      } else {
        addToFavorites(tablet);
      }
    },
    [favorites, addToFavorites, removeFromFavorites],
  );

  useEffect(() => {
    const fetchTabletDetails = async () => {
      try {
        const response = await fetch('./api/tablets.json');
        if (!response.ok) {
          throw new Error('Failed to fetch tablet details');
        }

        const data: Tablet[] = await response.json();
        setAllTablets(data);
        const foundTablet = data.find((item) => item.id === id);

        if (!foundTablet) {
          throw new Error('Tablet not found');
        }

        setTablet(foundTablet);
        setSelectedColor(foundTablet.color);
        setSelectedCapacity(foundTablet.capacity);
        setCurrentImages(foundTablet.images);
        setSelectedImage(foundTablet.images[0]);
        setCurrentPrice(
          foundTablet.capacityPrice?.[foundTablet.capacity] ||
            foundTablet.priceRegular,
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTabletDetails();
  }, [id]);

  const generateId = (namespaceId: string, capacity: string, color: string) =>
    `${namespaceId}-${capacity.toLowerCase()}-${color}`;

  const handleColorChange = useCallback(
    (color: string) => {
      if (!tablet) return;

      setSelectedColor(color);

      const newImages = tablet.images.map((img) =>
        img.replace(tablet.color, color),
      );

      setCurrentImages(newImages);
      setSelectedImage(newImages[0]);

      const oldSlug = location.pathname.split('/').pop();
      if (!oldSlug) return;

      const parts = oldSlug.split('-');
      parts[parts.length - 1] = color;
      const newSlug = parts.join('-');
      const newPath = location.pathname.replace(oldSlug, newSlug);

      navigate(newPath, { replace: true });
    },
    [tablet, location, navigate],
  );

  const handleCapacityChange = useCallback(
    (capacity: string) => {
      if (!tablet) return;

      setSelectedCapacity(capacity);

      const newId = generateId(
        tablet.namespaceId,
        capacity,
        selectedColor || tablet.color,
      );

      const matchedTablet = allTablets.find((p) => p.id === newId);

      if (matchedTablet) {
        setCurrentPrice(
          matchedTablet.priceDiscount ?? matchedTablet.priceRegular,
        );
      } else {
        setCurrentPrice(tablet.priceRegular);
      }

      const oldSlug = location.pathname.split('/').pop();
      if (!oldSlug) return;

      const parts = oldSlug.split('-');
      const capacityIndex = parts.findIndex((part) => part.includes('gb'));
      if (capacityIndex === -1) return;

      parts[capacityIndex] = capacity.toLowerCase();

      const newSlug = parts.join('-');
      const newPath = location.pathname.replace(oldSlug, newSlug);

      navigate(newPath, { replace: true });
    },
    [allTablets, tablet, selectedColor, location, navigate],
  );

  const isInCart = tablet ? cart.some((c) => c.item.id === tablet.id) : false;
  const isInFavorites =
    tablet ? favorites.some((f) => f.id === tablet.id) : false;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!tablet) return <p>Tablet not found</p>;

  return (
    <div className="tablet-card_detail">
      <div className="top">
        <Link
          className="back-button"
          to="/tablets"
        >
          Back to Tablets
        </Link>
        <h2>{tablet.name}</h2>
      </div>

      <div className="tablet-start">
        <div className="tablet-gallery">
          <div className="tablet-gallery__thumbnails">
            {currentImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${tablet.name} thumbnail`}
                onClick={() => setSelectedImage(image)}
                className={selectedImage === image ? 'selected' : ''}
              />
            ))}
          </div>
          <img
            src={selectedImage || currentImages[0]}
            alt={tablet.name}
            className="tablet-gallery__main-image"
          />
        </div>

        <div>
          <h3>Choose a color:</h3>
          <div className="color-picker">
            {tablet.colorsAvailable.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                style={{ backgroundColor: color }}
                className={selectedColor === color ? 'selected' : ''}
              />
            ))}
          </div>

          <h3>Choose capacity:</h3>
          <div className="capacity-picker">
            {tablet.capacityAvailable.map((capacity) => (
              <button
                key={capacity}
                onClick={() => handleCapacityChange(capacity)}
                className={selectedCapacity === capacity ? 'selected' : ''}
              >
                {capacity}
              </button>
            ))}
          </div>

          <div className="info-tablet">
            <p>Capacity: {tablet.capacity}</p>
            <p>Price: ${currentPrice ?? tablet.priceRegular}</p>
            <p>Screen: {tablet.screen}</p>
            <p>Resolution: {tablet.resolution}</p>
            <p>Processor: {tablet.processor}</p>
            <p>RAM: {tablet.ram}</p>
          </div>

          <div className="info-tablet_actions">
            <button
              className="info-tablet_actions__btn-primary"
              onClick={() => toggleToCart(tablet)}
            >
              {isInCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>
            <img
              onClick={() => tablet && toggleFavorite(tablet)}
              className="info-tablet__actions__btn-favorite"
              src={isInFavorites ? HeartFilled : HeartEmpty}
              alt="Favorite"
            />
          </div>
        </div>

        <div className="Description_tablet">
          <div className="box_two">
            <h3>About</h3>
            {tablet.description.map((section, index) => (
              <div key={index}>
                <h4>{section.title}</h4>
                {section.text.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="box-one">
            <h3>Description</h3>
            <div className="span">
              <span>Color:</span> <span>{selectedColor}</span>
            </div>
            <div className="span">
              <span>Price:</span>{' '}
              <span>${currentPrice ?? tablet.priceRegular}</span>
            </div>
            <div className="span">
              <span>Capacity:</span> <span>{tablet.capacity}</span>
            </div>
            <div className="span">
              <span>Screen:</span> <span>{tablet.screen}</span>
            </div>
            <div className="span">
              <span>Resolution:</span> <span>{tablet.resolution}</span>
            </div>
            <div className="span">
              <span>Processor:</span> <span>{tablet.processor}</span>
            </div>
            <div className="span">
              <span>RAM:</span> <span>{tablet.ram}</span>
            </div>
            <div className="span">
              <span>Camera:</span> <span>{tablet.camera}</span>
            </div>
            <div className="span">
              <span>Zoom:</span> <span>{tablet.zoom}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
