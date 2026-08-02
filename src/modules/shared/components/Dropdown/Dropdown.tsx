import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';

const CHEVRON_PATH = `M12.4715 5.52864C12.7318 5.78899 12.7318 6.2111 12.4715 6.47145L8.47149 10.4714C8.21114 10.7318 7.78903 10.7318 7.52868 10.4714L3.52868 6.47144C3.26833 6.2111 3.26833 5.78899 3.52868 5.52864C3.78903 5.26829 4.21114 5.26829 4.47149 5.52864L8.00008 9.05723L11.5287 5.52864C11.789 5.26829 12.2111 5.26829 12.4715 5.52864Z`;

export type DropdownOption = {
    value: string;
    label: string;
};

export interface DropdownProps {
    value: string;
    options: DropdownOption[];
    onChange: (value: string) => void;
    ariaLabel: string;
}

export const Dropdown = ({
    value,
    options,
    onChange,
    ariaLabel,
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find(option => option.value === value);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={styles.dropdown} ref={containerRef}>
            <button
                type="button"
                className={classNames(styles.dropdown__toggle, {
                    [styles['dropdown__toggle--open']]: isOpen,
                })}
                onClick={() => setIsOpen(current => !current)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label={ariaLabel}
            >
                <span className={styles.dropdown__value}>
                    {selectedOption?.label}
                </span>

                <svg
                    className={styles.dropdown__chevron}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d={CHEVRON_PATH}
                        fill="currentColor"
                    />
                </svg>
            </button>

            {isOpen && (
                <ul
                    className={styles.dropdown__list}
                    role="listbox"
                    aria-label={ariaLabel}
                >
                    {options.map(option => (
                        <li
                            key={option.value}
                            role="option"
                            aria-selected={option.value === value}
                            className={classNames(styles.dropdown__item, {
                                [styles['dropdown__item--selected']]:
                                    option.value === value,
                            })}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
