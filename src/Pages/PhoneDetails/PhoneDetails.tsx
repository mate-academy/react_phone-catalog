import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone } from './../../Types/BaseItem';
import './PhoneDetails.scss';
import { useCartContext } from '../../CartContext/useCartContext';
import { BrandNewModels } from '../../BrendNewModel/BrandNewModels';

const HeartEmpty = './img/AddFavor.png';
const HeartFilled = './img/AddFavorAct.png';

export const PhoneDetails: React.FC = () => {
  const { id } = useParams();
  const [allPhones, setAllPhones] = useState<Phone[]>([]);
  const [phone, setPhone] = useState<Phone | null>(null);
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

  const toggleToCart = useCallback(
    (phone: Phone) => {
      const isInCart = cart.some((cartItem) => cartItem.item.id === phone.id);

      if (isInCart) {
        removeFromCart(phone.id);
      } else {
        addToCart(phone);
      }
    },
    [cart, addToCart, removeFromCart],
  );

  const toggleFavorite = useCallback(
    (phone: Phone) => {
      const isInFavorites = favorites.some((fav) => fav.id === phone.id);

      if (isInFavorites) {
        removeFromFavorites(phone.id);
      } else {
        addToFavorites(phone);
      }
    },
    [favorites, addToFavorites, removeFromFavorites],
  );

  useEffect(() => {
    const fetchPhoneDetails = async () => {
      try {
        const response = await fetch('./api/phones.json');
        if (!response.ok) throw new Error('Failed to fetch phone details');

        const data: Phone[] = await response.json();
        setAllPhones(data);
        const foundPhone = data.find((item) => item.id === id);

        if (!foundPhone) throw new Error('Phone not found');

        setPhone(foundPhone);
        setSelectedColor(foundPhone.color);
        setSelectedCapacity(foundPhone.capacity);
        setCurrentImages(foundPhone.images);
        setSelectedImage(foundPhone.images[0]);
        setCurrentPrice(
          foundPhone.capacityPrice?.[foundPhone.capacity] ||
            foundPhone.priceRegular,
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPhoneDetails();
  }, [id]);

  const generateId = (namespaceId: string, capacity: string, color: string) =>
    `${namespaceId}-${capacity.toLowerCase()}-${color}`;

  const handleColorChange = useCallback(
    (color: string) => {
      if (!phone) return;
      setSelectedColor(color);
      const newImages = phone.images.map((img) =>
        img.replace(phone.color, color),
      );
      setCurrentImages(newImages);
      setSelectedImage(newImages[0]);
    },
    [phone],
  );

  const handleCapacityChange = useCallback(
    (capacity: string) => {
      if (!phone) return;
      setSelectedCapacity(capacity);
      const newId = generateId(
        phone.namespaceId,
        capacity,
        selectedColor || phone.color,
      );
      const matchedPhone = allPhones.find((p) => p.id === newId);

      if (matchedPhone) {
        setCurrentPrice(
          matchedPhone.priceDiscount ?? matchedPhone.priceRegular,
        );
      } else {
        setCurrentPrice(phone.priceRegular);
      }
    },
    [allPhones, phone, selectedColor],
  );

  const isInCart = phone ? cart.some((c) => c.item.id === phone.id) : false;
  const isInFavorites =
    phone ? favorites.some((f) => f.id === phone.id) : false;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!phone) return <p>Phone not found</p>;

  return (
    <div className="phone-card_detail">
      <div className="top">
        <Link
          className="back-button"
          to="/phones"
        >
          Back to Phones
        </Link>
        <h2>{phone.name}</h2>
      </div>

      <div className="phone-start">
        <div className="phone-gallery">
          <div className="phone-gallery__thumbnails">
            {currentImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${phone.name} thumbnail`}
                onClick={() => setSelectedImage(img)}
                className={selectedImage === img ? 'selected' : ''}
              />
            ))}
          </div>
          {selectedImage && (
            <img
              src={selectedImage}
              alt={phone.name}
              className="phone-gallery__main-image"
            />
          )}
        </div>

        <div>
          <h3 className="color-picker__title">Available color</h3>
          <div className="color-picker">
            {phone.colorsAvailable.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                style={{ backgroundColor: color }}
                className={selectedColor === color ? 'selected' : ''}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
          <hr />

          <h3 className="info-phone__selectCapacity__title">Select Capacity</h3>
          <div className="info-phone__selectCapacity">
            {phone.capacityAvailable.map((capacity) => (
              <button
                key={capacity}
                onClick={() => handleCapacityChange(capacity)}
                className={selectedCapacity === capacity ? 'selected' : ''}
              >
                {capacity}
              </button>
            ))}
          </div>
          <hr />

          <span className="info-phone__price--new">${currentPrice}</span>
          <span className="info-phone__price--old">${phone.priceRegular}</span>

          <div className="info-phone__actions">
            <button
              className={`phone-card__actions__btn-primary ${isInCart ? 'added' : ''}`}
              onClick={() => phone && toggleToCart(phone)}
            >
              {isInCart ? 'Added' : 'Add to cart'}
            </button>

            <img
              onClick={() => phone && toggleFavorite(phone)}
              className="phone-card__actions__btn-favorite"
              src={isInFavorites ? HeartFilled : HeartEmpty}
              alt="Favorite"
            />
          </div>

          <div className="info-phone-box-detail">
            <div className="info-phone__detail">
              <span>Screen:</span> <span>{phone.screen}</span>
            </div>
            <div className="info-phone__detail">
              <span>Resolution:</span> <span>{phone.resolution}</span>
            </div>
            <div className="info-phone__detail">
              <span>Processor:</span> <span>{phone.processor}</span>
            </div>
            <div className="info-phone__detail">
              <span>RAM:</span> <span>{phone.ram}</span>
            </div>
          </div>
        </div>

        <div className="Description">
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
              <span>Screen:</span> <span>{phone.screen}</span>
            </div>
            <div className="span">
              <span>Resolution:</span> <span>{phone.resolution}</span>
            </div>
            <div className="span">
              <span>Processor:</span> <span>{phone.processor}</span>
            </div>
            <div className="span">
              <span>RAM:</span> <span>{phone.ram}</span>
            </div>
            <div className="span">
              <span>Camera:</span> <span>{phone.camera}</span>
            </div>
            <div className="span">
              <span>Zoom:</span> <span>{phone.zoom}</span>
            </div>
          </div>

          <div className="box_two">
            <h3>About</h3>
            {phone.description.map((section, index) => (
              <div key={index}>
                <h4>{section.title}</h4>
                {section.text.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="box_three">
          <h3>You may also like</h3>
          <BrandNewModels hideTitle={true} />
        </div>
      </div>
    </div>
  );
};
