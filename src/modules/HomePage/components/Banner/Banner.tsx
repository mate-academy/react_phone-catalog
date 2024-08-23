type Props = {
  className?: string;
  title: string;
  subTitle: string;
  href: string;
  src: string;
};

export const Banner: React.FC<Props> = ({
  className = '',
  title,
  subTitle,
  href,
  src,
}) => (
  <article className={`banner ${className}`.trim()}>
    <div className="banner__info-wrapper">
      <div className="banner__info">
        <span className="banner__info-title">Now available in our store</span>
        <div className="banner__info-content">
          <p className="banner__info-text">Be the first</p>

          <a className="banner__info-btn" href={href}>
            Order now
          </a>
        </div>
      </div>
    </div>

    <div className="banner__product">
      <a className="banner__product-title" href={href}>
        {title}
      </a>

      <span className="banner__product-subtitle">{subTitle}</span>

      <img className="banner__product-img" src={src} alt={title} />
    </div>
  </article>
);
