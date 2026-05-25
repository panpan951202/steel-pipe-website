export interface SpecItem {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  category: string;
  specifications: SpecItem[];
  applications: string[];
  standards: string[];
  sizeRange: string;
  wallThickness: string;
  length: string;
  features: string[];
  faq: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}
