import { getWholeRandom } from '@shared/helpers';

const MAX_HEADINGS = 3;
const MIN_HEADINGS = 2;

const MAX_PARAGRAPHS = 3;
const MIN_PARAGRAPHS = 1;

const getParagraph = () => {
  const res: string[] = [];

  const paragraphsPerHeadings = Array.from(
    { length: getWholeRandom(MAX_PARAGRAPHS, MIN_PARAGRAPHS) },
    (_, i) => i,
  );

  paragraphsPerHeadings.forEach(el => res.push(el.toString()));

  return res;
};

export const getSkeletonArray = () => {
  const skeletonConf: { title: string; text: string[] }[] = [];

  const headings = Array.from(
    { length: getWholeRandom(MAX_HEADINGS, MIN_HEADINGS) },
    (_, i) => i,
  );

  headings.forEach(heading =>
    skeletonConf.push({ title: heading.toString(), text: getParagraph() }),
  );

  return skeletonConf;
};
