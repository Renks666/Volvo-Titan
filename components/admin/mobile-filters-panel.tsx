"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import { cn } from "@/utils/cn";

interface MobileFiltersPanelProps {
  children: ReactNode;
}

export function MobileFiltersPanel({ children }: MobileFiltersPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/8 sm:hidden"
        aria-expanded={isOpen}
        aria-controls="mobile-admin-filters"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="inline-flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-slate-300" />
          {"\u0424\u0438\u043b\u044c\u0442\u0440\u044b"}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-slate-400 transition-transform duration-200",
            isOpen && "rotate-180 text-slate-200",
          )}
        />
      </button>
      <div
        id="mobile-admin-filters"
        className={cn("pt-3 sm:block sm:pt-0", !isOpen && "hidden sm:block")}
      >
        {children}
      </div>
    </div>
  );
}
