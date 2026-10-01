type Props = {
  children: React.ReactNode;
};

export default function SectionTitle({ children }: Props) {
  return (
    <div className="section-title">
      <h2>{children}</h2>
      <div className="section-line" />
    </div>
  );
}
