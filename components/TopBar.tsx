"use client";

import {
  Menu,
  X,
  Search,
  Bell,
  HelpCircle,
  Settings,
  User,
} from "lucide-react";

import { useSidebar } from "@/contexts/sidebar.context";

export default function TopBar() {
  const {
    open,
    toggleSidebar,
  } = useSidebar();

  return (
    <header className="bg-white border-b border-border h-14 flex items-center px-6 gap-4">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Hamburger */}
        <button
          onClick={toggleSidebar}
          className="
            p-1
            hover:bg-secondary
            rounded
            transition-colors
            lg:hidden
          "
        >
          {open ? (
            <X className="w-5 h-5 text-foreground" />
          ) : (
            <Menu className="w-5 h-5 text-foreground" />
          )}
        </button>

        <div className="text-sm font-medium text-foreground">
          Your work
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 ml-4">
          <NavLink label="Projects" />
          <NavLink label="Filters" />
          <NavLink label="Dashboards" />
          <NavLink label="Teams" />
          <NavLink label="Apps" />
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-end gap-4">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-secondary px-3 py-2 rounded flex-1 max-w-xs">
          <Search className="w-4 h-4 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-sm outline-none w-full placeholder-muted-foreground"
          />
        </div>

        {/* Create Button */}
        <button className="hidden sm:block px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-blue-800 transition-colors">
          Create
        </button>

        {/* Icons */}
        <button className="p-1 hover:bg-secondary rounded transition-colors relative">
          <Bell className="w-5 h-5 text-foreground" />

          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="hidden sm:block p-1 hover:bg-secondary rounded transition-colors">
          <HelpCircle className="w-5 h-5 text-foreground" />
        </button>

        <button className="hidden sm:block p-1 hover:bg-secondary rounded transition-colors">
          <Settings className="w-5 h-5 text-foreground" />
        </button>

        <button className="p-1 hover:bg-secondary rounded transition-colors">
          <User className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </header>
  );
}

function NavLink({
  label,
}: {
  label: string;
}) {
  return (
    <a
      href="#"
      className="text-sm text-foreground hover:text-primary transition-colors"
    >
      {label}
    </a>
  );
}