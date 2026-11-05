import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { routePaths } from '@/app/router/routes';

import { CloseIcon, SearchIcon } from '@/components/atoms';

import { useProducts } from '@/entities/product';

import { ImageWithFallback } from '../ImageWithFallback';

import styles from './SearchField.module.scss';

type Props = Omit<React.ComponentProps<'input'>, 'className' | 'type'> & {
  className?: string;
  onClear?: () => void;
};

export const SearchField = ({
  className,
  value,
  defaultValue,
  onChange,
  onFocus,
  onClear,
  ...inputProps
}: Props) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverId = useId();

  const currentValue = String(value ?? internalValue);
  const query = currentValue.trim();
  const shouldOpen = isOpen && query.length > 0;

  const { data: products, isPending, isError } = useProducts();

  const normalizedQuery = query.toLowerCase().replace(/\s+/g, ' ');
  const queryTerms = normalizedQuery.split(' ').filter(Boolean);

  const nameMatches =
    products?.filter((product) =>
      product.name.toLowerCase().includes(normalizedQuery),
    ) ?? [];

  const matchingProducts =
    nameMatches.length > 0 ?
      nameMatches
    : (products?.filter((product) => {
        const searchableParameters = [
          product.item_id,
          product.capacity,
          product.color,
          product.category,
        ]
          .join(' ')
          .toLowerCase();

        return queryTerms.every((term) => searchableParameters.includes(term));
      }) ?? []);

  const updatePosition = () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
    });
  };

  useEffect(() => {
    if (!shouldOpen) return;

    const handleOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        containerRef.current?.contains(target) ||
        resultsRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handlePosition = () => {
      updatePosition();
    };

    updatePosition();

    document.addEventListener('pointerdown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handlePosition);
    window.addEventListener('scroll', handlePosition, true);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handlePosition);
      window.removeEventListener('scroll', handlePosition, true);
    };
  }, [shouldOpen]);

  const handleSelectProduct = () => {
    if (value === undefined) {
      setInternalValue('');
    } else {
      onChange?.({
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>);
    }

    setIsOpen(false);
  };

  const handleClear = () => {
    if (value === undefined) {
      setInternalValue('');
    }

    onClear?.();
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const openResults = () => {
    if (!query) return;

    updatePosition();
    setIsOpen(true);
  };

  return (
    <>
      <div
        ref={containerRef}
        className={classNames(styles.container, className)}
      >
        <SearchIcon className={styles.icon} />

        <input
          {...inputProps}
          ref={inputRef}
          className={styles.input}
          type="search"
          value={value ?? internalValue}
          aria-label={inputProps['aria-label'] ?? 'Search products'}
          aria-expanded={shouldOpen}
          aria-controls={shouldOpen ? popoverId : undefined}
          onFocus={(event) => {
            onFocus?.(event);
            openResults();
          }}
          onClick={openResults}
          onChange={(event) => {
            if (value === undefined) {
              setInternalValue(event.target.value);
            }

            onChange?.(event);
            updatePosition();
            setIsOpen(Boolean(event.target.value.trim()));
          }}
        />

        <button
          className={classNames(styles.clearButton, {
            [styles.clearButtonHidden]: currentValue.length === 0,
          })}
          type="button"
          aria-label="Clear product search"
          aria-hidden={currentValue.length === 0}
          tabIndex={currentValue.length === 0 ? -1 : undefined}
          disabled={currentValue.length === 0}
          onClick={handleClear}
        >
          <CloseIcon className={styles.clearIcon} />
        </button>
      </div>

      {shouldOpen &&
        createPortal(
          <div
            ref={resultsRef}
            id={popoverId}
            className={styles.results}
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              width: Math.min(position.width, window.innerWidth - 16),
              maxWidth: 'calc(100vw - 16px)',
              boxSizing: 'border-box',
              zIndex: 1000,
            }}
          >
            {isPending ?
              <p className={styles.message}>Loading products...</p>
            : isError ?
              <p
                className={styles.message}
                role="alert"
              >
                Loading error
              </p>
            : matchingProducts.length === 0 ?
              <p className={styles.message}>Not found</p>
            : matchingProducts.map((product) => (
                <Link
                  key={product.id}
                  className={styles.result}
                  to={routePaths.product(product.category, product.item_id)}
                  onClick={handleSelectProduct}
                >
                  <ImageWithFallback
                    className={styles.productImage}
                    src={product.imageUrls?.[0] ?? product.images[0]}
                    alt={product.name}
                  />

                  <span className={styles.productInfo}>
                    <span className={styles.productName}>{product.name}</span>

                    <span className={styles.productDetails}>
                      {[product.capacity, product.color]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>

                    <span className={styles.productPrice}>
                      ${product.price}
                    </span>
                  </span>
                </Link>
              ))
            }
          </div>,
          document.body,
        )}
    </>
  );
};
