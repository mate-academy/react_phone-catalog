/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';
import styles from './Select.module.scss';
import { useTranslation } from 'react-i18next';

type Props<T extends string | number> = {
  label?: string;
  placeholder?: string;
  selectedItems: T[];
  listItem: readonly T[];
  disabledItems?: readonly T[];
  className?: string;
  isOpen: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  rootRef?: (node: HTMLDivElement | null) => void;
  onClose: () => void;
  onToggle: () => void;
  onSelect: (value: T) => void;
  renderLabel?: (value: T) => string;
};

export const Select = <T extends string | number>({
  label,
  placeholder,
  selectedItems,
  listItem,
  disabledItems = [],
  className,
  isOpen,
  isDisabled,
  isMulti = false,
  rootRef,
  onToggle,
  onClose,
  onSelect,
  renderLabel,
}: Props<T>) => {
  const { t } = useTranslation();

  let buttonClass = 'button button--big button--select';
  const buttonText =
    selectedItems.length > 0
      ? selectedItems
          .map(value => (renderLabel ? renderLabel(value) : value))
          .join(', ')
      : placeholder || t('defaultPlaceholder');

  buttonClass +=
    buttonText === placeholder || buttonText === 'select option'
      ? ' button--placeholder'
      : ' button--icon';

  buttonClass += isOpen && !isDisabled ? ' button--active' : '';
  buttonClass += isDisabled ? 'button--disabled' : '';

  const handleOnSelect = (data: T) => {
    onSelect(data);

    if (!isMulti) {
      onClose();
    }
  };

  return (
    <div ref={rootRef} className={classNames(styles.select, className)}>
      {label && <p className={styles.select__label}>{label}</p>}
      <button
        type="button"
        disabled={isDisabled}
        onClick={onToggle}
        className={classNames(buttonClass, styles.select__control)}
      >
        <span>{buttonText}</span>
        <span
          className={classNames(
            'icon icon--chevron-disabled',
            isOpen ? 'icon--rotate-90' : 'icon--rotate90',
          )}
        />
      </button>
      <ul
        className={classNames(styles.select__menu, {
          [styles['select__menu--open']]: isOpen,
        })}
      >
        {listItem.map(item => {
          const isDisabledItem = disabledItems.includes(item);
          const isSelected = selectedItems.includes(item);

          return (
            <li
              key={item}
              onClick={() => !isDisabledItem && handleOnSelect(item)}
              className={classNames(styles.select__option, {
                [styles['select__option--selected']]: isSelected,
                [styles['select__option--disabled']]: isDisabledItem,
              })}
            >
              {renderLabel ? renderLabel(item) : item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
