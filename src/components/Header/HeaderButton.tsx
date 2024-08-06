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
    <button className="relative grid size-12 place-items-center border-l-1 border-elem desctop:size-16">
      <NavLink
        to={to}
        className="grid size-12 place-items-center desctop:size-16"
      >
        {({ isActive }) => (
          <>
            {icon(isActive ? primary : sec)}
            <div
              className={`${
                isActive ? "opacity-100" : "opacity-0"
              } absolute bottom-0 left-0 h-[3px] w-full bg-primary duration-300`}
            ></div>
          </>
        )}
      </NavLink>
    </button>
  );
};

export default HeaderButton;
