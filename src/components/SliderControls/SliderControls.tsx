type Props = {
  start: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function SliderControls({
  start,
  total,
  onPrev,
  onNext,
}: Props) {
  return (
    <div className="slider-controls">
      <span>
        {start + 1}–{Math.min(start + 4, total)} of {total}
      </span>

      <button onClick={onPrev} disabled={start === 0}>
        ‹
      </button>

      <button onClick={onNext} disabled={start >= total - 4}>
        ›
      </button>
    </div>
  );
}
