import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone } from '../../Types/Types';
import './PhoneDetails.scss';

export const PhoneDetails: React.FC = () => {
  const { id } = useParams();
  const [phone, setPhone] = useState<Phone | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoneDetails = async () => {
      try {
        const response = await fetch('./api/phones.json');

        if (!response.ok) {
          throw new Error('Failed to fetch phone details');
        }

        const data: Phone[] = await response.json();
        const foundPhone = data.find(item => item.id === id);

        if (!foundPhone) {
          throw new Error('Phone not found');
        }

        setPhone(foundPhone);
        setSelectedColor(foundPhone.color); // Встановлюємо початковий колір
        setCurrentImages(foundPhone.images); // Встановлюємо початкові зображення
        setSelectedImage(foundPhone.images[0]); // Початкове велике зображення
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

  // Функція для зміни кольору
  const handleColorChange = (color: string) => {
    if (!phone) {
      return;
    }

    setSelectedColor(color);

    // Створюємо новий шлях до зображень для обраного кольору
    const newImages = phone.images.map(image =>
      image.replace(phone.color, color),
    );

    setCurrentImages(newImages);
    setSelectedImage(newImages[0]); // Оновлюємо велике зображення
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
        <Link className="back-button" to="/phones">
          Back to Phones
        </Link>
        <h2>{phone.name}</h2>
      </div>
      <div className="phone-start">
        {/* Галерея зображень */}
        <div className="phone-gallery">
          {/* Мініатюри */}
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
          {/* Велике зображення */}
          <img
            src={selectedImage || currentImages[0]}
            alt={phone.name}
            className="phone-gallery__main-image"
          />
        </div>

        {/* Інформація про телефон */}
        <div>
          {/* Вибір кольору */}
          <h3>Choose a color:</h3>
          <div className="color-picker">
            {phone.colorsAvailable.map(color => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                style={{ backgroundColor: color }}
                className={selectedColor === color ? 'selected' : ''}
              />
            ))}
          </div>
          <div className="info-phone">
            <p>Capacity: {phone.capacity}</p>
            <p>Price: ${phone.priceDiscount}</p>
            <p>Screen: {phone.screen}</p>
            <p>Resolution: {phone.resolution}</p>
            <p>Processor: {phone.processor}</p>
            <p>RAM: {phone.ram}</p>
          </div>
        </div>

        <div className="Description">
          {/* Опис телефону */}
          <div className="box_one">
            <h3>Description</h3>
            <div className="span">
              <span>Color:</span> <span>{selectedColor}</span>
            </div>
            <div className="span">
              <span>Price:</span> <span>${phone.priceDiscount}</span>
            </div>
            <div className="span">
              <span>Capacity:</span> <span>{phone.capacity}</span>
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
      </div>
    </div>
  );
};
