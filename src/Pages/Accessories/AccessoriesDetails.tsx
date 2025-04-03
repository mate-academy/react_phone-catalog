import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Accessories } from '../../Types/Accessories';
import './AccessoriesDetails.scss';

export const AccessoryDetails: React.FC = () => {
  const { id } = useParams();
  const [accessory, setAccessory] = useState<Accessories | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessoryDetails = async () => {
      try {
        const response = await fetch('./api/accessories.json');

        if (!response.ok) {
          throw new Error('Failed to fetch accessory details');
        }

        const data: Accessories[] = await response.json();
        const foundAccessory = data.find(item => item.id === id);

        if (!foundAccessory) {
          throw new Error('Accessory not found');
        }

        setAccessory(foundAccessory);
        setSelectedColor(foundAccessory.color); // Set initial color
        setCurrentImages(foundAccessory.images); // Set initial images
        setSelectedImage(foundAccessory.images[0]); // Set initial large image
        setSelectedCapacity(foundAccessory.capacity); // Set initial capacity
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

    fetchAccessoryDetails();
  }, [id]);

  // Function to handle color change
  const handleColorChange = (color: string) => {
    if (!accessory) {
      return;
    }

    setSelectedColor(color);

    // Create new image path for the selected color
    const newImages = accessory.images.map(image =>
      image.replace(accessory.color, color),
    );

    setCurrentImages(newImages);
    setSelectedImage(newImages[0]); // Update large image
  };

  // Function to handle capacity change
  const handleCapacityChange = (capacity: string) => {
    setSelectedCapacity(capacity);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!accessory) {
    return <p>Accessory not found</p>;
  }

  return (
    <div className="accessory-card_detail">
      <div className="top">
        <Link className="back-button" to="/accessories">
          Back to Accessories
        </Link>
        <h2>{accessory.name}</h2>
      </div>
      <div className="accessory-start">
        {/* Image Gallery */}
        <div className="accessory-gallery">
          {/* Thumbnails */}
          <div className="accessory-gallery__thumbnails">
            {currentImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${accessory.name} thumbnail`}
                onClick={() => setSelectedImage(image)}
                className={selectedImage === image ? 'selected' : ''}
              />
            ))}
          </div>
          {/* Large Image */}
          <img
            src={selectedImage || currentImages[0]}
            alt={accessory.name}
            className="accessory-gallery__main-image"
          />
        </div>

        {/* Accessory Information */}
        <div>
          {/* Capacity Selection */}
          <h3>Choose a Capacity:</h3>
          <div className="capacity-picker">
            {accessory.capacityAvailable.map(capacity => (
              <button
                key={capacity}
                onClick={() => handleCapacityChange(capacity)}
              >
                {capacity}
              </button>
            ))}
          </div>
          {/* Choose a color */}
          <h3>Choose a color:</h3>
          <div className="color-picker">
            {accessory.colorsAvailable.map(color => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                style={{ backgroundColor: color }}
                className={selectedColor === color ? 'selected' : ''}
              />
            ))}
          </div>
          <div className="info-accessory">
            <p>Price: ${accessory.priceDiscount}</p>
            <p>Selected Capacity: {selectedCapacity}</p>
            <p>Screen: {accessory.screen}</p>
            <p>Resolution: {accessory.resolution}</p>
            <p>Processor: {accessory.processor}</p>
            <p>RAM: {accessory.ram}</p>
            <p>Cell Connectivity: {accessory.cell.join(', ')}</p>
          </div>
        </div>

        <div className="Description_accessory">
          {/* Description */}
          <div className="box-one">
            <h3>Description</h3>
            <div className="span">
              <span>Color:</span> <span>{selectedColor}</span>
            </div>
            <div className="span">
              <span>Price:</span> <span>${accessory.priceDiscount}</span>
            </div>
            <div className="span">
              <span>Capacity:</span> <span>{accessory.capacity}</span>
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
        </div>
      </div>
    </div>
  );
};
