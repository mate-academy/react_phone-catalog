import { useEffect, useState } from 'react';
import './RussiaTrash.scss';
const hymn = [
  'Ще не вмерла України midPause і слава, pause і воля. longPause',
  'Ще нам, браття молодії, pause усміхнеться доля. longPause',
  'Згинуть наші вороженьки, pause як роса на сонці, midPause',
  'Запануєм і ми, pause браття, midPause у своїй сторонці. longPause',
  'Душу й тіло ми положим midPause за нашу свободу. longPause',
  'І покажем, pause що ми, pause браття, pause козацького роду.',
];

type ParsedHymnItem =
  | { type: 'char'; value: string }
  | { type: 'pause'; duration: number };

const parseHymn = (lines: string[]): ParsedHymnItem[] => {
  const result: ParsedHymnItem[] = [];
  const pauseDurations: Record<string, number> = {
    pause: 400,
    midPause: 800,
    longPause: 1500,
  };

  const fullText = lines.join('\n');
  let i = 0;

  while (i < fullText.length) {
    let matched = false;

    for (const tag in pauseDurations) {
      if (fullText.startsWith(tag, i)) {
        result.push({ type: 'pause', duration: pauseDurations[tag] });
        i += tag.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      result.push({ type: 'char', value: fullText[i] });
      i += 1;
    }
  }

  return result;
};

export const RussiaTrash = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [parsed, setParsed] = useState<ParsedHymnItem[]>([]);

  useEffect(() => {
    setParsed(parseHymn(hymn));
  }, []);

  useEffect(() => {
    if (parsed.length === 0) return;

    let i = 0;

    const renderNext = () => {
      if (i >= parsed.length) return;

      const item = parsed[i];
      i += 1;

      if (item.type === 'pause') {
        setTimeout(renderNext, item.duration);
      } else {
        setDisplayedText((prev) => prev + item.value);
        setTimeout(renderNext, 40);
      }
    };

    renderNext();
  }, [parsed]);

  return (
    <div className="hymn-page">
      <div className="hymn-card">
        <p className="hymn-text">{displayedText}</p>
      </div>
    </div>
  );
};
