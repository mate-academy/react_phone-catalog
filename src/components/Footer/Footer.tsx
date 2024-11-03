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
      <section className="mx-auto flex w-page flex-col gap-8 px-4 py-8 small:grid small:grid-cols-footer small:items-center small:gap-0 small:px-8 small:py-0">
        <picture className="grid h-8 place-items-start items-center small:h-24">
          <img src={logo} alt="" className="w-20" />
        </picture>
        <ul className="flex list-none flex-col justify-between gap-4 text-sec small:flex-row small:gap-0">
          {footerLinks.map((link) => (
            <FooterLink key={link.name} link={link.link} name={link.name} />
          ))}
        </ul>
        <div className="flex flex-row items-center justify-center gap-4 text-smallText text-sec duration-300 hover:text-primary small:justify-end">
          Back to top
          <button className="grid size-8 cursor-pointer place-items-center rounded-full border-1 border-icon">
            <a onClick={() => window.scrollTo(0, 0)}>
              <ArrowUp fill={primary} />
            </a>
          </button>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
