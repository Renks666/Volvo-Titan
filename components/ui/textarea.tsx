import * as React from "react";

import { cn } from "@/utils/cn";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-24 w-full resize-none rounded-[1.35rem] border border-white/10 bg-[rgba(255,255,255,0.06)] px-3.5 py-3 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-white/30 focus:bg-white/10 sm:min-h-28 sm:rounded-3xl sm:px-4 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
