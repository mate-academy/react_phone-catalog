import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

type Props = {
  icon: (fill: string) => JSX.Element;
  to: string;
  quantityInfo: number;
};

const HeaderButton = ({ icon, to, quantityInfo }: Props) => {
  const { colors } = useAppContext();
  const { primary, sec } = colors;

  return (
    <NavLink to={to} className="grid h-full w-full place-items-center">
      {({ isActive }) => (
        <>
          <div className="relative">
            {icon(isActive ? primary : sec)}
            {quantityInfo !== 0 && (
              <div className="absolute -right-[6px] -top-[6px] size-3 rounded-full bg-secAccent text-[8px] text-white outline outline-2 outline-white">
                {quantityInfo}
              </div>
            )}
          </div>
          <div
            className={`${
              !isActive && "opacity-0"
            } absolute bottom-0 left-0 h-[3px] w-full bg-primary duration-300`}
          ></div>
        </>
      )}
    </NavLink>
  );
};

export default HeaderButton;
