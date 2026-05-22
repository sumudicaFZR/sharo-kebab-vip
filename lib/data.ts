import type { Business, Customer, MenuItem, Offer, Reward } from "@/lib/types";

export const business: Business = {
  id: "11111111-1111-4111-8111-111111111111",
  name: "SHARO KEBAB",
  slug: "sharo-kebab",
  address: "Bulevardul Pache Protopopescu 101, Bucuresti",
  phone: "+40 700 000 000",
  whatsapp_number: "40700000000",
  google_review_url: "https://www.google.com/search?q=SHARO+KEBAB+Bulevardul+Pache+Protopopescu+101+Bucuresti",
  logo_url: "/images/sharo-logo-official.png",
  primary_color: "#ff7a1a",
  secondary_color: "#e12d21",
  created_at: new Date().toISOString()
};

export const menuItems: MenuItem[] = [
  ["cheese-pui", "Cheese Pui", "Cheese Kebab", "Pui rumenit, branza topita, sos SHARO si legume crocante.", 29, true, "/images/products/cheese-pui.jpg"],
  ["cheese-vita", "Cheese Vita", "Cheese Kebab", "Vita suculenta, cascaval topit, sos rosu usor picant.", 34, true, "/images/products/cheese-vita.jpg"],
  ["cheese-berbecut", "Cheese Berbecut", "Cheese Kebab", "Berbecut aromat, branza cremoasa si mix fresh.", 36, true, "/images/products/cheese-berbecut.jpg"],
  ["arabeasca-pui", "Arabeasca Pui", "Arabeasca", "Lipie arabeasca presata, pui, cartofi si sosuri echilibrate.", 31, true, "/images/products/arabeasca-pui.jpg"],
  ["arabeasca-vita", "Arabeasca Vita", "Arabeasca", "Vita frageda in lipie presata, textura crocanta si sos intens.", 36, false, "/images/products/arabeasca-pui.jpg"],
  ["arabeasca-berbecut", "Arabeasca Berbecut", "Arabeasca", "Berbecut, condimente calde si lipie crocanta.", 38, false, "/images/products/cheese-berbecut.jpg"],
  ["shaorma-mare-pui", "Shaorma Mare Pui", "Shaorma", "Portie generoasa pentru foame serioasa.", 28, false, "/images/products/cheese-pui.jpg"],
  ["shaorma-mare-vita", "Shaorma Mare Vita", "Shaorma", "Vita, cartofi, salate si sos SHARO.", 33, false, "/images/products/cheese-vita.jpg"],
  ["falafel-cheese", "Falafel Cheese", "Vegetarian", "Falafel crocant cu branza si sos tahini.", 27, false, ""],
  ["crispy-cheese", "Crispy Cheese", "Crispy", "Crispy strips, cheddar si sos dulce-picant.", 30, false, ""],
  ["cartofi-prajiti", "Cartofi Prajiti", "Side", "Cartofi aurii, sare fina, sos optional.", 12, true, ""],
  ["ayran", "Ayran", "Bauturi", "Ayran rece, perfect langa kebab.", 8, true, "/images/products/ayran.jpg"],
  ["baclava-cu-lapte", "Baclava cu Lapte", "Desert", "Desert rece, cremos, cu fistic si lapte.", 17, true, "/images/products/baclava.jpg"]
].map(([id, name, category, description, price, is_featured, image_url]) => ({
  id: String(id),
  business_id: business.id,
  name: String(name),
  category: String(category),
  description: String(description),
  price: Number(price),
  image_url: String(image_url),
  is_featured: Boolean(is_featured),
  created_at: new Date().toISOString()
}));

export const offers: Offer[] = [
  {
    id: "offer-today",
    business_id: business.id,
    title: "Oferta zilei: 2 Arabeasca Pui + Ayran",
    description: "Ia doua Arabeasca Pui si primesti Ayran rece din partea casei intre 14:00 si 17:00.",
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 86400000).toISOString(),
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: "offer-night",
    business_id: business.id,
    title: "Late night Cheese",
    description: "Dupa 21:00, Cheese Pui vine cu extra sos SHARO inclus.",
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 7 * 86400000).toISOString(),
    active: true,
    created_at: new Date().toISOString()
  }
];

export const customers: Customer[] = [
  {
    id: "c1",
    business_id: business.id,
    name: "Andrei Pop",
    phone: "+40722111222",
    referral_code: "SHARO-ANDREI",
    referred_by: null,
    total_points: 8,
    total_visits: 8,
    created_at: "2026-05-02T10:00:00Z",
    last_visit_at: "2026-05-19T18:20:00Z"
  },
  {
    id: "c2",
    business_id: business.id,
    name: "Ioana M.",
    phone: "+40733111333",
    referral_code: "SHARO-IOANA",
    referred_by: "SHARO-ANDREI",
    total_points: 4,
    total_visits: 4,
    created_at: "2026-05-05T12:00:00Z",
    last_visit_at: "2026-05-18T12:15:00Z"
  },
  {
    id: "c3",
    business_id: business.id,
    name: "Mihai Office",
    phone: "+40744111444",
    referral_code: "SHARO-MIHAI",
    referred_by: null,
    total_points: 11,
    total_visits: 11,
    created_at: "2026-04-28T09:00:00Z",
    last_visit_at: "2026-05-20T11:50:00Z"
  }
];

export const rewards: Reward[] = [
  {
    id: "r1",
    business_id: business.id,
    customer_id: "c1",
    reward_name: "Ayran sau cartofi gratis",
    points_required: 5,
    status: "available",
    claimed_at: null,
    created_at: "2026-05-10T10:00:00Z"
  },
  {
    id: "r2",
    business_id: business.id,
    customer_id: "c3",
    reward_name: "Cheese Kebab gratuit",
    points_required: 10,
    status: "available",
    claimed_at: null,
    created_at: "2026-05-18T10:00:00Z"
  }
];

export const analytics = {
  totalCustomers: 384,
  totalScans: 1287,
  totalVisits: 642,
  activeCustomers: 119,
  rewardsClaimed: 73,
  reviewClicks: 188,
  whatsappClicks: 276,
  returningCustomers: 41,
  bestHours: [
    { hour: "12:00", scans: 92, visits: 44 },
    { hour: "14:00", scans: 128, visits: 63 },
    { hour: "18:00", scans: 151, visits: 82 },
    { hour: "21:00", scans: 184, visits: 97 },
    { hour: "23:00", scans: 89, visits: 48 }
  ],
  topProducts: [
    { name: "Cheese Pui", clicks: 224 },
    { name: "Arabeasca Pui", clicks: 197 },
    { name: "Ayran", clicks: 121 },
    { name: "Baclava cu Lapte", clicks: 84 }
  ]
};

export function getWhatsAppUrl(message = "Salut SHARO KEBAB, vreau sa comand:") {
  return `https://wa.me/${business.whatsapp_number}?text=${encodeURIComponent(message)}`;
}
