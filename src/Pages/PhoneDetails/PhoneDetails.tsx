import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone } from './../../Types/BaseItem';
import './PhoneDetails.scss';
import { useCartContext } from '../../CartContext/useCartContext';
import { BrandNewModels } from '../../BrendNewModel/BrandNewModels';

export const PhoneDetails: React.FC = () => {
  const { id } = useParams();
  const [phone, setPhone] = useState<Phone | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const { addToCart, addToFavorites } = useCartContext();
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [allPhones, setAllPhones] = useState<Phone[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);

  useEffect(() => {
    const fetchPhoneDetails = async () => {
      try {
        const response = await fetch('./api/phones.json');

        if (!response.ok) {
          throw new Error('Failed to fetch phone details');
        }

        const data: Phone[] = await response.json();
        const foundPhone = data.find((item) => item.id === id);

        if (!foundPhone) {
          throw new Error('Phone not found');
        }

        setPhone(foundPhone);
        setSelectedColor(foundPhone.color);
        setCurrentImages(foundPhone.images);
        setSelectedImage(foundPhone.images[0]);
        const initialCapacity = foundPhone.capacity;
        setSelectedCapacity(initialCapacity);
        setAllPhones(data);
        setSelectedPhone(foundPhone);

        const initialPrice = foundPhone.capacityPrice?.[initialCapacity];
        setCurrentPrice(initialPrice || foundPhone.priceRegular);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPhoneDetails();
  }, [id]);

  const generateId = (namespaceId: string, capacity: string, color: string) => {
    return `${namespaceId}-${capacity.toLowerCase()}-${color}`;
  };

  const handleColorChange = (color: string) => {
    if (!phone) {
      return;
    }

    setSelectedColor(color);

    const newImages = phone.images.map((image) =>
      image.replace(phone.color, color),
    );

    setCurrentImages(newImages);
    setSelectedImage(newImages[0]);
  };

  const handleCapacityChange = (capacity: string) => {
    if (!phone) return;

    setSelectedCapacity(capacity);

    const newId = generateId(
      phone.namespaceId,
      capacity,
      selectedColor || phone.color,
    );
    const matchedPhone = allPhones.find((p) => p.id === newId);

    if (matchedPhone) {
      setSelectedPhone(matchedPhone);
      setCurrentPrice(matchedPhone.priceDiscount ?? matchedPhone.priceRegular);
    } else {
      setSelectedPhone(phone);
      setCurrentPrice(phone.priceRegular);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!phone) {
    return <p>Phone not found</p>;
  }

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
            {currentImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${phone.name} thumbnail`}
                onClick={() => setSelectedImage(image)}
                className={selectedImage === image ? 'selected' : ''}
              />
            ))}
          </div>
          <img
            src={selectedImage || currentImages[0]}
            alt={phone.name}
            className="phone-gallery__main-image"
          />
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
              />
            ))}
          </div>
          <hr />
          <div className="info-phone">
            <h3 className="info-phone__selectCapacity__title">
              Select Capacity
            </h3>
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
            <span className="info-phone__price--old">
              ${selectedPhone?.priceRegular}
            </span>
            <div className="info-phone__actions">
              <button
                className="info-phone__actions__btn-primary"
                onClick={() => addToCart(phone)}
              >
                Add to cart
              </button>
              <img
                onClick={() => addToFavorites(phone)}
                className="info-phone__actions__btn-favorite"
                src="./img/AddFavor.png"
                alt="AddFavor"
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
