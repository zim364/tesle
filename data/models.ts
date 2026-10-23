// ─── ROADSTER DATA (Used by /models/[slug]/page.tsx) ───
export type Model = {
  slug: string;
  name: string;
  tagline: string;
  specs: { label: string; value: string }[];
  heroImage: string;
  flagship?: boolean;
};

export const models: Model[] = [
  {
    slug: "roadster",
    name: "Roadster",
    tagline: "The quickest car in the world.",
    specs: [
      { label: "0-60 mph", value: "0.81s" },
      { label: "Top speed", value: "230+ mph" },
      { label: "Range", value: "~300 mi" },
    ],
    heroImage: "/roadster/Roadster-01-Hero-Desktop.avif",
    flagship: true,
  },
];

export function getModel(slug: string): Model | undefined {
  return models.find((m) => m.slug === slug);
}

// ─── ACTIVE CAR MODELS DATA ───
export type Trim = {
  name: string;
  range: string;
  acceleration: string;
  topSpeed?: string;
  price?: string;
};

export type CarModel = {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  trims: Trim[];
  sections: {
    title: string;
    description: string;
    image?: string;
    eyebrow: string;
  }[];
  specsList: { label: string; value: string }[];
  gallery: string[];
};

export const carModels: CarModel[] = [
  {
    slug: "roadster",
    name: "Roadster",
    tagline: "The quickest car in the world.",
    heroImage: "/roadster/Roadster-02-Pilot-Desktop.avif",
    trims: [
      { name: "Performance", range: "300 mi", acceleration: "0.81 s", topSpeed: "230+ mph" },
      { name: "Thrust", range: "300 mi", acceleration: "0.8 s", topSpeed: "250+ mph" },
    ],
    sections: [],
    specsList: [],
    gallery: []
  },
  {
    slug: "model-3",
    name: "Model 3",
    tagline: "Sport Sedan",
    heroImage: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Model-3-Desktop-LHD-v2.jpg",
    trims: [
      { name: "Standard", range: "321 mi", acceleration: "5.8 s", price: "$38,990" },
      { name: "Premium", range: "363 mi", acceleration: "4.2 s" },
      { name: "Performance", range: "296 mi", acceleration: "2.9 s" },
    ],
    sections: [],
    specsList: [],
    gallery: []
  },
  {
    slug: "model-y",
    name: "Model Y",
    tagline: "Electric Midsize SUV",
    heroImage: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Premium-Hero-Desktop-NA.jpg",
    trims: [
      { name: "Standard", range: "321 mi", acceleration: "6.8 s", topSpeed: "RWD", price: "$44,990" },
      { name: "Premium", range: "327 mi", acceleration: "4.3 s", topSpeed: "AWD", price: "$48,990" },
      { name: "Performance", range: "306 mi", acceleration: "3.3 s", topSpeed: "AWD", price: "$54,990" },
      { name: "L Premium", range: "332 mi", acceleration: "4.4 s", topSpeed: "AWD", price: "$61,990" },
    ],
    sections: [],
    specsList: [],
    gallery: []
  },
  {
    slug: "cybertruck",
    name: "Cybertruck",
    tagline: "Built for the future.",
    heroImage: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Cybertruck-Hero-Desktop-NA-SA-APAC.png",
    trims: [
      { name: "Cyberbeast", range: "320 miles", acceleration: "2.6 s", topSpeed: "130 mph" },
      { name: "Premium AWD", range: "325 miles", acceleration: "4.1 s", topSpeed: "112 mph" },
      { name: "Dual Motor AWD", range: "325 miles", acceleration: "4.1 s", topSpeed: "112 mph" },
    ],
    sections: [],
    specsList: [],
    gallery: []
  },
];

export function getCarModel(slug: string): CarModel | undefined {
  return carModels.find((m) => m.slug === slug);
}