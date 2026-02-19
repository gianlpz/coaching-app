"use client";

import { createContext, useContext } from "react";
import { useDemoData } from "@/hooks/useDemoData";

type DemoDataContextType = ReturnType<typeof useDemoData>;

const DemoDataContext = createContext<DemoDataContextType>(null);

export function DemoDataProvider({
  isDemoMode,
  children,
}: {
  isDemoMode: boolean;
  children: React.ReactNode;
}) {
  const demoData = useDemoData(isDemoMode);

  return (
    <DemoDataContext.Provider value={demoData}>
      {children}
    </DemoDataContext.Provider>
  );
}

export function useDemoContext() {
  return useContext(DemoDataContext);
}
