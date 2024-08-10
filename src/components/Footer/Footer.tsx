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
      <section className="small:grid-cols-footer small:gap-0 small:grid small:items-center small:px-8 small:py-0 mx-auto flex w-page flex-col gap-8 px-4 py-8">
        <picture className="small:h-24 grid h-8 place-items-start items-center">
          <img src={logo} alt="" className="w-20" />
        </picture>
        <ul className="small:flex-row small:gap-0 flex list-none flex-col justify-between gap-4 text-sec">
          {footerLinks.map((link) => (
            <FooterLink key={link.name} link={link.link} name={link.name} />
          ))}
        </ul>
        <div className="small:justify-end flex flex-row items-center justify-center gap-4 text-smallText text-sec duration-300 hover:text-primary">
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
