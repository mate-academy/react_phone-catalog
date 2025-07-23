import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { DropdownArrowDown } from '../../images/icons/DropdownArrowDown';
import { DropdownArrowUp } from '../../images/icons/DropdownArrowUp';
import clsx from 'clsx';

type DropDownProps = {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  className?: string;
  triggerButtonClassName?: string;
  dropdownMenuClassName?: string;
  itemClassName?: string;
  onChange: (value: string) => void;
};

export const DropDown = ({
  options,
  label = 'Select',
  value,
  className,
  triggerButtonClassName,
  dropdownMenuClassName,
  itemClassName,
  onChange,
}: DropDownProps) => {
  const [dropDownIsOpened, setDropDownIsOpened] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const triggerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const selectedLabel = options.find(opt => opt.value === value)?.label || '';

  const handleSelect = (newValue: string) => {
    onChange(newValue);
    setDropDownIsOpened(false);
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!dropDownIsOpened) {
      if (
        event.key === 'Enter' ||
        event.key === ' ' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp'
      ) {
        event.preventDefault();
        setDropDownIsOpened(true);
        const currentIndex = options.findIndex(opt => opt.value === value);
        setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        setFocusedIndex(prev => {
          if (prev < options.length - 1) {
            return prev + 1;
          } else {
            return 0;
          }
        });
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        setFocusedIndex(prev => {
          if (prev > 0) {
            return prev - 1;
          } else {
            return options.length - 1;
          }
        });
        break;
      }
      case 'Escape':
        event.preventDefault();
        setDropDownIsOpened(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
        break;
      case 'Tab':
        setDropDownIsOpened(false);
        setFocusedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
      itemRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const baseWrapper =
    'dropdown-wrapper flex flex-col items-start justify-center text-start h-15 mobile:w-34 tablet:w-44';
  const baseLabel =
    'block text-nav leading-[100%] text-secondary dark:text-dark-secondary mb-1';
  const baseTriggerBtn =
    'w-34 mobile:w-34 tablet:w-44 h-10 px-3 bg-white dark:bg-gray-800 border border-icons dark:border-gray-600 hover:border-primary dark:hover:border-gray-400 flex items-center justify-between text-primary dark:text-dark-primary';
  const baseDropdownContent =
    'bg-white dark:bg-gray-800 shadow-lg border border-icons dark:border-gray-600 z-50 overflow-hidden mobile:w-34 tablet:w-44 text-2 focus:outline-none';
  const baseDropdownItem =
    'px-3 py-2 text-sm cursor-pointer outline-none w-full text-secondary dark:text-dark-secondary transition-colors hover:bg-elements dark:hover:bg-gray-700';
  const activeDropdownItem =
    'bg-elements dark:bg-gray-600 text-primary dark:text-dark-primary';
  const focusedDropdownItem =
    'bg-hover dark:bg-gray-700 text-primary dark:text-dark-primary';

  return (
    <div className={clsx(baseWrapper, className)}>
      <label
        className={baseLabel}
        id={`${label}-label`}
      >
        {label}
      </label>
      <AnimatePresence>
        <DropdownMenu.Root
          open={dropDownIsOpened}
          onOpenChange={setDropDownIsOpened}
          modal={false}
        >
          <DropdownMenu.Trigger>
            <div
              ref={triggerRef}
              className={clsx(baseTriggerBtn, triggerButtonClassName)}
              tabIndex={0}
              aria-labelledby={`${label}-label`}
              aria-haspopup="listbox"
              aria-expanded={dropDownIsOpened}
              role="combobox"
              onKeyDown={handleKeyDown}
            >
              <span className="text-default">{selectedLabel}</span>
              <span className="ml-2">
                {dropDownIsOpened ? <DropdownArrowUp /> : <DropdownArrowDown />}
              </span>
            </div>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <AnimatePresence>
              {dropDownIsOpened && (
                <DropdownMenu.Content
                  className={clsx(baseDropdownContent, dropdownMenuClassName)}
                  sideOffset={2}
                  align="start"
                  side="bottom"
                  style={{
                    width: 'var(--radix-dropdown-menu-trigger-width)',
                    maxHeight: '240px',
                    overflowY: 'auto',
                  }}
                  onCloseAutoFocus={e => e.preventDefault()}
                  role="listbox"
                  aria-labelledby={`${label}-label`}
                  onKeyDown={handleKeyDown}
                >
                  {options.map(
                    ({ label: itemLabel, value: optionValue }, index) => {
                      const isSelected = value === optionValue;
                      const isFocused = focusedIndex === index;

                      const itemClasses = clsx(
                        baseDropdownItem,
                        itemClassName,
                        isSelected && activeDropdownItem,
                        isFocused && focusedDropdownItem,
                      );

                      return (
                        <motion.div
                          key={optionValue}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <DropdownMenu.Item
                            ref={el => {
                              itemRefs.current[index] = el;
                            }}
                            className={itemClasses}
                            onSelect={() => handleSelect(optionValue)}
                            role="option"
                            aria-selected={isSelected}
                            tabIndex={-1}
                          >
                            {itemLabel}
                          </DropdownMenu.Item>
                        </motion.div>
                      );
                    },
                  )}
                </DropdownMenu.Content>
              )}
            </AnimatePresence>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </AnimatePresence>
    </div>
  );
};
