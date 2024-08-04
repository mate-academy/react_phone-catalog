import ArrowUp from "../../assets/icons/ArrowUp";
import logo from "../../assets/PageLogo.svg";
import { useAppContext } from "../../context/AppContext";
import { footerLinks } from "./Footer.data";

const Footer = () => {
  const { colors } = useAppContext();
  const { primary } = colors;

  return (
    <footer className="flex flex-row justify-between items-center border-t-1 border-elem">
      <picture className="h-24 grid place-items-center">
        <img src={logo} alt="" className="w-20" />
      </picture>
      <ul className="flex flex-row list-none gap-28 text-sec">
        {footerLinks.map((link) => (
          <li key={link.name}>
            <a href={link.link} className="text-uppercase uppercase">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex flex-row gap-4 text-smallText items-center justify-center">
        Back to top
        <button className="size-8 border-icon border-1 rounded-full grid place-items-center">
          <a href="#header">
            <ArrowUp fill={primary} />
          </a>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
