import { business } from "@/lib/data";
import { createReferralCode, normalizeRomanianPhone } from "@/lib/validation";

type MockCustomer = {
  id: string;
  name: string;
  phone: string;
  referralCode: string;
  totalPoints: number;
  totalVisits: number;
  lastStampAt: number | null;
};

type MockStaffToken = {
  id: string;
  token: string;
  active: boolean;
  expiresAt: number | null;
  createdAt: number;
  createdBy: string;
};

type MockStampEvent = {
  id: string;
  customerId: string | null;
  phone: string;
  tokenId: string | null;
  ok: boolean;
  reason: string;
  createdAt: number;
};

type MockStore = {
  customers: Map<string, MockCustomer>;
  staffTokens: MockStaffToken[];
  stampEvents: MockStampEvent[];
};

const globalStore = globalThis as typeof globalThis & { __sharoMockStore?: MockStore };

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function getMockStore() {
  if (!globalStore.__sharoMockStore) {
    const token = randomToken();
    globalStore.__sharoMockStore = {
      customers: new Map(),
      staffTokens: [
        {
          id: "mock-token-1",
          token,
          active: true,
          expiresAt: null,
          createdAt: Date.now(),
          createdBy: "mock-admin"
        }
      ],
      stampEvents: []
    };
  }
  return globalStore.__sharoMockStore;
}

export function upsertMockCustomer(name: string, phone: string, referral?: string | null) {
  const store = getMockStore();
  const normalized = normalizeRomanianPhone(phone);
  const existing = store.customers.get(normalized);
  if (existing) return existing;

  const customer: MockCustomer = {
    id: crypto.randomUUID(),
    name,
    phone: normalized,
    referralCode: referral || createReferralCode(name),
    totalPoints: 0,
    totalVisits: 0,
    lastStampAt: null
  };
  store.customers.set(normalized, customer);
  return customer;
}

export function getActiveMockStaffToken() {
  const store = getMockStore();
  return store.staffTokens.find((token) => token.active && (!token.expiresAt || token.expiresAt > Date.now())) || null;
}

export function rotateMockStaffToken(expiresAt: number | null) {
  const store = getMockStore();
  store.staffTokens.forEach((token) => {
    token.active = false;
  });
  const next: MockStaffToken = {
    id: crypto.randomUUID(),
    token: randomToken(),
    active: true,
    expiresAt,
    createdAt: Date.now(),
    createdBy: "mock-admin"
  };
  store.staffTokens.unshift(next);
  return next;
}

export function validateMockStaffToken(token: string) {
  const store = getMockStore();
  const found = store.staffTokens.find((item) => item.token === token);
  if (!found) return { ok: false as const, reason: "invalid", token: null };
  if (!found.active) return { ok: false as const, reason: "inactive", token: found };
  if (found.expiresAt && found.expiresAt <= Date.now()) return { ok: false as const, reason: "expired", token: found };
  return { ok: true as const, reason: "ok", token: found };
}

export function logMockStampEvent(event: Omit<MockStampEvent, "id" | "createdAt">) {
  const store = getMockStore();
  store.stampEvents.unshift({ ...event, id: crypto.randomUUID(), createdAt: Date.now() });
  store.stampEvents = store.stampEvents.slice(0, 30);
}

export function getMockStaffEvents() {
  const store = getMockStore();
  return store.stampEvents.map((event) => ({
    ...event,
    business_id: business.id,
    created_at: new Date(event.createdAt).toISOString()
  }));
}
