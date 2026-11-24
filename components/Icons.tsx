/** Simple line icons (24×24, stroke = currentColor). Used instead of emoji for a cleaner, professional look. */
const P: Record<string, string> = {
  briefcase: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z",
  home: "M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5",
  heart: "M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  shieldCheck: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10ZM9 12l2 2 4-4",
  lock: "M5 11h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1ZM8 11V7a4 4 0 0 1 8 0v4",
  badge: "M12 2l2.4 1.8 3-.2.9 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.9 2.9-3-.2L12 22l-2.4-1.8-3 .2-.9-2.9-2.5-1.7 1-2.8-1-2.8 2.5-1.7.9-2.9 3 .2ZM9 12l2 2 4-4",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M20 6 9 17l-5-5",
  gift: "M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7ZM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7Z",
  wallet: "M20 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v4a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5",
  scale: "M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0ZM19 7l-3 7a3 3 0 0 0 6 0ZM12 3a1 1 0 1 1 0 0",
  landmark: "M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l9 5H3Z",
  hardhat: "M2 18h20M4 18v-3a8 8 0 0 1 16 0v3M10 7V4h4v3M10 7a8 8 0 0 0-3 1M14 7a8 8 0 0 1 3 1",
  bank: "M3 21h18M4 10h16M12 3l9 5H3ZM6 10v8M10 10v8M14 10v8M18 10v8",
  gavel: "M14 13 4 23M8.5 8.5l7 7M12 5l7 7M10 7l7 7M15 3l6 6M2 21h8",
  stethoscope: "M5 3v6a5 5 0 0 0 10 0V3M10 14v2a5 5 0 0 0 10 0v-2M20 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  cap: "M22 10 12 5 2 10l10 5 10-5ZM6 12v5c3 2 9 2 12 0v-5M22 10v6",
  train: "M8 3h8a4 4 0 0 1 4 4v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a4 4 0 0 1 4-4ZM4 11h16M12 3v8M8 22l2-4M16 22l-2-4M8 15h.01M16 15h.01",
  box: "M21 8 12 3 3 8v8l9 5 9-5ZM3 8l9 5 9-5M12 13v8",
  monitor: "M3 4h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1ZM8 21h8M12 17v4",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  compass: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3Z",
  hospital: "M12 6v4M10 8h4M3 21V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14M2 21h20M9 21v-5h6v5",
  smartphone: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM12 18h.01",
  bag: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0",
  coffee: "M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4ZM6 2v2M10 2v2M14 2v2",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8ZM14 2v6h6M8 13h8M8 17h5",
  form: "M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1ZM16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M8 12h8M8 16h5",
  send: "M22 2 11 13M22 2l-7 20-4-9-9-4Z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
  star: "M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2",
  mapPin: "M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12ZM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20",
  ban: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM5 5l14 14",
  mail: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM2 6l10 7 10-7",
  chat: "M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12Z",
  plus: "M12 5v14M5 12h14",
};
export type IconName = keyof typeof P;
export function Icon({ name, className = "h-5 w-5", strokeWidth = 1.75 }: { name: string; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden focusable="false">
      <path d={P[name] ?? P.check} />
    </svg>
  );
}
/** Icon for each field category id in lib/data CATEGORIES. */
export const CATEGORY_ICON: Record<string, string> = {
  admin: "landmark", eng: "hardhat", fin: "bank", def: "shield", legal: "scale", health: "stethoscope",
  edu: "cap", rail: "train", proc: "box", it: "monitor", hr: "users", consult: "compass",
};
