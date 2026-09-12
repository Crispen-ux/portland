export interface Photo {
  id: number;
  src: string;
  alt: string;
  category: string;
  caption: string;
}

export const CATEGORIES = [
  "All",
  "Academics",
  "School Life",
  "Sports",
  "Technology",
  "Events",
  "Facilities",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const PHOTOS: Photo[] = [
  {
    id: 1,
    src: "/School 1.jpeg",
    alt: "Portland Schools learners gathered at the school entrance for a group photograph",
    category: "School Life",
    caption: "Our Portland family",
  },
  {
    id: 2,
    src: "/School 2.jpeg",
    alt: "Portland Schools senior learners standing outside 187 Fox Street campus",
    category: "School Life",
    caption: "Senior learners at our Fox Street campus",
  },
  {
    id: 3,
    src: "/School 3.jpeg",
    alt: "Portland Schools teacher working one-on-one with a learner in the classroom",
    category: "Academics",
    caption: "Learning with dedicated teachers",
  },
  {
    id: 4,
    src: "/Soccer.jpeg",
    alt: "Portland Schools girls soccer team posing on the field",
    category: "Sports",
    caption: "Our girls soccer team",
  },
];
