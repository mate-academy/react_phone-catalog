import classNames from "classnames";
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
        classNames(
          "relative grid h-full place-items-center text-center font-montSemi text-uppercase uppercase duration-300",
          {
            "text-primary": isActive,
            "text-sec hover:bg-elem": !isActive,
          },
        )
      }
    >
      {({ isActive }) => (
        <>
          {page}
          <div
            className={classNames(
              "absolute bottom-0 h-[3px] w-full bg-primary duration-300",
              { "opacity-0": !isActive },
            )}
          ></div>
        </>
      )}
    </NavLink>
  );
};

export default HeaderLink;
