import { useEffect, useRef, useState } from "react";
import ArrowDown from "../assets/icons/ArrowDown";
import { useAppContext } from "../context/AppContext";
import useLocalStorage from "../hooks/useLocalStorage.hook";

type Props = {
  name: string;
  options: string[];
  localStoreName: string;
};

const Select = ({ name, options, localStoreName }: Props) => {
  const [option, setOption] = useLocalStorage<string>(
    localStoreName,
    options[0],
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLElement>(null);
  const { colors } = useAppContext();
  const { icon } = colors;

  const handleClickChangeOption = (opt: string) => {
    setOption(opt);
    setIsFocused(false);
  };

  const handleClickFocused = () => {
    setIsFocused((prev) => !prev);
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
        onClick={handleClickFocused}
        className="flex w-full items-center justify-between rounded-lg border-1 border-icon p-3 duration-150 hover:border-sec focus:border-primary"
      >
        <p className="text-bodyText">{option}</p>
        <div className={`${isFocused && "rotate-180"} duration-150`}>
          <ArrowDown fill={icon} />
        </div>
      </button>
      {isFocused && (
        <div className="absolute top-[110%] flex w-full flex-col overflow-hidden rounded-lg border-1 border-icon bg-white">
          {options.map((option) => (
            <p
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
