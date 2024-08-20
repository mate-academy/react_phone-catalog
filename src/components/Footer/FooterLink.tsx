type Props = { name: string; link: string };

const FooterLink = ({ name, link }: Props) => {
  return (
    <li>
      <a
        href={link}
        className="text-uppercase uppercase duration-300 hover:text-primary"
        target="_blank"
      >
        {name}
      </a>
    </li>
  );
};

export default FooterLink;
