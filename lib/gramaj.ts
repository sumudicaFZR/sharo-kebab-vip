import type { ProductGramaj } from "@/lib/types";

export const gramajTemplates: Record<string, ProductGramaj> = {
  shaormaMedie: {
    template: "Shaorma medie",
    total: "450-550g",
    lines: [
      { label: "Lipie", value: "100g" },
      { label: "Carne", value: "150-180g" },
      { label: "Cartofi", value: "100-120g" },
      { label: "Legume/muraturi", value: "80-100g" },
      { label: "Sosuri", value: "50-70g" }
    ]
  },
  shaormaMare: {
    template: "Shaorma mare",
    total: "650-800g",
    lines: [
      { label: "Lipie", value: "120-150g" },
      { label: "Carne", value: "220-250g" },
      { label: "Cartofi", value: "150-180g" },
      { label: "Legume/muraturi", value: "120-150g" },
      { label: "Sosuri", value: "80-100g" }
    ]
  },
  crispyFarfurie: {
    template: "Crispy farfurie",
    total: "550-670g",
    lines: [
      { label: "Crispy pui", value: "220g" },
      { label: "Cartofi", value: "150-180g" },
      { label: "Salata/legume", value: "100-120g" },
      { label: "Sosuri", value: "60-80g" }
    ]
  },
  crispyLipie: {
    template: "Crispy lipie",
    total: "500-600g",
    lines: [
      { label: "Lipie", value: "100-110g" },
      { label: "Crispy pui", value: "150-180g" },
      { label: "Cartofi", value: "100-120g" },
      { label: "Legume/muraturi", value: "80-100g" },
      { label: "Sosuri", value: "60-80g" }
    ]
  },
  arabeasca: {
    template: "Arabeasca pui/vita/berbecut",
    total: "750-900g",
    lines: [
      { label: "Lipii", value: "150-180g" },
      { label: "Carne", value: "230-260g" },
      { label: "Cartofi", value: "80-100g" },
      { label: "Legume/muraturi", value: "150-180g" },
      { label: "Sosuri", value: "90-110g" }
    ]
  },
  falafelFarfurie: {
    template: "Falafel farfurie",
    total: "300-380g",
    lines: [
      { label: "Falafel", value: "150-180g" },
      { label: "Garnituri/salate/sosuri", value: "150-200g" }
    ]
  },
  falafelLipie: {
    template: "Falafel lipie",
    total: "280-370g",
    lines: [
      { label: "Falafel", value: "120-150g" },
      { label: "Lipie", value: "60-80g" },
      { label: "Salata + sosuri", value: "100-150g" }
    ]
  },
  iskender: {
    template: "Iskender kebab",
    total: "400-500g",
    lines: [
      { label: "Carne", value: "150-200g" },
      { label: "Lipie cuburi", value: "100-120g" },
      { label: "Sos rosu", value: "50-70g" },
      { label: "Unt topit", value: "20-30g" },
      { label: "Iaurt", value: "80-100g" }
    ]
  },
  cartofi: {
    template: "Cartofi prajiti",
    total: "180-220g",
    lines: [
      { label: "Cartofi", value: "180-220g" },
      { label: "Sos optional", value: "30-50g" }
    ],
    note: "Estimare pentru side; gramajul final poate varia in functie de portie."
  },
  desert: {
    template: "Desert",
    total: "120-160g",
    lines: [
      { label: "Baclava", value: "90-120g" },
      { label: "Lapte/crema", value: "30-40g" }
    ],
    note: "Estimare pentru desert; gramajul final poate varia in functie de portie."
  },
  bautura: {
    template: "Bautura",
    total: "250ml",
    lines: [{ label: "Ayran", value: "250ml" }],
    note: "Volum estimativ pentru bautura."
  }
};

const gramajByProductId: Record<string, keyof typeof gramajTemplates> = {
  "cheese-pui": "shaormaMedie",
  "cheese-vita": "shaormaMedie",
  "cheese-berbecut": "shaormaMedie",
  "shaorma-mare-pui": "shaormaMare",
  "shaorma-mare-vita": "shaormaMare",
  "arabeasca-pui": "arabeasca",
  "arabeasca-vita": "arabeasca",
  "arabeasca-berbecut": "arabeasca",
  "crispy-farfurie": "crispyFarfurie",
  "crispy-lipie": "crispyLipie",
  aripioare: "crispyFarfurie",
  "falafel-farfurie": "falafelFarfurie",
  "falafel-lipie": "falafelLipie",
  "berbecut-farfurie": "shaormaMare",
  "cartofi-prajiti": "cartofi",
  "baclava-cu-lapte": "desert",
  ayran: "bautura"
};

export function getProductGramaj(productId: string): ProductGramaj {
  const template = gramajByProductId[productId];
  return gramajTemplates[template] ?? gramajTemplates.shaormaMedie;
}
