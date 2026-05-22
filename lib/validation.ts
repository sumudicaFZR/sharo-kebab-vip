export function normalizeRomanianPhone(phone: string) {
  const cleaned = phone.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+40")) return cleaned;
  if (cleaned.startsWith("0040")) return `+${cleaned.slice(2)}`;
  if (cleaned.startsWith("07")) return `+4${cleaned}`;
  return cleaned;
}

export function isValidRomanianPhone(phone: string) {
  return /^\+407\d{8}$/.test(normalizeRomanianPhone(phone));
}

export function createReferralCode(name: string) {
  const clean = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 8)
    .toUpperCase();
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SHARO-${clean || "VIP"}-${suffix}`;
}
