export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export function capitalizePhase(phase: string) {
  const arr = phase.split('');

  return [arr.shift()?.toUpperCase(), ...arr].join('');
}

export function createNumeratedArray(amount: number) {
  return Array.from({
    length: Math.ceil(amount),
  }).map((_, i) => i);
}
