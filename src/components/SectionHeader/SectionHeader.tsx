import './SectionHeader.scss';

type Props = {
  title: string,
  hasButtons?: boolean;
};

export const SectionHeader: React.FC<Props> = ({
  title, hasButtons = false,
}) => {
  return (
    <div
      className="section-header"
      style={{ justifyContent: hasButtons ? 'space-between' : 'start' }}
    >
      <h2
        className="section-header__title"
      >
        {title}
      </h2>
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
