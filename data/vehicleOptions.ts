// data/vehicleOptions.ts
// Configuration options for every model, keyed by slug.
// Verify prices at tesla.com/[model]/design before launch.

export type Option = {
  id: string;
  name: string;
  price: number;
  color?: string;
};

export type OptionGroup = {
  id: string;
  name: string;
  choices: Option[];
};

export const VEHICLE_OPTIONS: Record<string, OptionGroup[]> = {
  "roadster": [
    {
      id: "paint",
      name: "Exterior Paint",
      choices: [
        { id: "stealth-grey", name: "Stealth Grey", price: 0, color: "#4a4d52" },
        { id: "pearl-white", name: "Pearl White", price: 1500, color: "#edece7" },
        { id: "deep-blue", name: "Deep Blue Metallic", price: 2000, color: "#1e3a5f" },
        { id: "ultra-red", name: "Ultra Red", price: 2500, color: "#8b1a1a" }
      ]
    },
    {
      id: "wheels",
      name: "Wheels",
      choices: [
        { id: "aero", name: "Aero Wheels", price: 0 },
        { id: "sport", name: "Sport Wheels", price: 3500 },
        { id: "carbon", name: "Carbon Aero Wheels", price: 6000 }
      ]
    },
    {
      id: "interior",
      name: "Interior",
      choices: [
        { id: "black", name: "All Black", price: 0 },
        { id: "white", name: "White Premium", price: 2000 }
      ]
    },
    {
      id: "software",
      name: "Software",
      choices: [
        { id: "std", name: "Standard Autopilot", price: 0 },
        { id: "fsd", name: "Full Self-Driving (Supervised)", price: 8000 }
      ]
    }
  ],

  "model-3": [
    {
      id: "paint",
      name: "Exterior Paint",
      choices: [
        { id: "stealth-grey", name: "Stealth Grey", price: 0, color: "#4a4d52" },
        { id: "pearl-white", name: "Pearl White Multi-Coat", price: 1500, color: "#edece7" },
        { id: "diamond-black", name: "Diamond Black", price: 1500, color: "#0f0f0f" },
        { id: "marine-blue", name: "Marine Blue", price: 1000, color: "#1e3a5f" },
        { id: "ultra-red", name: "Ultra Red", price: 2000, color: "#8b1a1a" },
        { id: "quicksilver", name: "Quicksilver", price: 2000, color: "#a8a8a8" }
      ]
    },
    {
      id: "wheels",
      name: "Wheels",
      choices: [
        { id: "18-photon", name: "18 Inch Photon Wheels", price: 0 },
        { id: "19-nova", name: "19 Inch Nova Wheels", price: 1500 }
      ]
    },
    {
      id: "interior",
      name: "Interior",
      choices: [
        { id: "black", name: "All Black", price: 0 },
        { id: "black-white", name: "Black and White", price: 1000 }
      ]
    },
    {
      id: "software",
      name: "Software",
      choices: [
        { id: "std", name: "Standard Autopilot", price: 0 },
        { id: "fsd", name: "Full Self-Driving (Supervised)", price: 8000 }
      ]
    }
  ],

  "model-y": [
    {
      id: "paint",
      name: "Exterior Paint",
      choices: [
        { id: "stealth-grey", name: "Stealth Grey", price: 0, color: "#4a4d52" },
        { id: "pearl-white", name: "Pearl White Multi-Coat", price: 1500, color: "#edece7" },
        { id: "diamond-black", name: "Diamond Black", price: 1500, color: "#0f0f0f" },
        { id: "marine-blue", name: "Marine Blue", price: 1000, color: "#1e3a5f" },
        { id: "ultra-red", name: "Ultra Red", price: 2000, color: "#8b1a1a" },
        { id: "quicksilver", name: "Quicksilver", price: 2000, color: "#a8a8a8" }
      ]
    },
    {
      id: "wheels",
      name: "Wheels",
      choices: [
        { id: "19-crossflow", name: "19 Inch Crossflow Wheels", price: 0 },
        { id: "20-induction", name: "20 Inch Induction Wheels", price: 2000 }
      ]
    },
    {
      id: "interior",
      name: "Interior",
      choices: [
        { id: "black", name: "All Black", price: 0 },
        { id: "black-white", name: "Black and White", price: 1000 }
      ]
    },
    {
      id: "seating",
      name: "Seating",
      choices: [
        { id: "5-seat", name: "5 Seats", price: 0 },
        { id: "7-seat", name: "7 Seats", price: 2000 }
      ]
    },
    {
      id: "software",
      name: "Software",
      choices: [
        { id: "std", name: "Standard Autopilot", price: 0 },
        { id: "fsd", name: "Full Self-Driving (Supervised)", price: 8000 }
      ]
    }
  ],

  "cybertruck": [
    {
      id: "finish",
      name: "Exterior Finish",
      choices: [
        { id: "stainless", name: "Stainless Steel", price: 0, color: "#b8b8b8" },
        { id: "satin-black", name: "Satin Black Wrap", price: 6500, color: "#1a1a1a" },
        { id: "satin-white", name: "Satin White Wrap", price: 6500, color: "#ececec" }
      ]
    },
    {
      id: "wheels",
      name: "Wheels and Tires",
      choices: [
        { id: "cyber", name: "20 Inch Cyber Wheels", price: 0 },
        { id: "cyber-at", name: "20 Inch Cyber Wheels with 35 Inch All-Terrain Tires", price: 3500 }
      ]
    },
    {
      id: "interior",
      name: "Interior",
      choices: [
        { id: "black", name: "Black", price: 0 },
        { id: "white", name: "White Decor", price: 2000 }
      ]
    },
    {
      id: "towing",
      name: "Towing",
      choices: [
        { id: "no-hitch", name: "No Hitch", price: 0 },
        { id: "hitch", name: "Tow Hitch", price: 1000 }
      ]
    },
    {
      id: "software",
      name: "Software",
      choices: [
        { id: "std", name: "Standard Autopilot", price: 0 },
        { id: "fsd", name: "Full Self-Driving (Supervised)", price: 8000 }
      ]
    }
  ]
};

export function getVehicleOptions(slug: string): OptionGroup[] {
  return VEHICLE_OPTIONS[slug] || [];
}