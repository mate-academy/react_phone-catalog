import { navButtons, navOptions } from "../Header.data";
import HeaderButton from "../HeaderButton";
import HeaderLink from "../HeaderLink";

type Props = {
  isBurgerOpen: boolean;
};

const HeaderBurger = ({ isBurgerOpen }: Props) => {
  return (
    <menu
      className={`fixed top-12 duration-150 ${!isBurgerOpen ? "translate-x-full" : ""} -z-50 grid h-[calc(100%-3rem)] w-full grid-rows-[1fr_auto] bg-white`}
    >
      <ul className="flex flex-col items-center gap-4 p-6">
        {navOptions.map((option) => (
          <li className="h-4 w-fit">
            <HeaderLink key={option.page} option={option} />
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-2 place-items-center">
        {navButtons.map((button) => (
          <button className="relative grid h-16 w-full place-items-center border-1 border-elem">
            <HeaderButton
              key={button.name}
              icon={button.icon}
              to={button.to}
              quantityInfo={0}
            />
          </button>
        ))}
      </div>
    </menu>
  );
};

export default HeaderBurger;
