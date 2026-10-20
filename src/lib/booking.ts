import { fleet, type VehicleType } from "./data";

export const serviceOptions = [
  { id: "airport", label: "Airport transfer", hint: "LAX · Burbank · Van Nuys · FBO" },
  { id: "point", label: "Point to point", hint: "Home, office, hotel or venue" },
  { id: "hourly", label: "Hourly (as directed)", hint: "Chauffeur on standby" },
  { id: "event", label: "Concert / sports event", hint: "SoFi · Intuit Dome · Forum · Arena" },
  { id: "corporate", label: "Corporate / roadshow", hint: "Multi-stop & multi-vehicle" },
] as const;

export type ServiceId = (typeof serviceOptions)[number]["id"];

export const extraOptions = [
  { id: "meet", label: "Meet & greet at arrivals" },
  { id: "childseat", label: "Child / booster seat" },
  { id: "water", label: "Water & refreshments" },
  { id: "wait", label: "Extended wait time" },
  { id: "return", label: "Return pickup later" },
] as const;

export interface BookingDraft {
  service: ServiceId;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: number;
  hours: number;
  flight: string;
  roundTrip: boolean;
  vehicle: VehicleType | "";
  name: string;
  company: string;
  phone: string;
  email: string;
  notes: string;
  extras: string[];
}

export const emptyDraft: BookingDraft = {
  service: "point",
  pickup: "",
  dropoff: "",
  date: "",
  time: "",
  passengers: 2,
  hours: 4,
  flight: "",
  roundTrip: false,
  vehicle: "",
  name: "",
  company: "",
  phone: "",
  email: "",
  notes: "",
  extras: [],
};

const KEY = "winn-booking-draft";

export function loadDraft(): Partial<BookingDraft> | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Partial<BookingDraft>) : null;
  } catch {
    return null;
  }
}

export function saveDraft(draft: Partial<BookingDraft>) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(draft));
  } catch {
    /* storage unavailable — the wizard still works, it just can't resume */
  }
}

export function clearDraft() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export type Errors = Partial<Record<keyof BookingDraft, string>>;

/** Today's date as YYYY-MM-DD in the visitor's own timezone (toISOString would give the UTC date). */
export function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function makeRef(): string {
  const rand = Math.random().toString(36).slice(2, 4).toUpperCase();
  return `WL-${Date.now().toString(36).slice(-5).toUpperCase()}${rand}`;
}

export function validateTrip(d: BookingDraft): Errors {
  const e: Errors = {};
  if (!d.pickup.trim()) e.pickup = "Where should we pick you up?";
  if (d.service !== "hourly" && !d.dropoff.trim()) e.dropoff = "Where are you headed?";
  if (!d.date) e.date = "Choose a date";
  else if (d.date < todayLocal()) e.date = "Date can't be in the past";
  if (!d.time) e.time = "Choose a pickup time";
  if (d.passengers < 1) e.passengers = "At least 1 passenger";
  return e;
}

export function validateVehicle(d: BookingDraft): Errors {
  const e: Errors = {};
  if (!d.vehicle) e.vehicle = "Select a vehicle to continue";
  else {
    const v = fleet.find((f) => f.id === d.vehicle);
    if (v && d.passengers > v.passengers) e.vehicle = `${v.name} seats up to ${v.passengers}. Pick a larger vehicle.`;
  }
  return e;
}

export function validateContact(d: BookingDraft): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = "Please enter your full name";
  if (d.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid phone number";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Enter a valid email address";
  return e;
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

export function formatTime(t: string): string {
  if (!t) return "—";
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function buildMailto(to: string, d: BookingDraft, ref: string): string {
  const v = fleet.find((f) => f.id === d.vehicle);
  const svc = serviceOptions.find((s) => s.id === d.service)?.label ?? d.service;
  const lines = [
    `Booking request ${ref}`,
    "",
    `Service: ${svc}${d.roundTrip ? " (round trip)" : ""}`,
    `Pickup: ${d.pickup}`,
    d.service !== "hourly" ? `Drop-off: ${d.dropoff}` : `Hours: ${d.hours}`,
    `Date: ${formatDate(d.date)} at ${formatTime(d.time)}`,
    d.flight ? `Flight: ${d.flight}` : "",
    `Passengers: ${d.passengers}`,
    `Vehicle: ${v ? `${v.name} (${v.model})` : "—"}`,
    d.extras.length ? `Extras: ${d.extras.join(", ")}` : "",
    "",
    `Name: ${d.name}`,
    d.company ? `Company: ${d.company}` : "",
    `Phone: ${d.phone}`,
    `Email: ${d.email}`,
    d.notes ? `Notes: ${d.notes}` : "",
  ].filter((l) => l !== "");
  return `mailto:${to}?subject=${encodeURIComponent(`Booking request ${ref}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
