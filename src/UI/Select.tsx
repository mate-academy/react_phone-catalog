import { useEffect, useRef, useState } from "react";
import ArrowDown from "../assets/icons/ArrowDown";
import useLocalStorage from "../hooks/useLocalStorage.hook";

type Props = {
  name: string;
  options: string[];
  selectedOption: string;
  onChange: (value: string) => void;
  localStorage: string;
};

const Select = ({
  name,
  options,
  selectedOption,
  onChange,
  localStorage,
}: Props) => {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [currentOption, setCurrentOption] = useLocalStorage<string>(
    localStorage,
    options[0],
  );

  const handleClickChangeOption = (option: string) => {
    onChange(option);
    setIsFocused(false);
    setCurrentOption(option);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <section className="relative w-full small:w-64" ref={dropdownRef}>
      <p className="text-bodyText text-sec">{name}</p>
      <button
        onClick={() => setIsFocused((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg border-1 border-icon p-3 duration-150 hover:border-sec focus:border-primary"
      >
        <p className="text-bodyText">{selectedOption || currentOption}</p>
        <div className={`${isFocused && "rotate-180"} duration-150`}>
          <ArrowDown fill="black" />
        </div>
      </button>
      {isFocused && (
        <div className="absolute top-[110%] flex w-full flex-col overflow-hidden rounded-lg border-1 border-icon bg-white">
          {options.map((option) => (
            <p
              key={option}
              onClick={() => handleClickChangeOption(option)}
              className="cursor-pointer rounded-lg px-3 py-2 text-left text-bodyText text-sec duration-150 hover:bg-hoverBg hover:text-primary"
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </section>
  );
};

export default Select;
