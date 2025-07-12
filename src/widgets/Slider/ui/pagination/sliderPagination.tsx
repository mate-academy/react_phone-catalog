type Params = {
  length: number;
  fn?: (arg?: unknown) => unknown;
  className: string;
};

export const SliderPagination = ({ length, fn, className }: Params) => {
  const amount = Array.from({ length: length }, (_, i) => i);

  return (
    <nav aria-label="Slider pagination" className={className}>
      {amount.map(dg => (
        <div key={dg}>
          <button onClick={fn} />
        </div>
      ))}
    </nav>
  );
};
