"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type SidebarContextType = {
  open: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode; }) {
  const [open, setOpen] = useState(true);

  function toggleSidebar() {
    setOpen((prev) => !prev);
  }

  function openSidebar() {
    setOpen(true);
  }

  function closeSidebar() {
    setOpen(false);
  }

  return (
    <SidebarContext.Provider
      value={{
        open,
        toggleSidebar,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context =
    useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "useSidebar must be used inside SidebarProvider"
    );
  }

  return context;
}