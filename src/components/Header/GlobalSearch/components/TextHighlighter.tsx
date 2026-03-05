export const TextHighlighter = ({
  text,
  query,
}: {
  text: string;
  query: string;
}) => {
  if (!query.trim()) return <span>{text}</span>;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ?
          <mark
            key={i}
            className="text-gray-400 bg-transparent font-bold rounded-sm"
          >
            {part}
          </mark>
        : <span key={i}>{part}</span>,
      )}
    </span>
  );
};
