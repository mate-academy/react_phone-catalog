type SubtitleProps = {
  children: React.ReactNode
};

export const Subtitle = ({ children }: SubtitleProps) => (
  <h2 className="subtitle">{children}</h2>
);
