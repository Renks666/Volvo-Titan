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
        "h-11 w-full rounded-[1.15rem] border border-white/10 bg-[rgba(255,255,255,0.06)] px-3.5 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-white/30 focus:bg-white/10 sm:h-12 sm:rounded-2xl sm:px-4 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
