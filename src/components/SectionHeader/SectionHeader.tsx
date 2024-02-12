import cn from 'classnames';
import './SectionHeader.scss';

type Props = {
  title: string,
  subtitle?: string,
  hasButtons?: boolean;
  classNames?: string,
};

export const SectionHeader: React.FC<Props> = ({
  title,
  subtitle,
  hasButtons = false,
  classNames,
}) => {
  return (
    <div
      className={cn('section-header', classNames)}
      style={{ justifyContent: hasButtons ? 'space-between' : 'start' }}
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

      {hasButtons && (
        <div className="section-header__buttons section-buttons">
          <span className="
          section-buttons__button
          section-buttons__button--left
          section-buttons__button--right
          "
          />
          <span className="
          section-buttons__button
          section-buttons__button--right
          "
          />
        </div>
      )}
    </div>
  );
};
