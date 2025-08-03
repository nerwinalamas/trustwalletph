import { Category } from "@/app/(quick-actions)/pay";
import { Company } from "@/app/(quick-actions)/pay/[categoryId]";

export const categories: Category[] = [
  { id: "Electric", name: "Electric", icon: "flash", color: "#f59e0b" },
  { id: "Water", name: "Water", icon: "water", color: "#3b82f6" },
  { id: "Internet", name: "Cable/Internet", icon: "wifi", color: "#10b981" },
  { id: "Schools", name: "Schools", icon: "school", color: "#8b5cf6" },
];

export const companiesData: Record<string, Company[]> = {
  Electric: [
    {
      id: "meralco",
      name: "Manila Electric Company (MERALCO)",
      type: "Electric",
    },
    { id: "davao", name: "Davao Light & Power Co.", type: "Electric" },
    { id: "visayan", name: "Visayan Electric Company", type: "Electric" },
    {
      id: "cagayan",
      name: "Cagayan Electric Power & Light Co.",
      type: "Electric",
    },
  ],
  Water: [
    { id: "manila_water", name: "Manila Water Company", type: "Water" },
    { id: "maynilad", name: "Maynilad Water Services", type: "Water" },
    { id: "laguna_water", name: "Laguna Water District", type: "Water" },
    { id: "cebu_water", name: "Cebu Water District", type: "Water" },
  ],
  Internet: [
    { id: "pldt", name: "PLDT", type: "Internet" },
    { id: "globe", name: "Globe Telecom", type: "Internet" },
    { id: "converge", name: "Converge ICT", type: "Internet" },
    { id: "sky", name: "Sky Cable", type: "Internet" },
  ],
  Schools: [
    { id: "up", name: "University of the Philippines", type: "School" },
    { id: "ust", name: "University of Santo Tomas", type: "School" },
    { id: "dlsu", name: "De La Salle University", type: "School" },
    { id: "ateneo", name: "Ateneo de Manila University", type: "School" },
  ],
};

export const companyDetails: Record<
  string,
  { name: string; type: string; icon: string; color: string }
> = {
  meralco: {
    name: "Manila Electric Company (MERALCO)",
    type: "Electric",
    icon: "flash",
    color: "#f59e0b",
  },
  davao: {
    name: "Davao Light & Power Co.",
    type: "Electric",
    icon: "flash",
    color: "#f59e0b",
  },
  manila_water: {
    name: "Manila Water Company",
    type: "Water",
    icon: "water",
    color: "#3b82f6",
  },
  maynilad: {
    name: "Maynilad Water Services",
    type: "Water",
    icon: "water",
    color: "#3b82f6",
  },
  pldt: { name: "PLDT", type: "Internet", icon: "wifi", color: "#10b981" },
  globe: {
    name: "Globe Telecom",
    type: "Internet",
    icon: "wifi",
    color: "#10b981",
  },
  up: {
    name: "University of the Philippines",
    type: "School",
    icon: "school",
    color: "#8b5cf6",
  },
  ust: {
    name: "University of Santo Tomas",
    type: "School",
    icon: "school",
    color: "#8b5cf6",
  },
};
