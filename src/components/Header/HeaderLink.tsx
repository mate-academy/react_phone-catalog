import { NavLink } from "react-router-dom";

type Link = {
  page: string;
  to: string;
};

type Props = {
  option: Link;
};

const HeaderLink = ({ option }: Props) => {
  const { page, to } = option;

  return (
    <NavLink
      key={page}
      to={to}
      className={({ isActive }) =>
        `relative grid place-items-center text-center font-montSemi text-uppercase uppercase duration-300 ${
          isActive ? "text-primary" : "text-sec"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {page}
          <div
            className={`${
              !isActive && "opacity-0"
            } absolute bottom-0 h-[3px] w-full bg-primary duration-300`}
          ></div>
        </>
      )}
    </NavLink>
  );
};

export default HeaderLink;
