import classNames from "classnames";
import { useAppContext } from "../../../context/AppContext";
import { navButtons, navOptions } from "../Header.data";
import HeaderButton from "../HeaderButton";
import HeaderLink from "../HeaderLink";

type Props = {
  isBurgerOpen: boolean;
};

const HeaderBurger = ({ isBurgerOpen }: Props) => {
  const { handleClickSwitchBurger } = useAppContext();

  return (
    <menu
      className={classNames(
        "fixed top-12 -z-50 grid h-[calc(100%-3rem)] w-full grid-rows-[1fr_auto] bg-white duration-150",
        {
          "translate-x-full": !isBurgerOpen,
        },
      )}
    >
      <ul className="flex flex-col items-center gap-4 p-6">
        {navOptions.map((option) => (
          <li
            className="h-4 w-fit"
            onClick={handleClickSwitchBurger}
            key={option.page}
          >
            <HeaderLink option={option} />
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-2 place-items-center">
        {navButtons.map((button) => (
          <button
            key={button.name}
            className="relative grid h-16 w-full place-items-center border-1 border-elem"
            onClick={handleClickSwitchBurger}
          >
            <HeaderButton icon={button.icon} to={button.to} />
          </button>
        ))}
      </div>
    </menu>
  );
};

export default HeaderBurger;
