"use client";

import { ReactNode } from "react";

import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";

import { useSidebar } from "@/contexts/sidebar.context";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const { open } = useSidebar();

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Navigation */}
      <TopBar />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <main
          className="
            flex-1
            overflow-y-auto
            transition-all
            duration-300
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}