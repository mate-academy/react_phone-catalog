import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export type NotFoundVariant =
  | 'page-not-found' // 404 page
  | 'product-not-found' // Product doesn't exist
  | 'cart-empty' // Cart is empty
  | 'favorites-empty' // No favorites
  | 'no-results' // Search/filter returns nothing
  | 'coming-soon' // Feature not implemented (contacts, rights)
  | 'error'; // Generic error

interface Props {
  variant?: NotFoundVariant;
  title?: string;
  message?: string;
  description?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  onButtonClick?: () => void;
  className?: string;
}

export const NotFound: React.FC<Props> = ({ variant = 'page-not-found', title, message, description, image, buttonText, buttonLink = '/', onButtonClick, className }) => {
  // Get default content based on variant if not provided
  const getDefaultContent = () => {
    switch (variant) {
      case 'page-not-found':
        return {
          title: title || 'Page not found',
          message: message || "We can't find the page you are looking for",
          description: description || 'The page you are trying to reach does not exist or has been moved',
          buttonText: buttonText || 'Back to home',
          buttonLink: buttonLink || '/',
        };

      case 'product-not-found':
        return {
          title: title || 'Product not found',
          message: message || "We couldn't find this product",
          description: description || '',
          buttonText: buttonText || 'Back to catalog',
          buttonLink: buttonLink || '/',
        };

      case 'cart-empty':
        return {
          title: title || 'Your cart is empty',
          message: message || 'Add some products to get started',
          description: description || 'Browse our catalog and add items to your cart',
          buttonText: buttonText || 'Start shopping',
          buttonLink: buttonLink || '/',
        };

      case 'favorites-empty':
        return {
          title: title || 'No favorites yet',
          message: message || 'Start adding products to your favorites',
          description: description || 'Click the heart icon on any product to save it here',
          buttonText: buttonText || 'Explore products',
          buttonLink: buttonLink || '/',
        };

      case 'no-results':
        return {
          title: title || 'No results found',
          message: message || 'Try adjusting your search or filters',
          description: description || "We couldn't find any products matching your criteria",
          buttonText: buttonText || 'Clear filters',
          buttonLink: buttonLink || '',
        };

      case 'coming-soon':
        return {
          title: title || 'Coming soon',
          message: message || 'This feature is under development',
          description: description || "We're working hard to bring you this feature. Check back soon!",
          buttonText: buttonText || 'Go back',
          buttonLink: buttonLink || '/',
        };

      case 'error':
        return {
          title: title || 'Something went wrong',
          message: message || 'An unexpected error occurred',
          description: description || 'Please try again or contact support if the problem persists',
          buttonText: buttonText || 'Try again',
          buttonLink: buttonLink || '',
        };

      default:
        return {
          title: title || 'Not found',
          message: message || 'Content not available',
          description: description || '',
          buttonText: buttonText || 'Go back',
          buttonLink: buttonLink || '/',
        };
    }
  };

  const content = getDefaultContent();

  // Render button based on whether we have onButtonClick or buttonLink
  const renderButton = () => {
    if (!content.buttonText) {
      return null;
    }

    // If we have a click handler, always use a button element
    if (onButtonClick) {
      return (
        <button className={styles.button} onClick={onButtonClick} type="button">
          {content.buttonText}
        </button>
      );
    }

    // If we have a link, use Link component
    if (content.buttonLink) {
      return (
        <Link to={content.buttonLink} className={styles.button}>
          {content.buttonText}
        </Link>
      );
    }

    // No handler and no link - don't render button
    return null;
  };

  return (
    <div className={`${styles.notFound} ${className || ''}`}>
      <div className={styles.content}>
        {/* Image (optional) */}
        {image && <img src={image} alt={content.title} className={styles.image} />}

        {/* Title */}
        <h1 className={styles.title}>{content.title}</h1>

        {/* Message */}
        <p className={styles.message}>{content.message}</p>

        {/* Description (optional) */}
        {content.description && <p className={styles.description}>{content.description}</p>}

        {/* Button */}
        {renderButton()}
      </div>
    </div>
  );
};
