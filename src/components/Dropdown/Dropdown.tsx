import { useState } from "react";
import { OptionProps } from "@/types/Product";

export const Dropdown = ({
    options,
    value,
    placeholder = 'Select',
    onChange,
    className = ''
}: OptionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedLabel = options.find(o => o.value === value)?.label || placeholder;

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="w-full h-[40px] flex items-center justify-between px-3 bg-background-color-btn
                    font-mont font-bold text-sm leading-[21px] text-text-color-base-white
                    focus:outline-none focus:ring-1 focus:ring-color-btn-purple
                    hover:cursor-pointer hover:ring-1 hover:ring-background-color-btn-hover"
            >
                <span>{selectedLabel}</span>

                <img
                    src={isOpen ? "icons/arrow-up-grey.svg" : "icons/arrow-down-grey.svg"}
                    alt="arrow-down"
                    className="w-4 h-4 pointer-events-none"
                />
            </button>

            <ul
                className={`
                    absolute z-10 top-full mt-1 w-full 
                    bg-background-color-base border border-color-border 
                    text-sm font-mont font-bold text-text-color-base-grey 
                    transition-all duration-200 origin-top
                    ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
                `}
            >
                {options.map(opt => (
                    <li
                        key={opt.value}
                        onClick={() => {
                            onChange(opt.value);
                            setIsOpen(false);
                        }}
                        className="px-3 py-2 cursor-pointer hover:bg-background-color-btn hover:text-text-color-base-white"
                    >
                        {opt.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

