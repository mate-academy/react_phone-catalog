import cn from 'classnames';

import './SectionHeader.scss';

type Props = {
  title: string,
  subtitle?: string,
  classNames?: string,
};

export const SectionHeader: React.FC<Props> = ({
  title,
  subtitle,
  classNames,
}) => {
  return (
    <div
      className={cn('section-header', classNames)}
    >
      <div className="section-header__title-container">
        <h1
          className="section-header__title"
        >
          {title}
        </h1>

        {subtitle && (
          <h2 className="section-header__subtitle">
            {subtitle}
          </h2>
        )}
      </div>
    </div>
  );
};
