"use client";

import { useSidebar } from "@/contexts/sidebar.context";

import {
  LayoutGrid,
  Clock,
  LayoutList,
  Code,
  FileText,
  Settings,
  Plus,
  X,
} from "lucide-react";

export default function Sidebar() {
  const {
    open,
    closeSidebar,
  } = useSidebar();

  return (
    <>
      {/* Overlay Mobile */}
      {open && (
        <div
          onClick={closeSidebar}
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            lg:hidden
          "
        />
      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          bg-sidebar
          border-r
          border-sidebar-border
          shadow-sm
          transition-all
          duration-300

          w-56

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
          lg:static
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-4 py-5 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                  <LayoutGrid className="w-5 h-5 text-white" />
                </div>

                <span className="font-bold text-lg text-foreground">
                  Moranje
                </span>
              </div>

              {/* Close mobile */}
              <button
                onClick={closeSidebar}
                className="lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
            <div className="text-xs font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wider">
              Planejamento
            </div>

            <NavItem
              icon={Clock}
              label="Timeline"
            />

            <NavItem
              icon={LayoutList}
              label="Board"
            />

            <div className="text-xs font-semibold text-muted-foreground px-4 py-3 mt-4 uppercase tracking-wider">
              Desenvolvimento
            </div>

            <NavItem
              icon={Code}
              label="Code"
            />

            <NavItem
              icon={FileText}
              label="Project pages"
            />

            <NavItem
              icon={Settings}
              label="Entity properties"
            />
          </nav>

          {/* Bottom */}
          <div className="px-2 py-3 border-t border-sidebar-border space-y-1">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded transition-colors duration-200">
              <Plus className="w-4 h-4" />
              Add shortcut
            </button>

            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded transition-colors duration-200">
              <Settings className="w-4 h-4" />
              Project settings
            </button>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-sidebar-border text-xs text-muted-foreground leading-relaxed">
            <p className="mb-2">
              You're in a team-managed
              project
            </p>

            <a
              href="#"
              className="text-primary hover:underline font-medium"
            >
              Learn more
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

function NavItem({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<any>;
  label: string;
}) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-sidebar-accent rounded transition-colors duration-200 group">
      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />

      <span>{label}</span>
    </button>
  );
}