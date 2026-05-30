import './HighlightText.scss';

type Props = {
  text: string;
  keys: string[];
};

export const HighlightText: React.FC<Props> = ({ text, keys }) => {
  if (!keys.length) {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${keys.join('|')})`, 'gi');

  return (
    <>
      {text.split(regex).map((part, index) =>
        keys.some(key => part.toLowerCase() === key) ? (
          <span className="highlight" key={index}>
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
};
