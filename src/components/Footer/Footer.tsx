import ArrowUp from "../../assets/icons/ArrowUp";
import logo from "../../assets/PageLogo.svg";
import { useAppContext } from "../../context/AppContext";
import { footerLinks } from "./Footer.data";
import FooterLink from "./FooterLink";

const Footer = () => {
  const { colors } = useAppContext();
  const { primary } = colors;

  return (
    <footer className="border-t-1 border-elem">
      <section className="mx-auto flex w-page flex-row items-center justify-between px-8">
        <picture className="grid h-24 place-items-center">
          <img src={logo} alt="" className="w-20" />
        </picture>
        <ul className="flex list-none flex-row gap-28 text-sec">
          {footerLinks.map((link) => (
            <FooterLink key={link.name} link={link.link} name={link.name} />
          ))}
        </ul>
        <div className="flex flex-row items-center justify-center gap-4 text-smallText text-sec duration-300 hover:text-primary">
          Back to top
          <button className="grid size-8 cursor-pointer place-items-center rounded-full border-1 border-icon">
            <a href="#header">
              <ArrowUp fill={primary} />
            </a>
          </button>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
