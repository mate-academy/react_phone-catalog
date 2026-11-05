export function transliterate(text: string): string {
  const map: Record<string, string> = {
    shch: 'щ',
    sch: 'щ',
    zh: 'ж',
    kh: 'х',
    ts: 'ц',
    ch: 'ч',
    sh: 'ш',
    gh: 'г',

    ye: 'є',
    yi: 'ї',
    yu: 'ю',
    ya: 'я',
    ie: 'є',
    iu: 'ю',

    a: 'а',
    b: 'б',
    c: 'к',
    d: 'д',
    e: 'е',
    f: 'ф',
    g: 'ґ',
    h: 'г',
    i: 'і',
    j: 'й',
    k: 'к',
    l: 'л',
    m: 'м',
    n: 'н',
    o: 'о',
    p: 'п',
    q: 'к',
    r: 'р',
    s: 'с',
    t: 'т',
    u: 'у',
    v: 'в',
    w: 'в',
    x: 'кс',
    y: 'и',
    z: 'з',
  };

  const pattern = new RegExp(
    Object.keys(map)
      .sort((a, b) => b.length - a.length)
      .join('|'),
    'gi',
  );

  return text.replace(pattern, (match) => {
    const replacement = map[match.toLowerCase()];

    if (match === match.toUpperCase()) {
      return replacement.toUpperCase();
    }

    if (match[0] === match[0].toUpperCase()) {
      return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }

    return replacement;
  });
}
