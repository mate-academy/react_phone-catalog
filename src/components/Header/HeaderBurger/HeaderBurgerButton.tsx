import BurgerMenu from "../../../assets/icons/BurgerMenu";
import { useAppContext } from "../../../context/AppContext";

const HeaderBurgerButton = () => {
  const { colors, handleClickSwitchBurger } = useAppContext();
  const { primary } = colors;

  return (
    <button
      onClick={handleClickSwitchBurger}
      className="desktop:size-16 relative grid size-12 place-items-center border-l-1 border-elem"
    >
      <BurgerMenu fill={primary} />
    </button>
  );
};

export default HeaderBurgerButton;
