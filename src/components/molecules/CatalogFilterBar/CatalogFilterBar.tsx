import { useEffect, useRef, useState } from 'react';
import { Dropdown } from '../Dropdown';
import { Typography } from '../../atoms/Typography/Typography';
import { Icon } from '../../atoms/Icon/Icon';
import { ICONS } from '../../../constants/icons';
import type { CatalogFilters, FilterOptions } from '../../../types/Catalog';

type Props = {
  filters: CatalogFilters;
  filterOptions: FilterOptions;
  onFiltersChange: (filters: CatalogFilters) => void;
  filterLabel: string;
  filterAnyLabel: string;
};

export const CatalogFilterBar = ({
  filters,
  filterOptions,
  onFiltersChange,
  filterLabel,
  filterAnyLabel,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const updateFilters = (patch: Partial<CatalogFilters>) => {
    onFiltersChange({ ...filters, ...patch });
  };
  const modelOptions = filterOptions.models;
  const modelLabels = [
    'All models',
    ...modelOptions.map((model) => model.label),
  ];

  const selectedModel =
    modelOptions.find((model) => model.value === filters.model)?.label ??
    'All models';

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => setIsOpen(false);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className="relative w-full font-mont"
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="catalog-filter-panel"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-10 w-full items-center justify-between border border-elements bg-white px-3 text-left text-primary hover:border-secondary focus-visible:border-primary focus-visible:outline-none dark:bg-icons dark:text-white"
      >
        <Typography level="button">Filter</Typography>
        <Icon
          src={isOpen ? ICONS.ARROW.UP : ICONS.ARROW.DOWN}
          className="size-4 dark:bg-secondary"
          isDisabled
        />
      </button>

      {isOpen && (
        <div
          id="catalog-filter-panel"
          aria-label="Catalog filters"
          className="absolute right-0 top-full z-20 mt-2 w-full border border-elements bg-white p-4 shadow-sm dark:bg-surface-2-dark"
        >
          <div className="flex flex-col items-start gap-4">
            <div className="w-full max-w-60">
              <Dropdown
                label="Model"
                options={modelLabels}
                value={selectedModel}
                onChange={(label) => {
                  const selectedOption = modelOptions.find(
                    (model) => model.label === label,
                  );

                  updateFilters({ model: selectedOption?.value ?? '' });
                }}
              />
            </div>

            <div className="w-full max-w-60">
              <Dropdown
                label={filterLabel}
                options={[filterAnyLabel, ...filterOptions.capacities]}
                value={filters.capacity || filterAnyLabel}
                onChange={(value) =>
                  updateFilters({
                    capacity: value === filterAnyLabel ? '' : value,
                  })
                }
              />
            </div>

            <button
              type="button"
              onClick={() =>
                onFiltersChange({
                  model: '',
                  capacity: '',
                })
              }
              className="h-10 text-sm text-secondary hover:text-primary hover-zoom-small dark:hover:text-white"
            >
              Reset filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
