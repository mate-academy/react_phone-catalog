export const Section: React.FC<{
  title: string;
  className: string;
  children: React.ReactNode;
}> = ({ title, className, children }) => (
  <div className={className}>
    <h3 className="detailsPage__block-title">{title}</h3>
    <div className="detailsPage__line-bottom" />
    {children}
  </div>
);
