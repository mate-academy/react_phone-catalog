export interface DescriptionSection {
  title?: string;
  paragraphs: string[];
}

interface ProductDescriptionItem {
  title?: string;
  text: string[];
}

export const getDescriptionSections = (
  description?: ProductDescriptionItem[] | null,
): DescriptionSection[] =>
  description?.map(section => ({
    title: section.title,
    paragraphs: section.text,
  })) ?? [];
