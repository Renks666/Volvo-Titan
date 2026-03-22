import * as React from "react";

import { cn } from "@/utils/cn";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "h-12 w-full appearance-none rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.06)] px-4 text-sm text-white outline-none transition focus:border-white/30 focus:bg-white/10",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";
