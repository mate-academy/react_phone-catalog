import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tablet } from '../../Types/Tablet'; // Імпортуємо тип Tablet
import './TabletsDetails.scss';

export const TabletDetails: React.FC = () => {
  const { id } = useParams();
  const [tablet, setTablet] = useState<Tablet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTabletDetails = async () => {
      try {
        const response = await fetch('./api/tablets.json');

        if (!response.ok) {
          throw new Error('Failed to fetch tablet details');
        }

        const data: Tablet[] = await response.json();
        const foundTablet = data.find((item) => item.id === id);

        if (!foundTablet) {
          throw new Error('Tablet not found');
        }

        setTablet(foundTablet);
        setSelectedColor(foundTablet.color); // Встановлюємо початковий колір
        setCurrentImages(foundTablet.images); // Встановлюємо початкові зображення
        setSelectedImage(foundTablet.images[0]); // Початкове велике зображення
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

    fetchTabletDetails();
  }, [id]);

  // Функція для зміни кольору
  const handleColorChange = (color: string) => {
    if (!tablet) {
      return;
    }

    setSelectedColor(color);

    // Створюємо новий шлях до зображень для обраного кольору
    const newImages = tablet.images.map((image) =>
      image.replace(tablet.color, color),
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

  if (!tablet) {
    return <p>Tablet not found</p>;
  }

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
        {/* Галерея зображень */}
        <div className="tablet-gallery">
          {/* Мініатюри */}
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
          {/* Велике зображення */}
          <img
            src={selectedImage || currentImages[0]}
            alt={tablet.name}
            className="tablet-gallery__main-image"
          />
        </div>

        {/* Інформація про планшет */}
        <div>
          {/* Вибір кольору */}
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
          <div className="info-tablet">
            <p>Capacity: {tablet.capacity}</p>
            <p>Price: ${tablet.priceDiscount}</p>
            <p>Screen: {tablet.screen}</p>
            <p>Resolution: {tablet.resolution}</p>
            <p>Processor: {tablet.processor}</p>
            <p>RAM: {tablet.ram}</p>
          </div>
        </div>

        <div className="Description_tablet">
          {/* Опис планшету */}
          <div className="box-one">
            <h3>Description</h3>
            <div className="span">
              <span>Color:</span> <span>{selectedColor}</span>
            </div>
            <div className="span">
              <span>Price:</span> <span>${tablet.priceDiscount}</span>
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
        </div>
      </div>
    </div>
  );
};
