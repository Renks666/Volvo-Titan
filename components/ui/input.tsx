import * as React from "react";

import { cn } from "@/utils/cn";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.06)] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/30 focus:bg-white/10",
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
