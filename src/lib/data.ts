/**
 * Single source of truth for site content.
 * Facts (contact details, services, areas, venues, testimonial) come from the original winnlimo.com.
 */

export const company = {
  name: "Winn Limousine",
  short: "Winn Limo",
  tagline: "Corporate Ground Transportation",
  tcp: "19989",
  founded: 1998,
  email: "winnlimo@gmail.com",
  phones: [
    { label: "Toll free", display: "(877) 856-9898", href: "tel:+18778569898" },
    { label: "Direct", display: "(818) 332-8809", href: "tel:+18183328809" },
  ],
  address: {
    street: "12400 Ventura Blvd, Suite 245",
    city: "Studio City",
    state: "CA",
    zip: "91604",
  },
  portal: {
    register: "https://book.mylimobiz.com/v4/hollywoodstars/Account/Registration",
    login: "https://book.mylimobiz.com/v4/hollywoodstars/Account/LoginNow",
  },
  socials: [
    { id: "facebook", label: "Facebook", href: "https://www.facebook.com/winnlimo/" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/winn-limo-service" },
    { id: "x", label: "X (Twitter)", href: "https://twitter.com/winnlimo" },
    {
      id: "yelp",
      label: "Yelp",
      href: "https://www.yelp.com/biz/winn-limousine-corporate-transportation-los-angeles",
    },
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Fleet" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type ServiceIcon =
  | "briefcase"
  | "clock"
  | "trending"
  | "bus"
  | "user"
  | "plane"
  | "music"
  | "trophy";

export interface Service {
  id: string;
  title: string;
  icon: ServiceIcon;
  blurb: string;
  detail: string;
  points: string[];
}

export const services: Service[] = [
  {
    id: "corporate",
    title: "Corporate Travel",
    icon: "briefcase",
    blurb: "Executive sedans, SUVs, Sprinters and mini coaches for every business travel need.",
    detail:
      "The ultimate corporate transportation solution, with a diverse fleet of black sedans, executive SUVs, Mercedes Sprinters and mini coaches for all of your executive and personal chauffeured ground travel.",
    points: ["Corporate accounts", "Competitive business rates", "Easy billing"],
  },
  {
    id: "hourly",
    title: "Hourly (As Directed)",
    icon: "clock",
    blurb: "Your chauffeur and vehicle on standby for as long as your day requires.",
    detail:
      "A reliable corporate transportation provider for yourself, colleagues, associates or employees. All late-model vehicles, corporate accounts, business rates and hourly flat rates.",
    points: ["Hourly flat rates", "Multiple stops", "Late-model vehicles"],
  },
  {
    id: "roadshows",
    title: "Financial Roadshows",
    icon: "trending",
    blurb: "Stress-free, perfectly timed ground logistics for executives and clients.",
    detail:
      "We make sure your executives and clients arrive on time for their meetings. Our team plans your day in advance to deliver a seamless, stress-free roadshow anywhere in southern California.",
    points: ["Itinerary planning", "On-time arrivals", "Multi-vehicle coordination"],
  },
  {
    id: "airport",
    title: "Airport Transfers",
    icon: "plane",
    blurb: "On-time pickups and drop-offs at major and private airports.",
    detail:
      "Whether you are travelling to or arriving at any of southern California's major or private airports, count on on-time service, a late-model vehicle and a professional chauffeur at competitive rates. FBO transfers included.",
    points: ["LAX · Burbank · Van Nuys", "FBO / private aviation", "24/7 availability"],
  },
  {
    id: "shuttle",
    title: "Mercedes Shuttle & Sprinter",
    icon: "bus",
    blurb: "Mini coaches and executive vans that move any group size together.",
    detail:
      "A complete fleet of mini coaches and Mercedes Sprinter executive vans, capable of accommodating any group size for business or private events — at some of the lowest rates in the region.",
    points: ["Any group size", "Executive Sprinter vans", "Events & conferences"],
  },
  {
    id: "private",
    title: "Private Chauffeur",
    icon: "user",
    blurb: "Reliable, professional and affordable private black car service.",
    detail:
      "If you are looking for a reliable, professional and affordable private chauffeured ground transportation service, look no further. Ask about our current deals and special offers.",
    points: ["Dedicated chauffeur", "Leisure & personal travel", "Special offers"],
  },
  {
    id: "entertainment",
    title: "V.I.P. Entertainment",
    icon: "music",
    blurb: "Concerts, premieres and nights out — arrive in absolute style.",
    detail:
      "V.I.P. entertainment ground transportation for music events, premieres and private nights out, with discreet professional chauffeurs and all-black late-model vehicles.",
    points: ["Music events", "Premieres & galas", "Discreet service"],
  },
  {
    id: "sports",
    title: "Sports Events",
    icon: "trophy",
    blurb: "Game-day chauffeur service to LA's biggest stadiums and arenas.",
    detail:
      "Skip the parking and traffic. Chauffeured transportation to Rams and Chargers games, SoFi Stadium, Intuit Dome, Kia Forum and Crypto.com Arena.",
    points: ["Stadium drop-off", "Group transfers", "Round-trip service"],
  },
];

/* ------------------------------------------------------------------ */
/* Fleet                                                               */
/* ------------------------------------------------------------------ */

export type VehicleType = "sedan" | "suv" | "van" | "coach";

export interface Vehicle {
  id: VehicleType;
  name: string;
  model: string;
  tagline: string;
  description: string;
  passengers: number;
  bags: number;
  features: string[];
  bestFor: string[];
}

/** Capacities are typical for each vehicle class — confirm against the live fleet. */
export const fleet: Vehicle[] = [
  {
    id: "sedan",
    name: "Executive Sedan",
    model: "Mercedes-Benz S-Class · Cadillac XTS",
    tagline: "Quiet, composed, impeccably presented.",
    description:
      "Our all-black executive sedans are the benchmark for corporate arrivals, airport transfers and private evenings — a calm cabin and a chauffeur who is always one step ahead.",
    passengers: 3,
    bags: 3,
    features: ["Leather interior", "Climate control", "Complimentary water", "Phone chargers"],
    bestFor: ["Airport transfers", "Executive travel", "Private evenings"],
  },
  {
    id: "suv",
    name: "Luxury SUV",
    model: "Cadillac Escalade",
    tagline: "Commanding presence, room for the whole team.",
    description:
      "The Cadillac Escalade pairs generous space with an unmistakable arrival — ideal for small groups, extra luggage and VIP guests who want comfort and presence.",
    passengers: 6,
    bags: 6,
    features: ["Spacious leather seating", "Rear climate zone", "Generous luggage space", "Phone chargers"],
    bestFor: ["Small groups", "Roadshows", "Concerts & events"],
  },
  {
    id: "van",
    name: "Executive Van",
    model: "Mercedes-Benz Sprinter",
    tagline: "One vehicle. The whole group. Arriving together.",
    description:
      "Mercedes Sprinter executive vans keep larger parties together in comfort, with room to stand, stretch and work — made for conferences, wine country days and game-day transfers.",
    passengers: 12,
    bags: 12,
    features: ["Executive seating", "Standing-height cabin", "Ample luggage room", "Climate control"],
    bestFor: ["Corporate groups", "Sports events", "Airport group transfers"],
  },
  {
    id: "coach",
    name: "Mini Coach",
    model: "Mercedes Shuttle",
    tagline: "Move a crowd without losing the premium feel.",
    description:
      "When the group gets big, our Mercedes shuttle mini coaches carry everyone at some of the lowest rates in the region — still chauffeured, still on time.",
    passengers: 28,
    bags: 28,
    features: ["Large-group seating", "Overhead & under-floor storage", "Climate control", "Professional driver"],
    bestFor: ["Conferences", "Weddings & events", "Large group shuttles"],
  },
];

/* ------------------------------------------------------------------ */
/* Coverage                                                            */
/* ------------------------------------------------------------------ */

export const serviceAreas = [
  "Beverly Hills",
  "Bel Air",
  "Brentwood",
  "Santa Monica",
  "Venice",
  "Marina Del Rey",
  "Playa Vista",
  "Playa Del Rey",
  "Malibu",
  "Manhattan Beach",
  "Hermosa Beach",
  "Redondo Beach",
  "Hollywood",
  "Universal City",
  "Studio City",
  "Sherman Oaks",
  "Burbank",
  "Van Nuys",
  "Encino",
  "Woodland Hills",
  "West Hills",
  "Calabasas",
  "Westlake Village",
  "Thousand Oaks",
] as const;

export const airports = [
  { code: "LAX", name: "Los Angeles International", note: "Terminal curbside & arrivals pickup" },
  { code: "BUR", name: "Hollywood Burbank Airport", note: "Convenient for the Valley & Hollywood" },
  { code: "VNY", name: "Van Nuys Airport", note: "FBO & private aviation transfers" },
] as const;

export const venues = [
  { name: "SoFi Stadium", kind: "NFL · Concerts" },
  { name: "Intuit Dome", kind: "NBA · Live events" },
  { name: "Kia Forum", kind: "Concerts" },
  { name: "Crypto.com Arena", kind: "NBA · NHL · Concerts" },
  { name: "Rams Games", kind: "NFL" },
  { name: "Chargers Games", kind: "NFL" },
] as const;

/* ------------------------------------------------------------------ */
/* Social proof & FAQs                                                 */
/* ------------------------------------------------------------------ */

export const testimonial = {
  quote:
    "Just a note to let you know we were VERY PLEASED with our service from Winn Limo, and Serge in particular, on Friday. Thank you very much and be sure — when we don't want to drive, we'll be calling.",
  author: "Rabbi Stephen Julius Stein",
};

export const faqs = [
  {
    q: "How far in advance should I book?",
    a: "As early as you can — especially for events, holidays and multi-vehicle trips. For same-day or last-minute needs, call dispatch and we'll do everything we can to help, 24/7.",
  },
  {
    q: "Do you offer corporate accounts?",
    a: "Yes. We offer corporate accounts with competitive business rates and easy billing. Call us or use the client portal to set one up.",
  },
  {
    q: "How is pricing determined?",
    a: "We offer very competitive rates for the quality of service. Point-to-point and airport trips are quoted by route, while hourly (as directed) service uses flat hourly rates. Request a quote and we'll respond quickly.",
  },
  {
    q: "Which airports and venues do you serve?",
    a: "LAX, Hollywood Burbank and Van Nuys (including FBO and private aviation), plus SoFi Stadium, Intuit Dome, Kia Forum, Crypto.com Arena and more across southern California.",
  },
  {
    q: "Can you handle large groups?",
    a: "Absolutely. Our Mercedes Sprinter executive vans and shuttle mini coaches accommodate any group size for business or private events.",
  },
  {
    q: "Are you licensed?",
    a: "Winn Limousine operates under TCP# 19989 and has served Los Angeles since 1998. We're also a proud member of the Los Angeles Business Travel Association (LABTA).",
  },
];

export const process = [
  {
    title: "Request",
    text: "Book online in under two minutes, or call dispatch at any hour. Tell us where, when and how many.",
  },
  {
    title: "Confirm",
    text: "We match the right vehicle and a professional chauffeur, then confirm every detail with you.",
  },
  {
    title: "Ride",
    text: "Your chauffeur arrives early, in a late-model, all-black vehicle. You relax — or get work done.",
  },
  {
    title: "Settle",
    text: "Easy billing and corporate accounts mean no receipts, no hassle, no surprises.",
  },
];

export const promises = [
  { title: "Competitive business rates", text: "The most competitive rates in southern California for this quality of service." },
  { title: "24/7 service", text: "Dispatch is available around the clock — early flights, late events, last-minute changes." },
  { title: "Professional chauffeurs", text: "Well-trained, courteous drivers who know Los Angeles and respect your time." },
  { title: "Easy billing", text: "Corporate accounts and clear invoicing that keep your finance team happy." },
];

export const formatAddress = () =>
  `${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}`;
