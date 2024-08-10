import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

type Props = {
  icon: (fill: string) => JSX.Element;
  to: string;
};

const HeaderButton = ({ icon, to }: Props) => {
  const { colors } = useAppContext();
  const { primary, sec } = colors;

  return (
    
      <NavLink to={to} className="grid h-full w-full place-items-center">
        {({ isActive }) => (
          <>
            {icon(isActive ? primary : sec)}
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
