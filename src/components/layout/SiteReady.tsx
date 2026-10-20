"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface SiteReadyValue {
  /** True once the opening loading screen has finished and the page is being revealed. */
  ready: boolean;
  markReady: () => void;
}

const SiteReadyContext = createContext<SiteReadyValue>({ ready: true, markReady: () => {} });

export function SiteReadyProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const value = useMemo(() => ({ ready, markReady: () => setReady(true) }), [ready]);
  return <SiteReadyContext.Provider value={value}>{children}</SiteReadyContext.Provider>;
}

export const useSiteReady = () => useContext(SiteReadyContext);
