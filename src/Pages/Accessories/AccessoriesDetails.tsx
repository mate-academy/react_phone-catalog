import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Accessories } from '../../Types/BaseItem';
import './AccessoriesDetails.scss';
import { useCartContext } from '../../CartContext/useCartContext';
import { AccessoriesList } from './AccessoriesList';

const HeartEmpty = './img/AddFavor.png';
const HeartFilled = './img/AddFavorAct.png';

export const AccessoryDetails: React.FC = () => {
  const { id } = useParams();
  const [accessory, setAccessory] = useState<Accessories | null>(null);
  const [allAccessories, setAllAccessories] = useState<Accessories[]>([]);
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

  const navigate = useNavigate();
  const location = useLocation();

  const generateId = (namespaceId: string, capacity: string, color: string) =>
    `${namespaceId}-${capacity.toLowerCase()}-${color}`;

  useEffect(() => {
    const fetchAccessoryDetails = async () => {
      try {
        const response = await fetch('./api/accessories.json');
        if (!response.ok) throw new Error('Failed to fetch accessory details');

        const data: Accessories[] = await response.json();
        setAllAccessories(data);
        const foundAccessory = data.find((item) => item.id === id);

        if (!foundAccessory) throw new Error('Accessory not found');

        setAccessory(foundAccessory);
        setSelectedColor(foundAccessory.color);
        setSelectedCapacity(foundAccessory.capacity);
        setCurrentImages(foundAccessory.images);
        setSelectedImage(foundAccessory.images[0]);
        setCurrentPrice(
          foundAccessory.capacityPrice?.[foundAccessory.capacity] ||
            foundAccessory.priceRegular,
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAccessoryDetails();
  }, [id]);

  const handleColorChange = useCallback(
    (color: string) => {
      if (!accessory) return;

      setSelectedColor(color);
      const newImages = accessory.images.map((img) =>
        img.replace(accessory.color, color),
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
    [accessory, location, navigate],
  );

  const handleCapacityChange = useCallback(
    (capacity: string) => {
      if (!accessory) return;
      setSelectedCapacity(capacity);

      const newId = generateId(
        accessory.namespaceId,
        capacity,
        selectedColor || accessory.color,
      );

      const matched = allAccessories.find((a) => a.id === newId);
      if (matched) {
        setCurrentPrice(matched.priceDiscount ?? matched.priceRegular);
      } else {
        setCurrentPrice(accessory.priceRegular);
      }

      const oldSlug = location.pathname.split('/').pop();
      if (!oldSlug) return;

      const parts = oldSlug.split('-');
      const capIndex = parts.findIndex((p) => p.includes('gb'));
      if (capIndex === -1) return;

      parts[capIndex] = capacity.toLowerCase();
      const newSlug = parts.join('-');
      const newPath = location.pathname.replace(oldSlug, newSlug);

      navigate(newPath, { replace: true });
    },
    [accessory, allAccessories, selectedColor, location, navigate],
  );

  const toggleToCart = useCallback(
    (item: Accessories) => {
      const isInCart = cart.some((cartItem) => cartItem.item.id === item.id);
      if (isInCart) {
        removeFromCart(item.id);
      } else {
        addToCart(item);
      }
    },
    [cart, addToCart, removeFromCart],
  );

  const toggleFavorite = useCallback(
    (item: Accessories) => {
      const isInFavorites = favorites.some((fav) => fav.id === item.id);
      if (isInFavorites) {
        removeFromFavorites(item.id);
      } else {
        addToFavorites(item);
      }
    },
    [favorites, addToFavorites, removeFromFavorites],
  );

  const isInCart =
    accessory ? cart.some((c) => c.item.id === accessory.id) : false;
  const isInFavorites =
    accessory ? favorites.some((f) => f.id === accessory.id) : false;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!accessory) return <p>Accessory not found</p>;

  return (
    <div className="accessory-card_detail">
      <div className="top">
        <Link
          className="back-button"
          to="/accessories"
        >
          Back to Accessories
        </Link>
        <h2>{accessory.name}</h2>
      </div>

      <div className="accessory_midle">
        <div className="accessory-gallery">
          <div className="accessory-gallery__thumbnails">
            {currentImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${accessory.name} thumbnail`}
                onClick={() => setSelectedImage(img)}
                className={selectedImage === img ? 'selected' : ''}
              />
            ))}
          </div>
          {selectedImage && (
            <img
              src={selectedImage}
              alt={accessory.name}
              className="accessory-gallery__main-image"
            />
          )}
        </div>

        <div className="mainControls">
          <h3 className="color-picker__title">Available color</h3>
          <div className="color-picker">
            {accessory.colorsAvailable.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                style={{ backgroundColor: color }}
                className={selectedColor === color ? 'selected active' : ''}
              />
            ))}
          </div>

          <h3 className="info-accssory__selectCapacity__title">
            Select Capacity
          </h3>
          <div className="info-accssory__selectCapacity">
            {accessory.capacityAvailable.map((capacity) => (
              <button
                key={capacity}
                onClick={() => handleCapacityChange(capacity)}
                className={selectedCapacity === capacity ? 'selected' : ''}
              >
                {capacity}
              </button>
            ))}
          </div>

          <span className="info-accessory__price--new">${currentPrice}</span>
          {/* <span className="info-phone__price--old">${accessory.priceRegular}</span> */}

          <div className="info-accessory__actions">
            <button
              className={`accessory-card__actions__btn-primary ${isInCart ? 'added' : ''}`}
              onClick={() => accessory && toggleToCart(accessory)}
            >
              {isInCart ? 'Added' : 'Add to cart'}
            </button>

            <img
              onClick={() => accessory && toggleFavorite(accessory)}
              className="accessory-card__actions__btn-favorite"
              src={isInFavorites ? HeartFilled : HeartEmpty}
              alt="Favorite"
            />
          </div>

          <div className="info-accessory-box-detail">
            <div className="info-accessory__detail">
              <span>Screen:</span> <span>{accessory.screen}</span>
            </div>
            <div className="info-accessory__detail">
              <span>Resolution:</span> <span>{accessory.resolution}</span>
            </div>
            <div className="info-accessory__detail">
              <span>Processor:</span> <span>{accessory.processor}</span>
            </div>
            <div className="info-accessory__detail">
              <span>RAM:</span> <span>{accessory.ram}</span>
            </div>
            <div className="info-accessory__detail">
              <span>Connectivity:</span>{' '}
              <span>{accessory.cell.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="accessory-start">
        <div className="Description">
          <div className="box_two">
            <h3>About</h3>
            {accessory.description.map((section, index) => (
              <div key={index}>
                <h4>{section.title}</h4>
                {section.text.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="box_one">
            <h3>Description</h3>
            <div className="span">
              <span>Color:</span> <span>{selectedColor}</span>
            </div>
            <div className="span">
              <span>Price:</span> <span>${currentPrice}</span>
            </div>
            <div className="span">
              <span>Capacity:</span> <span>{selectedCapacity}</span>
            </div>
            <div className="span">
              <span>Screen:</span> <span>{accessory.screen}</span>
            </div>
            <div className="span">
              <span>Resolution:</span> <span>{accessory.resolution}</span>
            </div>
            <div className="span">
              <span>Processor:</span> <span>{accessory.processor}</span>
            </div>
            <div className="span">
              <span>RAM:</span> <span>{accessory.ram}</span>
            </div>
          </div>
        </div>

        <div className="box_three">
          <AccessoriesList hideTitle={true} />
        </div>
      </div>
    </div>
  );
};
